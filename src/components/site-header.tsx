"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { nav, profile } from "@/lib/data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + allow Escape to close while the panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-baseline gap-2.5 text-text transition-opacity hover:opacity-80"
        >
          <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em]">
            {profile.name}
          </span>
          <span className="datum hidden sm:inline">/karachi</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-draw font-mono text-[0.7rem] tracking-[0.06em] text-text-2 transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            <span className="datum text-amber/90">Available</span>
          </span>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="datum transition-colors hover:text-text"
          >
            GitHub
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-1 flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col items-center gap-[5px]">
              <span
                className={`block h-px w-5 bg-text transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-text transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-ink md:hidden"
      >
        <nav aria-label="Sections" className="mx-auto max-w-[84rem] px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line-soft last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-lg tracking-[-0.02em] text-text"
                >
                  {item.label}
                  <span className="datum">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5 pt-5 pb-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="datum text-text-2"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="datum text-text-2"
            >
              GitHub
            </a>
            <a href={`mailto:${profile.email}`} className="datum text-text-2">
              Email
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}