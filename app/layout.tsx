import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "CarSage",
  description: "Data-informed negotiation guidance before you buy a car."
};

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user: { id: string } | null = null;

  if (isSupabaseConfigured) {
    const supabase = createSupabaseServerClient();
    const {
      data: { user: currentUser }
    } = await supabase.auth.getUser();

    user = currentUser;
  }

  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/90 backdrop-blur print-hidden">
          <div className="page-wrap flex h-[74px] items-center justify-between gap-4">
            <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
              CarSage
            </Link>
            <nav className="flex items-center gap-2 text-sm text-slate-700">
              <Link href="/check" className="rounded-lg px-3 py-2 hover:bg-slate-100">
                Check Listing
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:bg-slate-100">
                    Dashboard
                  </Link>
                  <Link href="/logout" className="btn-secondary px-3 py-2">
                    Sign out
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="rounded-lg px-3 py-2 hover:bg-slate-100">
                    Log in
                  </Link>
                  <Link href="/signup" className="btn-primary px-4 py-2">
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <div className="pb-12">{children}</div>
      </body>
    </html>
  );
}
