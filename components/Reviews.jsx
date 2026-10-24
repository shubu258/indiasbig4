"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/lib/content";

const STEP = 360 / reviews.length;

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => i + 1), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const active = ((index % reviews.length) + reviews.length) % reviews.length;

  const onPointerDown = (e) => {
    drag.current = e.clientX;
    setPaused(true);
  };
  const onPointerUp = (e) => {
    if (drag.current == null) return;
    const dx = e.clientX - drag.current;
    if (Math.abs(dx) > 40) setIndex((i) => i + (dx < 0 ? 1 : -1));
    drag.current = null;
  };

  return (
    <section className="reviews section" id="reviews">
      <div className="container reviews-grid">
        <div className="reviews-copy">
          <span className="section-tag light reveal">Client Reviews</span>
          <h2 className="section-title light reveal">
            Trusted by founders, families &amp; <span className="hl">finance teams.</span>
          </h2>
          <div className="rating reveal">
            <strong>4.9</strong>
            <div>
              <span className="stars" aria-label="5 stars">★★★★★</span>
              <small>Average from 600+ reviews</small>
            </div>
          </div>
          <div className="carousel-ctrl reveal">
            <button className="ctrl magnetic" aria-label="Previous review" onClick={() => setIndex((i) => i - 1)}>←</button>
            <button className="ctrl magnetic" aria-label="Next review" onClick={() => setIndex((i) => i + 1)}>→</button>
            <div className="dots" aria-hidden="true">
              {reviews.map((_, i) => (
                <span key={i} className={i === active ? "on" : ""} />
              ))}
            </div>
          </div>
        </div>

        <div
          className="carousel-stage"
          data-cursor="Drag"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={() => {
            drag.current = null;
            setPaused(false);
          }}
          onMouseEnter={() => setPaused(true)}
        >
          <div className="carousel-ring" style={{ "--rot": `${-index * STEP}deg` }}>
            {reviews.map((r, i) => (
              <blockquote
                className={`review${i === active ? " is-active" : ""}`}
                style={{ "--i": i, "--step": `${STEP}deg` }}
                key={r.name}
                aria-hidden={i !== active}
              >
                <span className="q" aria-hidden="true">“</span>
                <p>{r.text}</p>
                <footer>
                  <span className="r-avatar">{r.name.split(" ").map((n) => n[0]).join("")}</span>
                  <span>
                    <b>{r.name}</b>
                    <small>{r.role}</small>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="carousel-floor" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
