import { useState, type FormEvent } from "react";
import type { Product } from "../data/products";
import { SIZES } from "../data/products";

const STORAGE_KEY = "dtlc-waitlist";

type Fields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postal: string;
};

type Entry = Fields & {
  id: string;
  slug: string;
  product: string;
  size: string;
  createdAt: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  region: "",
  postal: "",
};

const INPUTS: { key: keyof Fields; label: string; auto: string; type?: string }[] = [
  { key: "name", label: "Full name", auto: "name" },
  { key: "email", label: "Email", auto: "email", type: "email" },
  { key: "phone", label: "Phone", auto: "tel", type: "tel" },
  { key: "address", label: "Street address", auto: "street-address" },
  { key: "city", label: "City", auto: "address-level2" },
  { key: "region", label: "State / region", auto: "address-level1" },
  { key: "postal", label: "Postal code", auto: "postal-code" },
];

function readList(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Entry[]) : [];
  } catch {
    return [];
  }
}

export function WaitlistForm({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "size", string>>>({});
  const [saved, setSaved] = useState<Entry | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof Fields | "size", string>> = {};
    if (!size) nextErrors.size = "Choose a size.";
    (Object.keys(EMPTY) as (keyof Fields)[]).forEach((key) => {
      if (!form[key].trim()) nextErrors[key] = "Required.";
    });
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a real email.";
    }
    const digits = form.phone.replace(/\D/g, "");
    if (form.phone.trim() && digits.length < 7) nextErrors.phone = "Enter a real phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !size) return;

    const entry: Entry = {
      ...form,
      id: `WL-${Date.now().toString().slice(-6)}`,
      slug: product.slug,
      product: product.name,
      size,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...readList(), entry]));
    setSaved(entry);
  }

  if (saved) {
    return (
      <p className="form-ok">
        You're on the list for the {saved.product} in size {saved.size}. We saved {saved.name}'s details in this browser.
      </p>
    );
  }

  return (
    <form className="stack waitlist" onSubmit={submit} noValidate>
      <fieldset className={`sizes ${errors.size ? "has-error" : ""}`}>
        <legend>Size</legend>
        <div className="size-row">
          {SIZES.map((option) => (
            <button
              key={option}
              type="button"
              className={size === option ? "is-on" : ""}
              aria-pressed={size === option}
              onClick={() => {
                setSize(option);
                setErrors((current) => ({ ...current, size: undefined }));
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.size && <p className="form-error">{errors.size}</p>}
      </fieldset>

      {INPUTS.map((field) => (
        <label key={field.key} className="field">
          <span>{field.label}</span>
          <input
            type={field.type ?? "text"}
            autoComplete={field.auto}
            value={form[field.key]}
            aria-invalid={Boolean(errors[field.key])}
            onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
          />
          {errors[field.key] && <em className="form-error">{errors[field.key]}</em>}
        </label>
      ))}

      <button className="btn btn-block" type="submit">
        Join waitlist <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
