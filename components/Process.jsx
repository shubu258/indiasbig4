import { steps } from "@/lib/content";

export default function Process() {
  return (
    <section className="process section" id="process">
      <div className="container">
        <div className="section-head center">
          <span className="section-tag reveal">Our Process</span>
          <h2 className="section-title reveal">
            How we make your work <span className="hl">successful.</span>
          </h2>
          <p className="section-lead reveal">A simple, transparent four-step approach, refined over 2,500+ engagements.</p>
        </div>

        <div className="process-track">
          <div className="process-line" aria-hidden="true">
            <span className="process-progress" />
          </div>
          {steps.map((s, i) => (
            <div className="step reveal" key={s.title}>
              <div className="step-cube" aria-hidden="true">
                <div className="cube">
                  <span className="face front">{String(i + 1).padStart(2, "0")}</span>
                  <span className="face back" />
                  <span className="face right" />
                  <span className="face left" />
                  <span className="face top" />
                  <span className="face bottom" />
                </div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
