"use client";

import { LoaderCircle, MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const LENGTH = 6;
const RESEND_DELAY = 60;

/** Saisie du code de confirmation reçu par e-mail (6 chiffres). */
export function OtpVerify({ email, next = "/compte", onBack }: { email: string; next?: string; onBack?: () => void }) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_DELAY);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(id);
  }, [cooldown]);

  const verify = async (code: string) => {
    setLoading(true);
    setError("");
    const supabase = createClient();
    let { error: err } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    if (err) ({ error: err } = await supabase.auth.verifyOtp({ email, token: code, type: "signup" }));
    if (err) {
      setLoading(false);
      setError(
        /expired/i.test(err.message)
          ? "Ce code a expiré. Demandez-en un nouveau ci-dessous."
          : "Code incorrect. Vérifiez les chiffres reçus par e-mail."
      );
      setDigits(Array(LENGTH).fill(""));
      inputs.current[0]?.focus();
      return;
    }
    router.replace(next);
    router.refresh();
  };

  const setAt = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "");
    if (!clean) {
      setDigits((d) => d.map((v, i) => (i === index ? "" : v)));
      return;
    }
    // Collage d'un code complet ou saisie d'un chiffre
    const next = [...digits];
    clean
      .slice(0, LENGTH - index)
      .split("")
      .forEach((ch, k) => (next[index + k] = ch));
    setDigits(next);
    const filled = Math.min(index + clean.length, LENGTH - 1);
    inputs.current[filled]?.focus();
    if (next.every(Boolean)) verify(next.join(""));
  };

  const onKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const resend = async () => {
    setError("");
    setInfo("");
    const { error: err } = await createClient().auth.resend({ type: "signup", email });
    if (err) {
      setError(/rate|seconds/i.test(err.message) ? "Patientez quelques instants avant de redemander un code." : err.message);
      return;
    }
    setInfo("Un nouveau code vient d'être envoyé.");
    setCooldown(RESEND_DELAY);
  };

  return (
    <div className="text-center">
      <MailCheck className="mx-auto h-12 w-12 text-or-600" strokeWidth={1} />
      <h2 className="mt-6 font-serif text-3xl text-bordeaux-900">Confirmez votre adresse</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-taupe">
        Saisissez le code à {LENGTH} chiffres envoyé à <strong className="font-medium text-encre">{email}</strong>.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (digits.every(Boolean)) verify(digits.join(""));
        }}
        className="mt-8"
      >
        <fieldset disabled={loading} className="flex justify-center gap-2 sm:gap-3">
          <legend className="sr-only">Code de confirmation</legend>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={LENGTH}
              aria-label={`Chiffre ${i + 1}`}
              aria-invalid={!!error}
              className={`h-14 w-11 border bg-white text-center font-serif text-[28px] text-bordeaux-900 transition-colors focus:border-bordeaux-900 focus:outline-none sm:h-16 sm:w-12 ${
                error ? "border-bordeaux-600" : d ? "border-or-500" : "border-sable"
              }`}
            />
          ))}
        </fieldset>

        {error && (
          <p role="alert" className="mt-5 text-[14px] text-bordeaux-600">
            {error}
          </p>
        )}
        {info && !error && (
          <p role="status" className="mt-5 text-[14px] text-emerald-700">
            {info}
          </p>
        )}

        <button type="submit" disabled={loading || !digits.every(Boolean)} className="btn-primary mt-8 w-full">
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "Valider le code"}
        </button>
      </form>

      <div className="mt-6 space-y-2 text-[14px] text-taupe">
        <p>
          Pas reçu ? Vérifiez vos courriers indésirables, ou{" "}
          {cooldown > 0 ? (
            <span className="tabular-nums">renvoyez un code dans {cooldown} s</span>
          ) : (
            <button type="button" onClick={resend} className="cursor-pointer text-bordeaux-900 underline underline-offset-4 hover:text-or-700">
              renvoyez un code
            </button>
          )}
          .
        </p>
        {onBack && (
          <button type="button" onClick={onBack} className="min-h-[44px] cursor-pointer text-[12px] uppercase tracking-[0.15em] text-taupe hover:text-bordeaux-900">
            ← Modifier l&apos;adresse e-mail
          </button>
        )}
      </div>
    </div>
  );
}
