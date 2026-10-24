// S&S wordmark recreated as live text (heavy serif, gold ampersand) so it stays crisp at any size and on dark backgrounds.
export default function Brand({ light = false }) {
  return (
    <a href="#home" className={`brand${light ? " light" : ""}`} aria-label="S&S Chartered Accountants home">
      <span className="brand-logo" aria-hidden="true">
        S<span className="amp">&amp;</span>S
      </span>
      <span className="brand-tag" aria-hidden="true">
        Chartered
        <br />
        Accountants
      </span>
    </a>
  );
}
