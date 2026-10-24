"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Page-wide motion: smooth scroll, intro, scroll reveals, counters, 3D tilt and magnetic buttons.
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups = [];
    const root = document.documentElement;

    // ---------- Smooth scroll ----------
    let lenis = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      });

      // Scroll velocity drives the brand marquee skew
      lenis.on("scroll", ({ velocity }) => {
        root.style.setProperty("--scroll-v", Math.max(-1, Math.min(1, velocity / 30)).toFixed(3));
      });
    }

    // In-page anchors with navbar offset
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const el = id.length > 1 ? document.querySelector(id) : null;
      if (!el && id !== "#") return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el ?? 0, { offset: id === "#home" ? 0 : -80 });
      else (el ?? document.body).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };
    document.addEventListener("click", onAnchor);
    cleanups.push(() => document.removeEventListener("click", onAnchor));

    const ctx = gsap.context(() => {
      // ---------- Preloader + hero intro ----------
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(".preloader", { yPercent: -100, duration: 0.9, ease: "expo.inOut" })
        .set(".preloader", { display: "none" })
        .from(".nav", { y: -40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(".hero-title .line > span", { yPercent: 110, rotateX: -40, duration: 1.1, stagger: 0.1, ease: "expo.out" }, "-=0.6")
        .from(".hero .intro", { y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.8");
      if (reduce) tl.progress(1);

      // ---------- Reveal on scroll ----------
      if (!reduce) {
        ScrollTrigger.batch(".reveal", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 50, opacity: 0, rotateX: -12 },
              { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.09, ease: "power3.out", overwrite: true, clearProps: "transform" }
            ),
        });
        gsap.set(".reveal", { opacity: 0, transformPerspective: 900 });
      }

      // ---------- Counters ----------
      document.querySelectorAll("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: reduce ? 0 : 2.2,
          delay: reduce ? 0 : 1.4,
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("en-IN")),
        });
      });

      if (reduce) return;

      // ---------- Hero parallax out ----------
      gsap.to(".hero-copy", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-stage", {
        yPercent: 20,
        scale: 0.9,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // ---------- About: floating cards drift ----------
      gsap.fromTo(
        ".iso-scene",
        { rotateX: 30, rotateZ: -12 },
        { rotateX: 52, rotateZ: -30, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.to(".about-badge", {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true },
      });

      // ---------- Services cubes rotate with scroll ----------
      gsap.fromTo(
        ".svc-cube .cube",
        { rotateY: -70, rotateX: -25 },
        {
          rotateY: 20,
          rotateX: -15,
          ease: "none",
          scrollTrigger: { trigger: ".services", start: "top bottom", end: "center center", scrub: 1 },
        }
      );

      // ---------- Process line + step cubes ----------
      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".process-track", start: "top 75%", end: "bottom 55%", scrub: true } }
      );
      gsap.utils.toArray(".step").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          onEnter: () => step.classList.add("is-on"),
          onLeaveBack: () => step.classList.remove("is-on"),
        });
      });

      // ---------- Section headings: subtle depth ----------
      gsap.utils.toArray(".section-title").forEach((t) => {
        gsap.fromTo(t, { letterSpacing: "0.02em" }, {
          letterSpacing: "-0.02em",
          ease: "none",
          scrollTrigger: { trigger: t, start: "top bottom", end: "top 40%", scrub: true },
        });
      });

      // ---------- Newsletter envelope ----------
      gsap.fromTo(
        ".env-card",
        { rotate: -40, y: 80, opacity: 0 },
        { rotate: -24, y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.6)", scrollTrigger: { trigger: ".newsletter", start: "top 85%" } }
      );
    });
    cleanups.push(() => ctx.revert());

    // ---------- 3D tilt ----------
    if (finePointer && !reduce) {
      document.querySelectorAll(".tilt").forEach((el) => {
        const max = Number(el.dataset.tilt || 10);
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
          el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        };
        const leave = () => {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      // ---------- Magnetic buttons ----------
      document.querySelectorAll(".magnetic").forEach((el) => {
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(el, { x: x * 0.3, y: y * 0.4, duration: 0.4, ease: "power3.out" });
        };
        const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // Recalculate trigger positions once fonts settle
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
