
import Link from "next/link";

const storySections = [
  {
    number: "01",
    eyebrow: "UNDERSTAND THE CITY",
    title: "Every neighbourhood has a story.",
    description:
      "Explore reported incidents across Chennai and understand how safety concerns vary from one locality to another.",
    visual: "city",
  },
  {
    number: "02",
    eyebrow: "LOOK BEYOND THE NUMBERS",
    title: "Context changes everything.",
    description:
      "Crime categories, reporting dates and locality-level patterns help turn individual reports into a clearer picture.",
    visual: "signals",
  },
  {
    number: "03",
    eyebrow: "MAKE INFORMATION USEFUL",
    title: "Awareness starts with insight.",
    description:
      "Move from the big picture to reviewed reports, explore local concerns and make informed decisions with the available evidence.",
    visual: "insight",
  },
];

export default function Home() {
  return (
    <main className="story-page">
      <header className="site-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">C</span>
          <span>CHENNAI<span className="brand-muted"> / SAFETY</span></span>
        </Link>

        <a className="nav-note" href="#the-story">
          THE CITY, IN CONTEXT <span>↘</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div className="hero-content">
          <p className="eyebrow">
            <span className="live-dot" />
            A CITYWIDE SAFETY PERSPECTIVE
          </p>

          <h1>
            Know your
            <br />
            city<span className="accent">.</span>
            <br />
            <span className="outline-text">See the bigger</span>
            <br />
            picture<span className="accent">.</span>
          </h1>

          <p className="hero-description">
            A clearer perspective on Chennai through reviewed reports,
            neighbourhood insights and crime-related news.
          </p>

          <a className="primary-button" href="#the-story">
            Explore the story <span>↓</span>
          </a>
        </div>

        <div className="hero-side-label">CHENNAI, TAMIL NADU · INDIA</div>

        <div className="hero-bottom">
          <span>INFORMATION. CONTEXT. AWARENESS.</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        <div className="city-art" aria-hidden="true">
          <div className="sun" />
          <div className="city-line city-line-one" />
          <div className="city-line city-line-two" />
          <div className="building building-one" />
          <div className="building building-two" />
          <div className="building building-three" />
          <div className="building building-four" />
          <div className="building building-five" />
          <div className="coastline" />
          <div className="map-point point-one" />
          <div className="map-point point-two" />
          <div className="map-point point-three" />
        </div>
      </section>

      <section className="story-intro" id="the-story">
        <p className="eyebrow">A DIFFERENT WAY TO SEE SAFETY</p>
        <h2>
          Not just reports.
          <br />
          <span className="muted-heading">A story about place.</span>
        </h2>
        <p>
          Chennai is more than a collection of locations on a map. Explore
          the information behind the headlines, one perspective at a time.
        </p>
        <div className="scroll-line" />
      </section>

      <section className="story-sections">
        {storySections.map((item) => (
          <article className="story-panel" key={item.number}>
            <div className="story-copy">
              <p className="eyebrow">
                {item.number} / {item.eyebrow}
              </p>
              <h2>{item.title}</h2>
              <p className="story-description">{item.description}</p>
            </div>

            <div
              className={`story-visual visual-${item.visual}`}
              aria-hidden="true"
            >
              {item.visual === "city" && (
                <div className="visual-city">
                  <span className="orbit orbit-one" />
                  <span className="orbit orbit-two" />
                  <span className="visual-pin pin-one">+</span>
                  <span className="visual-pin pin-two">+</span>
                  <span className="visual-pin pin-three">+</span>
                  <span className="visual-caption">CHENNAI / LOCALITY VIEW</span>
                </div>
              )}

              {item.visual === "signals" && (
                <div className="signal-bars">
                  {[42, 68, 48, 86, 60, 96, 55, 76, 38, 67, 88, 51].map(
                    (height, index) => (
                      <span
                        key={index}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                  <span className="visual-caption">PATTERNS NEED CONTEXT</span>
                </div>
              )}

              {item.visual === "insight" && (
                <div className="insight-ring">
                  <div className="ring-inner">
                    <span>DATA</span>
                    <strong>→</strong>
                    <span>INSIGHT</span>
                  </div>
                  <span className="visual-caption">FROM REPORTS TO AWARENESS</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-cta">
        <p className="eyebrow">YOUR NEXT STEP</p>
        <h2>
          The story is the beginning.
          <br />
          <span className="muted-heading">Explore the dashboard.</span>
        </h2>
        <p>
          Explore reviewed reports and locality-level safety information
          when the dashboard is connected to your project data.
        </p>
        <Link href="/dashboard" className="primary-button">
          Enter the dashboard <span>↗</span>
        </Link>
        <span className="cta-footnote">
          BUILT FOR A MORE INFORMED CHENNAI
        </span>
      </section>

      <footer className="site-footer">
        <Link href="/" className="brand">
          <span className="brand-mark">C</span>
          CHENNAI / SAFETY
        </Link>
        <span>INFORMATION WITH CONTEXT.</span>
      </footer>
    </main>
  );
}
