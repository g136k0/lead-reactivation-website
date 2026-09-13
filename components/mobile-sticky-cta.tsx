"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function MobileStickyCta() {
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [auditVisible, setAuditVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector(".hero-actions");
    const audit = document.getElementById("audit");

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    const auditObserver = new IntersectionObserver(
      ([entry]) => setAuditVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );

    if (heroCta) heroObserver.observe(heroCta);
    if (audit) auditObserver.observe(audit);

    return () => {
      heroObserver.disconnect();
      auditObserver.disconnect();
    };
  }, []);

  const visible = !heroCtaVisible && !auditVisible;

  return (
    <a
      className={`mobile-sticky${visible ? " is-visible" : ""}`}
      href="#audit"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      Get my free audit <ArrowRight size={17} />
    </a>
  );
}
