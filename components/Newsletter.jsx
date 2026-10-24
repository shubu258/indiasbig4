"use client";

import { useState } from "react";

// UI only: the form validates and shows a confirmation, nothing is sent anywhere.
export default function Newsletter() {
  const [msg, setMsg] = useState({ text: "", ok: false });

  const onSubmit = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.email;
    if (!input.checkValidity()) {
      setMsg({ text: "Please enter a valid email address.", ok: false });
      return;
    }
    setMsg({ text: "Thanks for subscribing! Watch your inbox.", ok: true });
    e.currentTarget.reset();
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="nl-left">
        <div className="nl-copy reveal">
          <h2>Newsletter - Get Updates &amp; Latest News</h2>
          <p>Get in your inbox the latest News and Offers from S&amp;S</p>
        </div>
      </div>

      <div className="nl-envelope" aria-hidden="true">
        <div className="env-card">
          <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
            <rect x="4" y="4" width="56" height="40" rx="4" />
            <path d="M4 8l28 20L60 8M4 42l20-16M60 42L40 26" />
          </svg>
        </div>
      </div>

      <div className="nl-right">
        <form className="nl-form reveal" noValidate onSubmit={onSubmit}>
          <label className="nl-field">
            <input type="email" name="email" required placeholder=" " autoComplete="email" />
            <span>Email Address *</span>
            <button type="submit" aria-label="Subscribe" className="nl-send" data-cursor="Send">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            </button>
          </label>
          <small className={`nl-msg${msg.ok ? " ok" : ""}`} role="status">{msg.text}</small>
        </form>
      </div>
    </section>
  );
}
