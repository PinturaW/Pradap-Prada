"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { getAuthUser } from "@/lib/account-storage";
import { gemTypeDisplayData } from "@/lib/gem-data";

const navLinks = [
  { label: "Home",           href: "/" },
  { label: "Our Story",      href: "/#story" },
  { label: "Our Collection", href: "/#collection" },
  { label: "Design",         href: "/customize" },
  { label: "Gem Gallery",    href: "/gems" },
  { label: "Contact",        href: "/#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!getAuthUser());
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const gemResults = Object.entries(gemTypeDisplayData)
    .filter(([, display]) => {
      if (!display || !normalizedQuery) return false;
      return (
        display.nameEn.toLowerCase().includes(normalizedQuery) ||
        display.nameTh.toLowerCase().includes(normalizedQuery)
      );
    })
    .slice(0, 8);

  const quickLinks = [
    { label: "Gem Gallery", href: "/gems" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Design Your Piece", href: "/customize" },
    { label: "Take Quiz", href: "/quiz" },
  ];

  return (
    <>
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/35" onClick={() => setSearchOpen(false)}>
          <div className="mx-auto max-w-[1240px] px-6 pt-16" onClick={(event) => event.stopPropagation()}>
            <div className="border border-[#EBEBEB] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3 border border-[#EBEBEB] bg-[#FAFAF8] px-3 py-2">
                <Search className="h-5 w-5 text-[#9A9A9A]" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search gemstones or pages"
                  className="w-full bg-transparent text-[14px] font-light text-[#2A2A2A] outline-none placeholder:text-[#9A9A9A]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {normalizedQuery ? (
                <div className="mt-3 space-y-1">
                  {gemResults.length > 0 ? (
                    gemResults.map(([gemType, display]) => (
                      <Link
                        key={gemType}
                        href={`/gems?gem=${gemType}`}
                        className="block px-2 py-2 text-[13px] font-light text-[#2A2A2A] transition-colors hover:bg-[#FAFAF8]"
                        onClick={() => setSearchOpen(false)}
                      >
                        {display?.nameEn} <span className="text-[#9A9A9A]">({display?.nameTh})</span>
                      </Link>
                    ))
                  ) : (
                    <p className="px-2 py-2 text-[13px] font-light text-[#9A9A9A]">No results found</p>
                  )}
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-[#EBEBEB] px-3 py-1.5 text-[12px] font-light text-[#8A8A8A] transition-colors hover:border-[#C4956A] hover:text-[#2A2A2A]"
                      onClick={() => setSearchOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_#EBEBEB]" : "border-b border-[#EBEBEB]"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span
            className="font-serif text-base font-light tracking-[0.25em] uppercase"
            style={{ color: "#C4956A" }}
          >
            PRADAP PRADA
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("/") && !link.href.includes("#") ? (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] font-normal tracking-[0.05em] text-[#8B8B8B] transition-colors hover:text-[#2A2A2A]"
                  style={{ fontWeight: 400 }}
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] font-normal tracking-[0.05em] text-[#8B8B8B] transition-colors hover:text-[#2A2A2A]"
                  style={{ fontWeight: 400 }}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Cart icon */}
        <div className="hidden items-center gap-5 md:flex">
          {!isLoggedIn && (
            <Link
              href="/signup?next=/orders"
              className="text-[13px] font-light tracking-[0.08em] text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
            >
              Sign Up
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
            aria-label="Search gemstones"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href={isLoggedIn ? "/orders" : "/login?next=/orders"}
            className="flex items-center text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
            aria-label={isLoggedIn ? "My orders" : "Login"}
            style={{ fontWeight: 300 }}
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="flex items-center text-[#9A9A9A] transition-colors hover:text-[#2A2A2A]"
            aria-label="Cart"
            style={{ fontWeight: 300 }}
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-[#2A2A2A] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-[#EBEBEB] bg-white px-6 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/") && !link.href.includes("#") ? (
                  <Link
                    href={link.href}
                    className="text-[15px] font-light text-[#2A2A2A] transition-colors hover:text-[#C4956A]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-[15px] font-light text-[#2A2A2A] transition-colors hover:text-[#C4956A]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="text-[15px] font-light text-[#2A2A2A] transition-colors hover:text-[#C4956A]"
              >
                Search Gems
              </button>
            </li>
            <li>
              <Link
                href={isLoggedIn ? "/orders" : "/login?next=/orders"}
                className="text-[15px] font-light text-[#2A2A2A] transition-colors hover:text-[#C4956A]"
                onClick={() => setMobileOpen(false)}
              >
                {isLoggedIn ? "My Orders" : "Login"}
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  href="/signup?next=/orders"
                  className="text-[15px] font-light text-[#2A2A2A] transition-colors hover:text-[#C4956A]"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
          <Link
            href="/customize"
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#2A2A2A] text-[13px] tracking-[0.1em] text-white"
            onClick={() => setMobileOpen(false)}
          >
            Design Your Piece
          </Link>
        </div>
      )}
      </nav>
    </>
  );
}
