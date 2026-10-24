"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";
import Brand from "./Brand";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the link for the section currently in view
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <header className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
      <nav className="nav" aria-label="Primary">
        <Brand />
        <ul className={`nav-links${open ? " open" : ""}`}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href ? "active" : ""} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta" data-cursor="Quote">
          Get a Quote
        </a>
        <button
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
