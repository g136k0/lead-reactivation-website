"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Mail, X } from "lucide-react";

const STORAGE_KEY = "leadrevive-email-popup-until";

export function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const emailInput = useRef<HTMLInputElement>(null);
  const suppressed = useRef(false);

  useEffect(() => {
    const hiddenUntil = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
    if (hiddenUntil > Date.now()) return;

    const consultationIsVisible = () => {
      const section = document.getElementById("consultation");
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const show = () => {
      if (!suppressed.current && !consultationIsVisible()) setVisible(true);
    };

    const timer = window.setTimeout(show, 18000);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable > 0.35) show();
    };
    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && window.matchMedia("(pointer: fine)").matches) show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    emailInput.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, status]);

  function close() {
    suppressed.current = true;
    setVisible(false);
    const days = status === "success" ? 30 : 7;
    window.localStorage.setItem(STORAGE_KEY, String(Date.now() + days * 24 * 60 * 60 * 1000));
  }

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          companyWebsite,
          source: window.location.pathname,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (!response.ok) throw new Error("Subscription failed");
      setStatus("success");
      window.localStorage.setItem(STORAGE_KEY, String(Date.now() + 30 * 24 * 60 * 60 * 1000));
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <div className="email-popup-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) close();
    }}>
      <section className="email-popup" role="dialog" aria-modal="true" aria-labelledby="email-popup-title">
        <button className="email-popup-close" type="button" onClick={close} aria-label="Close email signup"><X size={20}/></button>

        <div className="email-popup-visual" aria-hidden="true">
          <span>THE LEAD RECOVERY NOTES</span>
          <strong>7</strong>
          <p>pipeline leaks<br/>worth checking</p>
          <div><Check size={16}/> Practical. Specific. Free.</div>
        </div>

        <div className="email-popup-copy">
          {status === "success" ? (
            <div className="email-popup-success">
              <div className="success-icon"><Check size={28}/></div>
              <span className="form-kicker">You’re on the list</span>
              <h2 id="email-popup-title">Your leads are worth another look.</h2>
              <p>We’ve saved your email. We’ll share practical ways to recover more value from the leads you already have.</p>
              <button className="text-popup-button" type="button" onClick={close}>Continue reading</button>
            </div>
          ) : (
            <>
              <span className="form-kicker"><Mail size={15}/> Free email series</span>
              <h2 id="email-popup-title">Before you buy another lead, fix the leaks costing you appointments.</h2>
              <p>Get short, practical emails showing you where service businesses lose enquiries—and how to recover more of them.</p>
              <ul>
                <li><Check size={16}/> Find the seven common follow-up leaks</li>
                <li><Check size={16}/> Prioritise the fastest recovery opportunities</li>
                <li><Check size={16}/> Get one useful idea at a time—without the daily noise</li>
              </ul>
              <form onSubmit={subscribe}>
                <input className="form-trap" name="companyWebsite" value={companyWebsite} onChange={(event) => setCompanyWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <label htmlFor="popup-email">Where should we send future notes?</label>
                <div className="email-popup-form-row">
                  <input ref={emailInput} id="popup-email" name="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourbusiness.com" />
                  <button className="button button-dark" type="submit" disabled={status === "sending"}>{status === "sending" ? "Joining…" : "Join free"}<ArrowRight size={18}/></button>
                </div>
                {status === "error" && <p className="email-popup-error" role="alert">Something went wrong. Please try again.</p>}
                <small>By subscribing, you agree to receive LeadRevive emails. Unsubscribe anytime.</small>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
