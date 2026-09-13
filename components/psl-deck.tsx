"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Database, MailCheck, Target, UserCheck } from "lucide-react";

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
    accent: <>Start with a free Lead Leakage Audit.</>,
    body: "We’ll review your database, current follow-up and potential recovery opportunities—then tell you honestly whether the numbers justify a campaign.",
    visual: "audit",
  },
];

function SlideVisual({ type }: { type: string }) {
  if (type === "math") return <div className="slide-math"><span>100 leads</span><b>×</b><span>3 recovered</span><b>=</b><strong>€6K</strong></div>;
  if (type === "leaks") return <div className="leak-list"><span>NEW ENQUIRY <i>waiting</i></span><span>APPOINTMENT <i>no-show</i></span><span>PROPOSAL <i>quiet</i></span></div>;
  if (type === "system") return <div className="slide-icons"><Database/><ArrowRight/><MailCheck/><ArrowRight/><UserCheck/></div>;
  if (type === "build") return <div className="build-visual"><Clock3/><strong>10</strong><span>business days<br/>to launch</span></div>;
  if (type === "audit") return <div className="audit-visual"><Target/><span><Check/> Database opportunity</span><span><Check/> Follow-up gaps</span><span><Check/> Recovery map</span></div>;
  return <div className="hook-visual"><span>MORE LEADS</span><div/><strong>BETTER FOLLOW-UP</strong></div>;
}

export function PslDeck() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <div className="psl-deck" aria-live="polite">
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
          {active === slides.length - 1 && <a className="button button-accent" href="#audit">Get my free audit <ArrowRight size={18}/></a>}
        </div>
        <div className="slide-visual"><SlideVisual type={slide.visual}/></div>
      </div>
      <div className="deck-controls">
        <button aria-label="Previous slide" disabled={active === 0} onClick={() => setActive((n) => Math.max(0, n - 1))}><ArrowLeft/></button>
        <div className="progress-dots" aria-label={`Slide ${active + 1} of ${slides.length}`}>
          {slides.map((_, index) => <button key={index} aria-label={`Go to slide ${index + 1}`} className={index === active ? "active" : ""} onClick={() => setActive(index)}/>) }
        </div>
        <button aria-label="Next slide" disabled={active === slides.length - 1} onClick={() => setActive((n) => Math.min(slides.length - 1, n + 1))}><ArrowRight/></button>
      </div>
    </div>
  );
}
