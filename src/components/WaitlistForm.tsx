import { useEffect, useState, type FormEvent } from "react";
import type { Product } from "../data/products";

type Fields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postal: string;
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

const endpoint = import.meta.env.VITE_WAITLIST_API || "/api/waitlist";

export function WaitlistForm({
  product,
  size,
  onClose,
}: {
  product: Product;
  size: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [sending, setSending] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof Fields, string>> = {};
    (Object.keys(EMPTY) as (keyof Fields)[]).forEach((key) => {
      if (!form[key].trim()) nextErrors[key] = "Required.";
    });
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a real email.";
    }
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Enter a real phone number.";
    }
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          size,
          slug: product.slug,
          product: product.name,
        }),
      });
      const body = (await response.json().catch(() => null)) as { id?: string; error?: string } | null;
      if (!response.ok || !body?.id) {
        setSubmitError(body?.error || "Could not join the waitlist.");
        return;
      }
      setSavedId(body.id);
    } catch {
      setSubmitError("Could not reach the waitlist.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="modal-root">
      <button className="backdrop" aria-label="Close waitlist" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
        <div className="modal-head">
          <h2 id="waitlist-title">Waitlist</h2>
          <button className="icon-btn" onClick={onClose}>
            Close
          </button>
        </div>
        {savedId ? (
          <p className="form-ok">
            You're on the list for the {product.name} in size {size}. Reference {savedId}.
          </p>
        ) : (
          <form className="stack waitlist" onSubmit={submit} noValidate>
            <p className="modal-copy">
              {product.name} · Size {size}
            </p>
            {INPUTS.map((field) => (
              <label key={field.key} className="field">
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  autoComplete={field.auto}
                  value={form[field.key]}
                  aria-invalid={Boolean(errors[field.key])}
                  autoFocus={field.key === "name"}
                  onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                />
                {errors[field.key] && <em className="form-error">{errors[field.key]}</em>}
              </label>
            ))}
            {submitError && <p className="form-error">{submitError}</p>}
            <button className="btn" type="submit" disabled={sending}>
              {sending ? "Saving" : "Join waitlist"} <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
