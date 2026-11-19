"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

type Fields = { name: string; email: string; affiliation: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", affiliation: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid e-mail address.";
  if (f.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (f.message.trim().length < 20) e.message = "Your message should be at least 20 characters.";
  if (f.message.length > 3000) e.message = "Please keep your message under 3,000 characters.";
  return e;
}

/**
 * Frontend-only contact form. There is no backend: on a valid submission the
 * form opens the visitor's e-mail client pre-filled (when `recipient` is set)
 * or shows a confirmation explaining how to reach the researcher.
 */
export function ContactForm({ recipient }: { recipient: string | null }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (v: string) => {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    if (recipient) {
      const body = `${fields.message}\n\n— ${fields.name}${fields.affiliation ? `, ${fields.affiliation}` : ""}\n${fields.email}`;
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
    }
    setSent(true);
  };

  const field = (k: keyof Fields, label: string, opts: { type?: string; required?: boolean; textarea?: boolean; autoComplete?: string; span?: boolean } = {}) => {
    const err = touched[k] ? errors[k] : undefined;
    const common = {
      id: `cf-${k}`,
      name: k,
      value: fields[k],
      onChange: (ev: { target: { value: string } }) => set(k)(ev.target.value),
      onBlur: () => {
        setTouched((t) => ({ ...t, [k]: true }));
        setErrors(validate(fields));
      },
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `cf-${k}-err` : undefined,
      required: opts.required,
      autoComplete: opts.autoComplete,
      className: `w-full border bg-paper px-4 text-[0.95rem] text-charcoal transition-colors placeholder:text-ink-muted/60 focus:border-forest ${
        err ? "border-red-700/70" : "border-forest/20 hover:border-forest/40"
      } ${opts.textarea ? "min-h-44 py-3 leading-relaxed" : "h-12"}`,
    };
    return (
      <div className={opts.span ? "sm:col-span-2" : ""}>
        <label htmlFor={`cf-${k}`} className="label-mono mb-2 block !text-[0.62rem] text-earth">
          {label} {opts.required ? <span aria-hidden="true">*</span> : <span className="normal-case tracking-normal text-earth-soft">(optional)</span>}
        </label>
        {opts.textarea ? <textarea {...common} rows={7} /> : <input {...common} type={opts.type ?? "text"} />}
        {err && (
          <p id={`cf-${k}-err`} className="mt-1.5 text-xs font-medium text-red-800">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-forest/15 bg-paper p-8 sm:p-10"
          role="status"
        >
          <CheckCircle2 className="h-8 w-8 text-forest" strokeWidth={1.5} aria-hidden="true" />
          <h3 className="mt-4 text-3xl text-forest">Thank you, {fields.name.split(" ")[0]}.</h3>
          <p className="mt-3 max-w-lg leading-relaxed text-ink-muted">
            {recipient
              ? "Your e-mail client should have opened with your message ready to send. If it did not, please write directly to the address shown on this page."
              : "This website does not send messages itself. Please reach Hasna through LinkedIn or ResearchGate using the links on this page — your message has not been transmitted."}
          </p>
          <button
            type="button"
            onClick={() => {
              setFields(EMPTY);
              setTouched({});
              setErrors({});
              setSent(false);
            }}
            className="mt-6 min-h-11 text-sm font-semibold text-forest underline underline-offset-4 hover:text-earth"
          >
            Write another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 sm:grid-cols-2">
          {field("name", "Full name", { required: true, autoComplete: "name" })}
          {field("email", "E-mail", { type: "email", required: true, autoComplete: "email" })}
          {field("affiliation", "Institution / affiliation", { autoComplete: "organization", span: true })}
          {field("subject", "Subject", { required: true, span: true })}
          {field("message", "Message", { required: true, textarea: true, span: true })}
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-muted">* Required fields. No data is stored or sent by this website.</p>
            <button
              type="submit"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 bg-forest px-7 py-3 text-[0.85rem] font-semibold tracking-wide text-ivory transition-colors hover:bg-forest-deep"
            >
              Send message
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
