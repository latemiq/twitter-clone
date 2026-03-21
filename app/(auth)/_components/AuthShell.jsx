"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const heroTags = ["Breaking news", "Tech", "Culture", "Sports"];

const heroHighlights = [
  {
    title: "Live updates",
    detail: "Stories, reactions, and commentary move here first.",
  },
  {
    title: "Communities",
    detail: "Jump into conversations around the topics you follow.",
  },
  {
    title: "Spaces",
    detail: "Listen in when the timeline turns into a live room.",
  },
];

export default function AuthShell({ title, subtitle, children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({
        defaults: {
          duration: 0.72,
          ease: "power3.out",
        },
      });

      introTimeline
        .fromTo(
          ".auth-shell__eyebrow, .auth-shell__mobileBadge",
          { autoAlpha: 0, y: 18, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1 },
          0.06
        )
        .fromTo(
          ".auth-shell__wordmark, .auth-shell__brand",
          { autoAlpha: 0, y: 18, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1 },
          0.12
        )
        .fromTo(
          ".auth-shell__headline, .auth-shell__title",
          { autoAlpha: 0, y: 18, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1 },
          0.18
        )
        .fromTo(
          ".auth-shell__subheadline, .auth-shell__copy",
          { autoAlpha: 0, y: 18, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1 },
          0.24
        )
        .fromTo(
          ".auth-shell__form",
          { autoAlpha: 0, y: 18, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1 },
          0.32
        )
        .fromTo(
          ".auth-shell__highlight",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
          },
          0.2
        );

      gsap.to(".auth-shell__heroGrid", {
        x: 56,
        y: 56,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".auth-shell__heroGlow--top", {
        x: 18,
        y: 18,
        scale: 1.08,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".auth-shell__heroGlow--bottom", {
        x: -18,
        y: -18,
        scale: 1.08,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      [
        { selector: ".auth-shell__orb--one", y: -18, duration: 7, delay: 0 },
        { selector: ".auth-shell__orb--two", y: -16, duration: 8, delay: 1.2 },
        { selector: ".auth-shell__orb--three", y: -14, duration: 6.8, delay: 0.6 },
      ].forEach(({ selector, y, duration, delay }) => {
        gsap.to(selector, {
          y,
          duration,
          delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.utils.toArray(".auth-shell__pill").forEach((pill, index) => {
        gsap.to(pill, {
          y: -8,
          duration: 3.5,
          delay: index * 0.18,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="auth-shell min-h-screen grid grid-cols-1 md:grid-cols-[1.05fr_1fr] bg-white text-[#0f1419]"
    >
      <section className="auth-shell__hero relative hidden overflow-hidden md:flex items-stretch justify-center px-14 py-16 text-white">
        <div className="auth-shell__heroGrid" aria-hidden="true" />
        <div className="auth-shell__heroGlow auth-shell__heroGlow--top" aria-hidden="true" />
        <div className="auth-shell__heroGlow auth-shell__heroGlow--bottom" aria-hidden="true" />
        <span className="auth-shell__orb auth-shell__orb--one" aria-hidden="true" />
        <span className="auth-shell__orb auth-shell__orb--two" aria-hidden="true" />
        <span className="auth-shell__orb auth-shell__orb--three" aria-hidden="true" />

        <div className="relative z-10 flex h-full w-full max-w-[560px] flex-col justify-between">
          <div className="max-w-[460px]">
            <p className="auth-shell__eyebrow text-sm font-semibold uppercase tracking-[0.32em] text-white/80">
              Live conversations
            </p>
            <p className="auth-shell__wordmark text-[92px] leading-none font-black tracking-[-0.04em]">
              Twitter
            </p>
            <h1 className="auth-shell__headline mt-8 text-5xl font-black leading-[1.1]">
              See what&apos;s happening right now
            </h1>
            <p className="auth-shell__subheadline mt-5 text-xl text-white/90">
              Join conversations with people and topics you care about.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="auth-shell__pill inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="auth-shell__highlights mt-10 grid max-w-[520px] grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {heroHighlights.map((item) => (
              <article
                key={item.title}
                className="auth-shell__highlight rounded-[28px] p-5"
              >
                <p className="text-sm font-semibold tracking-tight text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/78">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="auth-shell__panelWrap flex min-h-screen items-center justify-center px-5 py-10 md:px-10">
        <div className="auth-shell__panel w-full max-w-[430px]">
          <span className="auth-shell__mobileBadge inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1d9bf0] md:hidden">
            Live now
          </span>
          <p className="auth-shell__brand mt-5 text-2xl font-black tracking-tight text-[#1d9bf0] md:mt-0">
            twitter
          </p>
          <h2 className="auth-shell__title mt-5 text-[34px] font-black leading-[1.15] text-[#0f1419]">
            {title}
          </h2>
          <p className="auth-shell__copy mt-2 text-sm text-[#536471]">{subtitle}</p>
          <div className="auth-shell__form mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
