"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createSupabaseBrowserClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsSubmitting(false);
      return;
    }

    setIsCreated(true);
    setIsSubmitting(false);
  }

  return (
    <main className="page-wrap flex min-h-[calc(100vh-86px)] max-w-md items-center py-12">
      <div className="surface-card w-full p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Get started</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Sign up</h1>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Email</span>
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Password</span>
            <input
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          {isCreated && (
            <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Account created. Check your email to confirm, then log in.
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-slate-900 underline underline-offset-4">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
