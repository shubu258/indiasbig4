import { faqs } from "@/lib/content";

export default function Faqs() {
  return (
    <section className="faqs section" id="faqs">
      <div className="container faq-grid">
        <div>
          <span className="section-tag reveal">FAQs</span>
          <h2 className="section-title reveal">
            Questions? <span className="hl">We&apos;ve got answers.</span>
          </h2>
          <p className="section-lead reveal">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a href="#contact" className="link">
              Talk to a CA →
            </a>
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details className="faq reveal" name="faq" open={i === 0} key={f.q}>
              <summary>
                {f.q}
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
