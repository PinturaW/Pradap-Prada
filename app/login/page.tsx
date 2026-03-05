"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { authenticateUser, ensureDefaultUsers } from "@/lib/account-storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("you@example.com");
  const [password, setPassword] = useState("Pradap123!");
  const [error, setError] = useState("");
  const [nextPath, setNextPath] = useState("/orders");

  useEffect(() => {
    ensureDefaultUsers();
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next && next.startsWith("/")) {
      setNextPath(next);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    const result = authenticateUser(normalizedEmail, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push(nextPath);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <div className="mx-auto flex min-h-screen max-w-xl items-center px-6 pt-[65px]">
        <div className="w-full border border-[#EBEBEB] bg-white p-8 md:p-10">
          <p className="text-center font-serif text-4xl font-light text-[#2A2A2A]">Login</p>
          <p className="mt-2 text-center text-[13px] font-light text-[#9A9A9A]">
            Sign in to view your order history.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none transition-colors focus:border-[#C4956A]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none transition-colors focus:border-[#C4956A]"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-[12px] font-light text-[#C05A5A]">{error}</p>}

            <button
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#2A2A2A] text-[13px] font-light tracking-[0.08em] text-white transition-colors hover:bg-[#3A3A3A]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-5 text-center text-[12px] font-light text-[#9A9A9A]">
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?next=${encodeURIComponent(nextPath)}`}
              className="text-[#C4956A] transition-opacity hover:opacity-70"
            >
              Create account
            </Link>
          </p>

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-[13px] font-light text-[#C4956A] transition-opacity hover:opacity-70"
            >
              Return to Home →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
