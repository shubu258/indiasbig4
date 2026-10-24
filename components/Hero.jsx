import HeroScene from "./HeroScene";
import { stats } from "@/lib/content";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-stage">
        <HeroScene />
      </div>
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow intro">
            <i /> Trusted Chartered Accountants
          </span>
          <h1 className="hero-title">
            <span className="line"><span>Numbers that build</span></span>
            <span className="line"><span>your <span className="accent">business.</span></span></span>
          </h1>
          <p className="hero-sub intro">
            Accounting, tax, payroll, reporting and CFO advisory, handled end-to-end by qualified CAs so you can
            focus on growth.
          </p>
          <div className="hero-actions intro">
            <a href="#services" className="btn btn-primary magnetic" data-cursor="Explore">
              Explore Services <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost magnetic">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero-stats intro">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <strong>
                <span data-count={s.value}>0</span>
                {s.suffix}
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
