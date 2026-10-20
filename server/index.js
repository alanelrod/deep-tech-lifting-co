import http from "node:http";
import { Pool } from "pg";

const port = Number(process.env.PORT || 8787);
const origins = new Set(
  (process.env.CORS_ORIGINS ||
    "https://deeptechliftingco.com,https://www.deeptechliftingco.com,http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_URL?.includes("localhost") || process.env.DATABASE_URL?.includes("railway.internal")
      ? false
      : { rejectUnauthorized: false },
});

const ready = pool
  .query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id text PRIMARY KEY,
      slug text NOT NULL,
      product text NOT NULL,
      size text NOT NULL,
      name text NOT NULL,
      email text NOT NULL,
      phone text NOT NULL,
      address text NOT NULL,
      city text NOT NULL,
      region text NOT NULL,
      postal text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `)
  .catch((error) => {
    console.error("waitlist table setup failed", error);
    throw error;
  });

function send(res, status, body, origin) {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
  };
  if (origin && origins.has(origin)) headers["access-control-allow-origin"] = origin;
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

function invalid(value) {
  return typeof value !== "string" || !value.trim();
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "OPTIONS") {
    send(res, 204, {}, origin);
    return;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    send(res, 200, { ok: true }, origin);
    return;
  }

  if (req.method !== "POST" || url.pathname !== "/waitlist") {
    send(res, 404, { error: "Not found." }, origin);
    return;
  }

  if (origin && !origins.has(origin)) {
    send(res, 403, { error: "Origin not allowed." }, origin);
    return;
  }

  let payload = "";
  for await (const chunk of req) {
    payload += chunk;
    if (payload.length > 20_000) {
      send(res, 413, { error: "Too large." }, origin);
      return;
    }
  }

  let body;
  try {
    body = JSON.parse(payload);
  } catch {
    send(res, 400, { error: "Invalid JSON." }, origin);
    return;
  }

  const fields = ["slug", "product", "size", "name", "email", "phone", "address", "city", "region", "postal"];
  if (fields.some((key) => invalid(body[key]))) {
    send(res, 400, { error: "Name, email, phone, address, and size are required." }, origin);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    send(res, 400, { error: "Enter a real email." }, origin);
    return;
  }
  if (body.phone.replace(/\D/g, "").length < 7) {
    send(res, 400, { error: "Enter a real phone number." }, origin);
    return;
  }

  const entry = {
    id: `WL-${Date.now().toString().slice(-6)}`,
    slug: body.slug.trim(),
    product: body.product.trim(),
    size: body.size.trim(),
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    address: body.address.trim(),
    city: body.city.trim(),
    region: body.region.trim(),
    postal: body.postal.trim(),
  };

  try {
    await ready;
    await pool.query(
      `INSERT INTO waitlist (id, slug, product, size, name, email, phone, address, city, region, postal)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        entry.id,
        entry.slug,
        entry.product,
        entry.size,
        entry.name,
        entry.email,
        entry.phone,
        entry.address,
        entry.city,
        entry.region,
        entry.postal,
      ],
    );
  } catch (error) {
    console.error(error);
    send(res, 500, { error: "Could not save the waitlist request." }, origin);
    return;
  }

  send(res, 201, { id: entry.id }, origin);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`waitlist listening on ${port}`);
});
