import { team } from "@/lib/content";

export default function Team() {
  return (
    <section className="team section" id="team">
      <div className="container">
        <div className="section-head center">
          <span className="section-tag reveal">Meet Our Team</span>
          <h2 className="section-title reveal">
            The people behind <span className="hl">your numbers.</span>
          </h2>
          <p className="section-lead reveal">Hover or tap a card to meet each partner.</p>
        </div>

        <div className="team-grid">
          {team.map((m) => (
            <div className="flip-card reveal" data-cursor="Flip" tabIndex={0} key={m.name}>
              <div className="flip-inner">
                <div className="flip-front">
                  <div className="avatar-wrap">
                    <div className="avatar" style={{ "--a": m.colors[0], "--b": m.colors[1] }}>
                      {m.initials}
                    </div>
                    <span className="avatar-orbit" />
                  </div>
                  <h3>{m.name}</h3>
                  <span className="role">{m.role}</span>
                </div>
                <div className="flip-back">
                  <span className="role">{m.role}</span>
                  <h3>{m.name}</h3>
                  <p>{m.bio}</p>
                  <div className="socials">
                    <a href="#" aria-label={`${m.name} on LinkedIn`}>in</a>
                    <a href="#" aria-label={`Email ${m.name}`}>@</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
