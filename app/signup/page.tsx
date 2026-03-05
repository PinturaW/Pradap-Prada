"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { authenticateUser, ensureDefaultUsers, signUpUser } from "@/lib/account-storage";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    setError("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please complete all fields");
      return;
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password confirmation does not match");
      return;
    }

    const signup = signUpUser(name, email, password);
    if (!signup.ok) {
      setError(signup.message);
      return;
    }

    const auth = authenticateUser(email, password);
    if (!auth.ok) {
      setError(auth.message);
      return;
    }

    router.push(nextPath);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <div className="mx-auto flex min-h-screen max-w-xl items-center px-6 pt-[65px]">
        <div className="w-full border border-[#EBEBEB] bg-white p-8 md:p-10">
          <p className="text-center font-serif text-4xl font-light text-[#2A2A2A]">Create Account</p>
          <p className="mt-2 text-center text-[13px] font-light text-[#9A9A9A]">
            Sign up to save and track your orders.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none transition-colors focus:border-[#C4956A]"
                placeholder="Your name"
              />
            </div>

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
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 w-full border border-[#EBEBEB] bg-[#FAFAF8] px-4 py-3 text-[14px] font-light outline-none transition-colors focus:border-[#C4956A]"
                placeholder="Repeat password"
              />
            </div>

            {error && <p className="text-[12px] font-light text-[#C05A5A]">{error}</p>}

            <button
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#2A2A2A] text-[13px] font-light tracking-[0.08em] text-white transition-colors hover:bg-[#3A3A3A]"
            >
              Create Account
            </button>
          </form>

          <p className="mt-5 text-center text-[12px] font-light text-[#9A9A9A]">
            Already have an account?{" "}
            <Link
              href={`/login?next=${encodeURIComponent(nextPath)}`}
              className="text-[#C4956A] transition-opacity hover:opacity-70"
            >
              Sign in
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
