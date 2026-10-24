const points = [
  { title: "ICAI-qualified team", text: "Every engagement is led by a practising Chartered Accountant." },
  { title: "Technology first", text: "Cloud bookkeeping, real-time dashboards and secure document vaults." },
  { title: "Pan-India presence", text: "Serving clients across 20+ cities with a single point of contact." },
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container about-grid">
        <div className="about-visual reveal">
          <div className="iso-tilt tilt" data-tilt="10">
          <div className="iso-scene">
            <div className="iso-card c1">
              <span>Assets audited</span>
              <b>₹1,240 Cr</b>
              <div className="bars"><i style={{ "--h": "40%" }} /><i style={{ "--h": "65%" }} /><i style={{ "--h": "52%" }} /><i style={{ "--h": "85%" }} /><i style={{ "--h": "100%" }} /></div>
            </div>
            <div className="iso-card c2">
              <span>Tax saved for clients</span>
              <b>₹86 Cr</b>
              <svg viewBox="0 0 120 40" className="spark" aria-hidden="true"><path d="M0 34 L20 28 L40 30 L60 18 L80 20 L100 8 L120 4" /></svg>
            </div>
            <div className="iso-card c3">
              <span>On-time filings</span>
              <b>100%</b>
              <div className="ring-meter" />
            </div>
          </div>
          </div>
          <div className="about-badge">
            <strong>15+</strong>
            <span>years of<br />trust</span>
          </div>
        </div>

        <div className="about-copy">
          <span className="section-tag reveal">About Us</span>
          <h2 className="section-title reveal">
            A modern CA firm with an <span className="hl">old-school</span> commitment to accuracy.
          </h2>
          <p className="section-lead reveal">
            S&amp;S is a full-service chartered accountancy practice helping startups, SMEs and enterprises stay
            compliant and financially sharp. We combine deep regulatory expertise with technology-driven workflows to
            deliver clarity, speed and peace of mind.
          </p>
          <div className="about-points">
            {points.map((p) => (
              <div className="point reveal" key={p.title}>
                <span className="point-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#team" className="btn btn-dark magnetic reveal">
            Meet the Team <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
