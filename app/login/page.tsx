"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/")) {
      setNextPath(next);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <main className="page-wrap flex min-h-[calc(100vh-86px)] max-w-md items-center py-12">
      <div className="surface-card w-full p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Welcome back</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Log in</h1>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Email</span>
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-slate-700">Password</span>
            <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          New to CarSage?{" "}
          <Link href="/signup" className="font-semibold text-slate-900 underline underline-offset-4">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
