"use client";

import { useState, useEffect } from "react";
import WhyUseful from "@/components/chunks/WhyUseful";
import WhyCompany from "@/components/chunks/WhyCompany";
import Closing from "@/components/chunks/Closing";

type FormState = {
  slug: string;
  company: string;
  role: string;
  accent: string;
  email: string;
  hero: string;
  heroSubtitle: string;
  focusAreas: string[];
  whyUseful: string[];
  whyCompany: string;
  closing: string;
};

const DEFAULTS: FormState = {
  slug: "",
  company: "",
  role: "",
  accent: "#0066FF",
  email: "araammarmoud@gmail.com",
  hero: "",
  heroSubtitle: "",
  focusAreas: ["", "", "", "", ""],
  whyUseful: ["", "", "", ""],
  whyCompany: "",
  closing: "",
};

type PublishResult = {
  commitSha: string;
  vercelUrl: string;
  estimatedDeployTime: string;
};

function generateTS(form: FormState): string {
  const arr = (items: string[]) =>
    items.map((item) => `    ${JSON.stringify(item)},`).join("\n");

  return [
    `import type { CompanyConfig } from "@/lib/types";`,
    ``,
    `const config: CompanyConfig = {`,
    `  slug: ${JSON.stringify(form.slug)},`,
    `  company: ${JSON.stringify(form.company)},`,
    `  role: ${JSON.stringify(form.role)},`,
    `  accent: ${JSON.stringify(form.accent)},`,
    `  email: ${JSON.stringify(form.email)},`,
    ``,
    `  hero: ${JSON.stringify(form.hero)},`,
    `  heroSubtitle:`,
    `    ${JSON.stringify(form.heroSubtitle)},`,
    ``,
    `  focusAreas: [`,
    arr(form.focusAreas),
    `  ],`,
    ``,
    `  whyUseful: [`,
    arr(form.whyUseful),
    `  ],`,
    ``,
    `  whyCompany:`,
    `    ${JSON.stringify(form.whyCompany)},`,
    ``,
    `  closing: ${JSON.stringify(form.closing)},`,
    `};`,
    ``,
    `export default config;`,
    ``,
  ].join("\n");
}

