"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function MobileStickyCta() {
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [consultationVisible, setConsultationVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector(".hero-actions");
    const consultation = document.getElementById("consultation");

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    const consultationObserver = new IntersectionObserver(
      ([entry]) => setConsultationVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );

    if (heroCta) heroObserver.observe(heroCta);
    if (consultation) consultationObserver.observe(consultation);

    return () => {
      heroObserver.disconnect();
      consultationObserver.disconnect();
    };
  }, []);

  const visible = !heroCtaVisible && !consultationVisible;

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
