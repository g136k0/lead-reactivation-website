"use client";

import { TouchEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Clock3, Database, MailCheck, MessageSquareText, Search, Target, UserCheck } from "lucide-react";

const slides = [
  {
    kicker: "The uncomfortable truth",
    title: <>You probably don’t need more leads.</>,
    accent: <>You need to stop losing the ones you already have.</>,
    body: "You paid to acquire the enquiry. But when follow-up stops before the prospect is ready, that investment quietly disappears.",
    visual: "hook",
  },
  {
    kicker: "The leak",
    title: <>Leads disappear at every stage.</>,
    accent: <>Not because they all said no.</>,
    body: "Old leads are forgotten. New leads wait. Booked appointments don’t show. Completed consultations go quiet. Each gap is an opportunity left behind.",
    visual: "leaks",
  },
  {
    kicker: "The economics",
    title: <>You don’t need to recover everyone.</>,
    accent: <>A few wins can change the maths.</>,
    body: "If you generate 100 leads a month and a client is worth €2,000, recovering three additional customers represents €6,000 in potential value.",
    visual: "math",
  },
  {
    kicker: "The mechanism",
    title: <>One connected follow-up system.</>,
    accent: <>From first enquiry to final decision.</>,
    body: "We reactivate dormant leads, respond to new enquiries, nurture undecided prospects, support booking, reduce no-shows and follow up after unclosed consultations.",
    visual: "system",
  },
  {
    kicker: "The implementation",
    title: <>We build it.</>,
    accent: <>Your team handles the opportunities.</>,
    body: "The personalised campaigns and automations are built around your existing process and usually launched within 10 business days.",
    visual: "build",
  },
  {
    kicker: "The next step",
    title: <>See what’s hiding in your database.</>,
    accent: <>Start with a free consultation.</>,
    body: "We’ll discuss your database, current follow-up and potential recovery opportunities—then tell you honestly whether the numbers justify a campaign.",
    visual: "audit",
  },
];

function SlideVisual({ type }: { type: string }) {
  if (type === "math") return (
    <div className="slide-math">
      <div className="lead-grid" aria-hidden="true">{Array.from({ length: 20 }, (_, index) => <i className={index < 3 ? "recovered" : ""} key={index}/>)}</div>
      <div className="math-equation"><span>3 additional clients</span><b>× €2,000</b><strong>€6,000</strong><small>illustrative potential value</small></div>
    </div>
  );
  if (type === "leaks") return (
    <div className="leak-list">
      <span><MessageSquareText/><b>New enquiry</b><i>slow response</i></span>
      <span><CalendarCheck/><b>Appointment</b><i>no-show</i></span>
      <span><Target/><b>Consultation</b><i>no follow-up</i></span>
    </div>
  );
  if (type === "system") return (
    <div className="system-visual">
      <span><Database/><b>Reactivate</b></span><ArrowRight/>
      <span><MailCheck/><b>Nurture</b></span><ArrowRight/>
      <span><UserCheck/><b>Book</b></span>
      <div className="system-loop">Every lead gets a defined next step</div>
    </div>
  );
  if (type === "build") return (
    <div className="build-visual">
      <div><small>Days 1–3</small><Search/><b>Review & map</b></div>
      <div><small>Days 4–7</small><MessageSquareText/><b>Build & approve</b></div>
      <div><small>Days 8–10</small><Clock3/><b>Launch</b></div>
    </div>
  );
  if (type === "audit") return (
    <div className="audit-visual">
      <div className="report-head"><Target/><span><b>Free consultation</b><small>Opportunity review</small></span></div>
      <span><Check/> Database opportunity</span><span><Check/> Follow-up gaps</span><span><Check/> Recommended recovery map</span>
      <strong>GO / NO-GO RECOMMENDATION</strong>
    </div>
  );
  return (
    <div className="hook-visual">
      <div><span>01</span><b>Lead acquired</b><small>Money spent</small></div>
      <ArrowRight/>
      <div className="lost-step"><span>02</span><b>Follow-up stops</b><small>Opportunity lost</small></div>
      <div className="recovery-path"><MailCheck/><b>Recovery system</b><small>Continue until a decision</small></div>
    </div>
  );
}

export function PslDeck() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slide = slides[active];

  function previous() {
    setActive((n) => Math.max(0, n - 1));
  }

  function next() {
    setActive((n) => Math.min(slides.length - 1, n + 1));
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX < 0) next();
    else previous();
  }

  return (
    <div
      className="psl-deck"
      role="region"
      aria-label="Lead Recovery Briefing carousel"
      aria-live="polite"
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div className="deck-topline">
        <span>THE LEAD RECOVERY BRIEFING</span>
        <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
      <div className="slide-content" key={active}>
        <div className="slide-copy">
          <span className="slide-kicker">{slide.kicker}</span>
          <h3>{slide.title}</h3>
          <h4>{slide.accent}</h4>
          <p>{slide.body}</p>
          {active === slides.length - 1 && <a className="button button-accent" href="#consultation">Book my free consultation <ArrowRight size={18}/></a>}
        </div>
        <div className="slide-visual"><SlideVisual type={slide.visual}/></div>
      </div>
      <div className="deck-controls">
        <button aria-label="Previous slide" disabled={active === 0} onClick={previous}><ArrowLeft/></button>
        <div className="progress-dots" aria-label={`Slide ${active + 1} of ${slides.length}`}>
          {slides.map((_, index) => <button key={index} aria-label={`Go to slide ${index + 1}`} className={index === active ? "active" : ""} onClick={() => setActive(index)}/>) }
        </div>
        <button aria-label="Next slide" disabled={active === slides.length - 1} onClick={next}><ArrowRight/></button>
      </div>
      <span className="swipe-hint">Swipe left or right to change slides</span>
    </div>
  );
}
