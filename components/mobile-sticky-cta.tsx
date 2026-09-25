"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function MobileStickyCta() {
  const [heroCtaPassed, setHeroCtaPassed] = useState(false);
  const [consultationVisible, setConsultationVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector(".hero-actions");
    const consultation = document.getElementById("consultation");

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroCtaPassed(!entry.isIntersecting && entry.boundingClientRect.bottom <= 72),
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" },
    );
    const consultationObserver = new IntersectionObserver(
      ([entry]) => setConsultationVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    if (heroCta) heroObserver.observe(heroCta);
    if (consultation) consultationObserver.observe(consultation);

    return () => {
      heroObserver.disconnect();
      consultationObserver.disconnect();
    };
  }, []);

  const visible = heroCtaPassed && !consultationVisible;

  return (
    <a
      className={`mobile-sticky${visible ? " is-visible" : ""}`}
      href="#consultation"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      Free consultation <ArrowRight size={17} />
    </a>
  );
}