function PreviewHero({ form }: { form: FormState }) {
  const { hero, company, role, accent, heroSubtitle, focusAreas } = form;
  const idx = company ? hero.indexOf(company) : -1;
  const prefix = idx !== -1 ? hero.slice(0, idx).trim() : hero;
  const showCompany = !!company;

  return (
    <div>
      <div className="bg-[#0A0A0A] px-8 py-16 min-h-[280px] flex items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
            {role || <span className="text-neutral-700">Role</span>}
          </p>
          <h1 className="text-4xl font-bold leading-[0.95] tracking-tight mb-6">
            {idx !== -1 ? (
              <>
                <span className="block text-white">{prefix || "Working with"}</span>
                <span className="block" style={{ color: accent }}>{company}</span>
              </>
            ) : (
              <>
                <span className="block text-white">{hero || "Working with"}</span>
                {showCompany && (
                  <span className="block" style={{ color: accent }}>{company}</span>
                )}
              </>
            )}
          </h1>
          <p className="text-base text-neutral-300 max-w-lg leading-relaxed">
            {heroSubtitle || <span className="text-neutral-700">Subtitle will appear here.</span>}
          </p>
        </div>
      </div>

      {focusAreas.some(Boolean) && (
        <div className="bg-white px-8 py-10 border-b border-neutral-200">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-6 font-medium">
            01 · Focus areas
          </p>
          <ul className="space-y-4">
            {focusAreas.filter(Boolean).map((area, i) => (
              <li key={i} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
                <span className="text-neutral-400 shrink-0 tabular-nums font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputCls =
  "border border-neutral-200 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 bg-white transition-colors";
const textareaCls = `${inputCls} resize-none`;

export default function AdminForm() {
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<PublishResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin-draft");
    if (saved) {
      try {
        setForm(JSON.parse(saved) as FormState);
      } catch {
        // ignore malformed draft
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("admin-draft", JSON.stringify(form));
    }
  }, [form, loaded]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function setArr(key: "focusAreas" | "whyUseful", idx: number, val: string) {
    setForm((prev) => {
      const arr = [...prev[key]];
      arr[idx] = val;
      return { ...prev, [key]: arr };
    });
  }

  function addArr(key: "focusAreas" | "whyUseful") {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  }

  function removeArr(key: "focusAreas" | "whyUseful", idx: number) {
    if (form[key].length <= 1) return;
    setForm((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== idx) }));
  }

  function handleSlugBlur() {
    set(
      "slug",
      form.slug
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );
  }

  async function handlePublish() {
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as
        | PublishResult
        | { error: string; field?: string };
      if (!res.ok) {
        setStatus("error");
        const errData = data as { error: string; field?: string };
        if (errData.field) {
          setFieldErrors({ [errData.field]: errData.error });
        } else {
          setErrorMsg(errData.error || "Unknown error");
        }
        return;
      }
      setStatus("success");
      setResult(data as PublishResult);
      localStorage.removeItem("admin-draft");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generateTS(form));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    if (!confirm("Reset form? This will clear all fields and your saved draft.")) return;
    setForm(DEFAULTS);
    localStorage.removeItem("admin-draft");
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
    setFieldErrors({});
  }

  if (status === "success" && result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-8 text-center">
          <div className="w-12 h-12 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-lg">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Published</h2>
          <p className="text-sm text-neutral-500 mb-8">
            Vercel is deploying. Page will be live in {result.estimatedDeployTime}.
          </p>
          <a
            href={result.vercelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-neutral-900 underline underline-offset-4 mb-2 hover:text-neutral-500 transition-colors"
          >
            {result.vercelUrl}
          </a>
          <p className="text-xs text-neutral-400 mb-10">
            Commit:{" "}
            <code className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded">
              {result.commitSha.slice(0, 8)}
            </code>
          </p>
          <button
            onClick={() => {
              setForm(DEFAULTS);
              setResult(null);
              setStatus("idle");
            }}
            className="px-6 py-3 border border-neutral-900 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Start another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">
      {/* LEFT: Form */}
      <div className="w-1/2 flex flex-col overflow-hidden border-r border-neutral-200">
        <div className="px-8 py-4 border-b border-neutral-200 shrink-0">
          <h1 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
            New Company Page
          </h1>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            localhost admin · never accessible in production
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 pb-24 flex flex-col gap-5">
          {/* Meta row */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug *" error={fieldErrors.slug}>
              <input
                className={`${inputCls} ${fieldErrors.slug ? "border-red-400" : ""}`}
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                onBlur={handleSlugBlur}
                placeholder="e.g. stripe"
              />
              <p className="text-[10px] text-neutral-400">Auto-formats on blur</p>
            </Field>
            <Field label="Company *">
              <input
                className={inputCls}
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="e.g. Stripe"
              />
            </Field>
          </div>

          <Field label="Role">
            <input
              className={inputCls}
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              placeholder="e.g. Marketing Intern, Summer 2026"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Accent color">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.accent}
                  onChange={(e) => set("accent", e.target.value)}
                  className="w-9 h-9 rounded border border-neutral-200 cursor-pointer p-0.5 bg-white shrink-0"
                />
                <input
                  className={inputCls + " flex-1"}
                  value={form.accent}
                  onChange={(e) => set("accent", e.target.value)}
                  placeholder="#0066FF"
                  maxLength={7}
                />
              </div>
            </Field>
            <Field label="Email">
              <input
                className={inputCls}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                type="email"
              />
            </Field>
          </div>

          <div className="border-t border-neutral-100 pt-1" />

          <Field label="Hero heading">
            <input
              className={inputCls}
              value={form.hero}
              onChange={(e) => set("hero", e.target.value)}
              placeholder={`e.g. Working with ${form.company || "Company"}`}
            />
            <p className="text-[10px] text-neutral-400">
              Include the company name to display it in accent color
            </p>
          </Field>

          <Field label="Hero subtitle">
            <textarea
              className={textareaCls}
              rows={3}
              value={form.heroSubtitle}
              onChange={(e) => set("heroSubtitle", e.target.value)}
              placeholder="One sentence about the role or summer focus."
            />
          </Field>

          <div className="border-t border-neutral-100 pt-1" />

          {/* Focus areas */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                Focus Areas ({form.focusAreas.length})
              </span>
              <button
                type="button"
                onClick={() => addArr("focusAreas")}
                className="text-[10px] text-neutral-400 hover:text-neutral-900 underline underline-offset-2 transition-colors"
              >
                + Add
              </button>
            </div>
            {form.focusAreas.map((area, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-[10px] text-neutral-400 font-mono pt-2.5 w-5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <textarea
                  className={textareaCls + " flex-1"}
                  rows={2}
                  value={area}
                  onChange={(e) => setArr("focusAreas", i, e.target.value)}
                  placeholder={`Focus area ${i + 1}`}
                />
                {form.focusAreas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArr("focusAreas", i)}
                    className="text-neutral-300 hover:text-red-500 pt-2 text-xl leading-none transition-colors"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-100 pt-1" />

          {/* Why useful */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                Why I&apos;d Be Useful ({form.whyUseful.length})
              </span>
              <button
                type="button"
                onClick={() => addArr("whyUseful")}
                className="text-[10px] text-neutral-400 hover:text-neutral-900 underline underline-offset-2 transition-colors"
              >
                + Add
              </button>
            </div>
            {form.whyUseful.map((item, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-[10px] text-neutral-400 font-mono pt-2.5 w-5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <textarea
                  className={textareaCls + " flex-1"}
                  rows={2}
                  value={item}
                  onChange={(e) => setArr("whyUseful", i, e.target.value)}
                  placeholder={`Reason ${i + 1}`}
                />
                {form.whyUseful.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArr("whyUseful", i)}
                    className="text-neutral-300 hover:text-red-500 pt-2 text-xl leading-none transition-colors"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-100 pt-1" />

          <Field label="Why this company">
            <textarea
              className={textareaCls}
              rows={6}
              value={form.whyCompany}
              onChange={(e) => set("whyCompany", e.target.value)}
              placeholder="What makes this specific opportunity compelling."
            />
          </Field>

          <Field label="Closing line">
            <input
              className={inputCls}
              value={form.closing}
              onChange={(e) => set("closing", e.target.value)}
              placeholder="e.g. Happy to expand on any of this if helpful."
            />
          </Field>

          {status === "error" && errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded px-4 py-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Sticky action bar */}
        <div className="shrink-0 border-t border-neutral-200 bg-white px-8 py-4 flex items-center gap-3">
          <button
            onClick={handlePublish}
            disabled={status === "loading"}
            className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-medium uppercase tracking-widest hover:bg-neutral-700 transition-colors disabled:opacity-40"
          >
            {status === "loading" ? "Publishing..." : "Publish"}
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-medium uppercase tracking-widest hover:border-neutral-900 hover:text-neutral-900 transition-colors"
          >
            {copied ? "Copied!" : "Copy TypeScript"}
          </button>
          <button
            onClick={handleReset}
            className="ml-auto text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* RIGHT: Preview */}
      <div className="w-1/2 overflow-y-auto bg-neutral-50">
        <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-3">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
            Preview · araammarmoud.com/for/{form.slug || "[slug]"}
          </p>
        </div>
        <div className="bg-white">
          <PreviewHero form={form} />
          <div className="py-16 border-t border-neutral-200">
            <WhyUseful
              whyUseful={
                form.whyUseful.some(Boolean)
                  ? form.whyUseful.filter(Boolean)
                  : ["Add your why-useful bullets on the left to preview them here."]
              }
            />
          </div>
          <div className="border-t border-neutral-200 py-16">
            <WhyCompany
              company={form.company || "Company"}
              whyCompany={form.whyCompany || "Add your why-company text on the left."}
            />
          </div>
          <div className="border-t border-neutral-200 py-16 pb-24">
            <Closing
              closing={form.closing || "Add your closing line on the left."}
              email={form.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
