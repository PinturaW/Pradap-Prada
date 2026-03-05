import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com",
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      label: "X",
      href: "https://x.com",
      icon: <span className="text-[16px] font-light leading-none">X</span>,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com",
      icon: <Instagram className="h-4 w-4" />,
    },
    {
      label: "LINE",
      href: "https://line.me",
      icon: <span className="text-[10px] font-medium tracking-[0.08em]">LINE</span>,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com",
      icon: <Youtube className="h-4 w-4" />,
    },
  ];

  return (
    <footer id="contact" className="border-t border-[#EBEBEB] bg-white py-16">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Brand name top */}
        <div className="mb-12 text-center">
          <p
            className="font-serif text-2xl font-light uppercase tracking-[0.25em]"
            style={{ color: "#C4956A" }}
          >
            PRADAP PRADA
          </p>
          <p className="mt-2 text-[11px] font-light tracking-[0.15em] uppercase text-[#9A9A9A]">
            EMPOWERING ARTISANS · AUTHENTIC GEMSTONES · TRAT, THAILAND
          </p>
        </div>

        {/* 4-column links */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Column 1 */}
          <div>
            <p className="mb-4 text-[11px] font-light tracking-[0.2em] uppercase text-[#2A2A2A]">
              PRADAP PRADA
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Our Story", href: "#story" },
                { label: "Gem Collection", href: "/gems" },
                { label: "Design Your Piece", href: "/customize" },
                { label: "Find Your Gem", href: "/quiz" },
              ].map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#C4956A]"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#C4956A]"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <p className="mb-4 text-[11px] font-light tracking-[0.2em] uppercase text-[#2A2A2A]">
              SUPPORT
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Custom Orders", href: "/support/custom-orders" },
                { label: "Sizing Guide", href: "/support/sizing-guide" },
                { label: "Care Instructions", href: "/support/care-instructions" },
                { label: "Returns & Exchange", href: "/support/returns-exchange" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] font-light text-[#9A9A9A] transition-colors hover:text-[#C4956A]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="mb-4 text-[11px] font-light tracking-[0.2em] uppercase text-[#2A2A2A]">
              CONTACT
            </p>
            <ul className="flex flex-col gap-3 text-[13px] font-light text-[#9A9A9A]">
              <li>iberico.th@gmail.com</li>
              <li>+66 82 010 8685</li>
              <li>Trat Province, Thailand</li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D7D7D7] text-[#9A9A9A] transition-colors hover:border-[#C4956A] hover:text-[#C4956A]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <p className="mb-4 text-[11px] font-light tracking-[0.2em] uppercase text-[#2A2A2A]">
              NEWSLETTER
            </p>
            <p className="mb-4 text-[13px] font-light text-[#9A9A9A]">
              Get gemstone updates and new design drops.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border-b border-[#EBEBEB] bg-transparent py-2 text-[13px] font-light text-[#2A2A2A] placeholder:text-[#9A9A9A] focus:border-[#C4956A] focus:outline-none"
              />
              <button
                className="text-[12px] font-light tracking-[0.05em] text-[#C4956A] transition-opacity hover:opacity-70"
              >
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 border-t border-[#EBEBEB] pt-6 text-center">
          <p className="text-[12px] font-light tracking-wider text-[#9A9A9A]">
            &copy; {new Date().getFullYear()} Pradap Prada. Made with ♡ in Trat.
          </p>
        </div>
      </div>
    </footer>
  );
}
