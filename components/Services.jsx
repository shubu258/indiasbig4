import { services } from "@/lib/content";
import Icon from "./Icons";

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="services-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-head split">
          <div>
            <span className="section-tag light reveal">Our Services</span>
            <h2 className="section-title light reveal">
              Everything your finances need, <span className="hl">under one roof.</span>
            </h2>
          </div>
          <p className="section-lead light reveal">
            From your first company registration to board-ready financials, one dedicated team handles it all.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <article className="service-card tilt reveal" data-tilt="12" data-cursor="View" key={s.title}>
              <div className="card-shine" aria-hidden="true" />
              <div className="svc-cube" aria-hidden="true">
                <div className="cube">
                  <span className="face front"><Icon name={s.icon} /></span>
                  <span className="face back" />
                  <span className="face right" />
                  <span className="face left" />
                  <span className="face top" />
                  <span className="face bottom" />
                </div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="svc-link">
                Learn more <span className="arrow">→</span>
              </span>
              <span className="svc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
