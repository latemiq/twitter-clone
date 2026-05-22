import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SplashScreen.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "🔥",
    title: "Trending Topics",
    desc: "Śledź to, co porusza świat — w czasie rzeczywistym.",
  },
  {
    icon: "💬",
    title: "Żywe dyskusje",
    desc: "Dołącz do milionów rozmów i wyrażaj swoje opinie na każdy temat.",
  },
  {
    icon: "🎙️",
    title: "Twitter Spaces",
    desc: "Słuchaj na żywo i rozmawiaj z ludźmi, którzy Cię inspirują.",
  },
];

const TWEETS = [
  {
    initials: "TI",
    name: "Tech Insider",
    handle: "@techinsider",
    text: "AI zmienia sposób, w jaki komunikujemy się online. Przyszłość jest już tutaj. 🚀 #Tech #AI #Innovation",
    likes: "24.1K",
    rt: "8.7K",
    color: "#1d9bf0",
  },
  {
    initials: "SL",
    name: "Sports Live",
    handle: "@sportslive",
    text: "⚡ BREAKING: Niesamowity finisz w ostatniej sekundzie! Historia się pisze na naszych oczach. #Sports",
    likes: "156K",
    rt: "45.2K",
    color: "#00ba7c",
  },
  {
    initials: "WN",
    name: "World News",
    handle: "@worldnews",
    text: "Globalny szczyt klimatyczny: przywódcy podpisują historyczne porozumienie o redukcji emisji CO₂. 🌍",
    likes: "89.3K",
    rt: "31.6K",
    color: "#ff7a00",
  },
  {
    initials: "MS",
    name: "Music Scene",
    handle: "@musicscene",
    text: "Niespodziewana trasa koncertowa ogłoszona! Bilety na sprzedaż już jutro 🎶 #Music #Concert",
    likes: "412K",
    rt: "127K",
    color: "#9c44dc",
  },
];

const STATS = [
  { end: 500, suffix: "M+", label: "tweetów dziennie" },
  { end: 200, suffix: "M+", label: "aktywnych użytkowników" },
  { end: 190, suffix: "+", label: "krajów i terytoriów" },
];

