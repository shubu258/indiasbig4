import { brandsRowA, brandsRowB } from "@/lib/content";

const marks = ["◆", "▲", "●", "■", "✦"];

function Row({ items, reverse }) {
  // Items are rendered twice so the CSS loop is seamless
  const list = [...items, ...items];
  return (
    <div className={`marquee${reverse ? " reverse" : ""}`}>
      <div className="marquee-track">
        {list.map((name, i) => (
          <span className="logo" key={`${name}-${i}`} aria-hidden={i >= items.length}>
            <i>{marks[i % marks.length]}</i>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Brands() {
  return (
    <section className="brands section" id="brands">
      <div className="container section-head center">
        <span className="section-tag reveal">Brands We Collaborated With</span>
        <h2 className="section-title reveal">
          Partnering with businesses <span className="hl">big &amp; small.</span>
        </h2>
      </div>
      <div className="marquee-3d">
        <Row items={brandsRowA} />
        <Row items={brandsRowB} reverse />
      </div>
    </section>
  );
}
