"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { PasswordInput } from "./PasswordInput";

/** Formulaire de connexion. `adminOnly` vérifie le rôle avant d'ouvrir l'espace admin. */
export function LoginForm({ next = "/compte", adminOnly = false }: { next?: string; adminOnly?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isSupabaseConfigured) {
      setError("La base de données n'est pas encore connectée (voir README).");
      return;
    }
    if (!email || !password) {
      setError("Saisissez votre e-mail et votre mot de passe.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (authError || !data.user) {
      setLoading(false);
      setError(
        authError?.message === "Email not confirmed"
          ? "Confirmez d'abord votre adresse e-mail grâce au lien reçu."
          : "E-mail ou mot de passe incorrect."
      );
      return;
    }
    if (adminOnly) {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        setLoading(false);
        setError("Ce compte n'a pas accès à l'espace d'administration.");
        return;
      }
    }
    router.replace(next.startsWith("/") ? next : "/compte");
    router.refresh();
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="email" className="field-label">
          E-mail
        </label>
        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
      </div>
      <PasswordInput id="password" label="Mot de passe" value={password} onChange={setPassword} autoComplete="current-password" />
      {error && (
        <p role="alert" className="border-l-2 border-bordeaux-600 bg-bordeaux-50 px-4 py-3 text-[14px] text-bordeaux-700">
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "Se connecter"}
      </button>
      {!adminOnly && (
        <p className="text-center text-[14px] text-taupe">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="text-bordeaux-900 underline underline-offset-4 hover:text-or-700">
            Créer un compte
          </Link>
        </p>
      )}
    </form>
  );
}