export default function SplashScreen({ onDismiss }) {
  const wrapperRef = useRef(null);
  const scrollerRef = useRef(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".sp-logo",
          { scale: 0, autoAlpha: 0, rotation: -180 },
          { scale: 1, autoAlpha: 1, rotation: 0, duration: 1.1, ease: "back.out(1.7)" })
        .fromTo(".sp-tagline",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 0.6, y: 0, duration: 0.7 }, "-=0.3")
        .fromTo(".sp-headline",
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.4")
        .fromTo(".sp-subheadline",
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(".sp-hero-actions",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(".sp-scroll-hint",
          { autoAlpha: 0, y: -10 },
          { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.1");

      // Floating background accents
      [
        [".sp-orb-a", -28, 14, 9, 0],
        [".sp-orb-b", 22, -12, 12, 1.5],
        [".sp-orb-c", -18, 8, 7.5, 0.8],
      ].forEach(([sel, y, x, dur, delay]) => {
        gsap.to(sel, { y, x, duration: dur, delay, ease: "sine.inOut", repeat: -1, yoyo: true });
      });

      gsap.to(".sp-scroll-hint", {
        y: 8, duration: 1.1, ease: "sine.inOut", repeat: -1, yoyo: true,
      });

      // Features section
      gsap.fromTo(".sp-features-title",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: ".sp-features", start: "top 75%", scroller },
        }
      );

      gsap.utils.toArray(".sp-feature-card").forEach((card, i) => {
        const x = i === 0 ? -80 : i === 2 ? 80 : 0;
        const y = i === 1 ? 60 : 0;
        gsap.fromTo(card,
          { autoAlpha: 0, x, y, scale: 0.88 },
          {
            autoAlpha: 1, x: 0, y: 0, scale: 1,
            duration: 0.8, delay: i * 0.18, ease: "power2.out",
            scrollTrigger: { trigger: ".sp-features", start: "top 65%", scroller },
          }
        );
      });

      // Feed preview section
      gsap.fromTo(".sp-feed-title",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: ".sp-tweets", start: "top 75%", scroller },
        }
      );

      gsap.utils.toArray(".sp-tweet").forEach((card, i) => {
        gsap.fromTo(card,
          { autoAlpha: 0, y: 70, scale: 0.94 },
          {
            autoAlpha: 1, y: 0, scale: 1,
            duration: 0.75, delay: i * 0.14, ease: "power2.out",
            scrollTrigger: { trigger: ".sp-tweets", start: "top 60%", scroller },
          }
        );
      });

      // Stats section
      gsap.fromTo(".sp-stats-title",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: ".sp-stats", start: "top 75%", scroller },
        }
      );

      ScrollTrigger.create({
        trigger: ".sp-stats",
        start: "top 65%",
        scroller,
        once: true,
        onEnter() {
          STATS.forEach((stat, i) => {
            const el = document.querySelector(`.sp-stat-val-${i}`);
            if (!el) return;
            const proxy = { val: 0 };
            gsap.fromTo(`.sp-stat-${i}`,
              { autoAlpha: 0, y: 55 },
              { autoAlpha: 1, y: 0, duration: 0.75, delay: i * 0.22, ease: "power2.out" }
            );
            gsap.fromTo(proxy, { val: 0 }, {
              val: stat.end, duration: 2.4, ease: "power2.out", delay: i * 0.22,
              onUpdate() { el.textContent = Math.round(proxy.val) + stat.suffix; },
            });
          });
        },
      });

      // CTA section
      gsap.fromTo(".sp-cta-content",
        { autoAlpha: 0, y: 60, scale: 0.95 },
        {
          autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".sp-cta", start: "top 70%", scroller },
        }
      );
    }, wrapperRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.body.style.overflow = "";
    };
  }, []);

  const dismiss = () => {
    document.body.style.overflow = "";
    gsap.to(wrapperRef.current, {
      autoAlpha: 0, scale: 1.04, duration: 0.55, ease: "power2.in",
      onComplete: onDismiss,
    });
  };

  return (
    <div ref={wrapperRef} className="sp-wrapper">
      <div ref={scrollerRef} className="sp-scroller">

        {/* HERO */}
        <section className="sp-hero sp-section">
          <span className="sp-orb sp-orb-a" aria-hidden="true" />
          <span className="sp-orb sp-orb-b" aria-hidden="true" />
          <span className="sp-orb sp-orb-c" aria-hidden="true" />
          <div className="sp-grid-bg" aria-hidden="true" />

          <div className="sp-hero-inner">
            <svg className="sp-logo" viewBox="0 0 24 24" aria-label="Twitter">
              <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.255 5.623L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            <p className="sp-tagline">Dołącz do rozmowy</p>
            <h1 className="sp-headline">
              Happening<br />Right Now.
            </h1>
            <p className="sp-subheadline">
              Miliony głosów. Jeden feed. Twój Twitter.
            </p>
            <div className="sp-hero-actions">
              <button className="sp-cta-btn" onClick={dismiss}>
                Wejdź do aplikacji
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="sp-skip-btn" onClick={dismiss}>
                Pomiń intro
              </button>
            </div>
          </div>

          <div className="sp-scroll-hint" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span>Przewiń</span>
          </div>
        </section>

        {/* FEATURES */}
        <section className="sp-features sp-section">
          <h2 className="sp-features-title sp-section-title">Odkryj co możesz robić</h2>
          <div className="sp-features-grid">
            {FEATURES.map((f) => (
              <article key={f.title} className="sp-feature-card">
                <span className="sp-feature-icon">{f.icon}</span>
                <h3 className="sp-feature-name">{f.title}</h3>
                <p className="sp-feature-desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FEED PREVIEW */}
        <section className="sp-tweets sp-section">
          <h2 className="sp-feed-title sp-section-title">Twój feed, na żywo</h2>
          <div className="sp-tweets-grid">
            {TWEETS.map((t) => (
              <article key={t.handle} className="sp-tweet">
                <div className="sp-tweet-header">
                  <span className="sp-tweet-avatar" style={{ background: t.color }}>
                    {t.initials}
                  </span>
                  <div>
                    <p className="sp-tweet-name">{t.name}</p>
                    <p className="sp-tweet-handle">{t.handle}</p>
                  </div>
                </div>
                <p className="sp-tweet-text">{t.text}</p>
                <div className="sp-tweet-actions">
                  <span>🔁 {t.rt}</span>
                  <span>❤️ {t.likes}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="sp-stats sp-section">
          <h2 className="sp-stats-title sp-section-title">Twitter w liczbach</h2>
          <div className="sp-stats-grid">
            {STATS.map((s, i) => (
              <div key={s.label} className={`sp-stat sp-stat-${i}`}>
                <p className={`sp-stat-val sp-stat-val-${i}`}>0{s.suffix}</p>
                <p className="sp-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="sp-cta sp-section">
          <div className="sp-cta-content">
            <svg className="sp-cta-logo" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.255 5.623L18.244 2.25z" />
            </svg>
            <h2 className="sp-cta-headline">Gotowy, żeby dołączyć?</h2>
            <p className="sp-cta-sub">
              Tysiące rozmów czeka. Twój głos ma znaczenie.
            </p>
            <button className="sp-cta-btn sp-cta-btn--large" onClick={dismiss}>
              Wejdź do aplikacji
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
