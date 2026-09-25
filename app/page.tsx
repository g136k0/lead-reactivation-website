import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { ConsultationForm } from "@/components/consultation-form";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { PslDeck } from "@/components/psl-deck";
import { EmailPopup } from "@/components/email-popup";

const systemItems = [
  ["Dormant lead reactivation", "Restart conversations with old enquiries using segmented, relevant campaigns."],
  ["Immediate lead response", "Give every new enquiry a useful next step while their interest is still high."],
  ["Long-term nurture", "Follow up with prospects who are interested, but not ready to decide today."],
  ["Appointment booking", "Move qualified prospects toward the correct consultation or next step."],
  ["No-show recovery", "Confirm appointments, send reminders and make rescheduling simple."],
  ["Unclosed opportunity follow-up", "Continue the conversation after consultations that did not close immediately."],
];

const included = [
  "Lead database review and cleanup",
  "Behaviour-based lead segmentation",
  "Dormant-lead reactivation campaign",
  "New-lead response automation",
  "Long-term nurture sequences",
  "Appointment-booking integration",
  "Confirmation and reminder sequences",
  "No-show recovery",
  "Unclosed-consultation follow-up",
  "Campaign copywriting and testing",
  "Lead-status notifications",
  "Performance dashboard",
  "45 days of monitoring and optimisation",
];

const faq = [
  ["Are you generating new leads?", "No. We focus on converting more of the leads you have already generated. Paid advertising and outbound lead generation are not included."],
  ["Will my team need to learn new software?", "Usually not. We build around your existing tools where possible. Your team mainly handles interested prospects and appointments."],
  ["Will you send generic mass emails?", "No. Leads are segmented by service interest, previous activity and stage in the decision process so each message fits the reason they originally enquired."],
  ["How quickly can the system launch?", "Most systems can be prepared within approximately 10 business days after access and approvals are provided."],
  ["What if my database is not suitable?", "We will tell you during the consultation. We do not recommend launching when the data is too small, outdated, inappropriate or lacks the necessary permissions."],
  ["Do you guarantee sales?", "No. Your team controls pricing, consultations and closing. We agree on a target based on qualified, attended appointments—the outcome our system is designed to influence directly."],
];

const contents = [
  ["01", "The opportunity", "opportunity"],
  ["02", "How it works", "system"],
  ["03", "What’s included", "included"],
  ["04", "The process", "process"],
  ["05", "A good fit?", "fit"],
  ["06", "Common questions", "faq"],
];

function Cta({ label = "Book a free consultation" }: { label?: string }) {
  return <a className="button" href="#consultation">{label}<ArrowRight size={17} aria-hidden="true" /></a>;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="LeadRevive home">
            <Image src="/leadrevive-logo-dark.svg" width={150} height={30} alt="LeadRevive" priority />
          </a>
          <span className="header-description">A better way to follow up.</span>
          <a className="header-cta" href="#consultation">Free consultation <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </header>

      <div className="document-workspace" id="top">
        <aside className="document-outline" aria-label="Document outline">
          <p>In this document</p>
          <nav aria-label="Page sections">
            {contents.map(([number, label, id]) => <a href={"#" + id} key={id}><span>{number}</span>{label}</a>)}
          </nav>
          <a className="outline-cta" href="#consultation">Let’s talk <ArrowUpRight size={14} aria-hidden="true" /></a>
          <span className="outline-note">Lead recovery.<br />Without more ad spend.</span>
        </aside>

        <main className="document" id="main-content">
          <section className="hero" aria-labelledby="hero-title">
            <p className="document-label">LeadRevive / Service overview</p>
            <h1 id="hero-title">You already paid for the leads.<br />Stop losing them.</h1>
            <p className="hero-lede">We reactivate dormant leads and install the follow-up system that turns more new enquiries into qualified, attended appointments.</p>
            <div className="hero-actions">
              <Cta />
              <a className="text-link" href="#system">Read how it works <span aria-hidden="true">↓</span></a>
            </div>
            <p className="microcopy">No obligation. Clear recommendations.</p>
            <div className="document-note">
              <strong>Who this is for</strong>
              <p>Established service businesses with €2K+ client value, 1,000+ dormant leads and 50+ new enquiries a month.</p>
            </div>
          </section>

          <section className="document-section" id="opportunity">
            <SectionLabel number="01">The opportunity</SectionLabel>
            <h2>Most businesses don’t have a lead problem. They have a follow-up problem.</h2>
            <p>A prospect enquires. Someone calls once or twice. The prospect doesn’t answer. The team gets busy with newer leads. The original enquiry disappears.</p>
            <p>You paid for that opportunity. It deserves more than a couple of attempts.</p>
            <div className="example-note">
              <strong>A simple example</strong>
              <p>3 additional clients × €2,000 client value = <b>€6,000 in potential value.</b></p>
              <small>Illustrative only. This is not a forecast or a guarantee of results.</small>
            </div>
            <div className="briefing" id="psl">
              <div className="briefing-heading"><h3>The idea, in six slides</h3><span>A quick overview</span></div>
              <PslDeck />
            </div>
          </section>

          <section className="document-section" id="system">
            <SectionLabel number="02">How it works</SectionLabel>
            <h2>One system. Every stage of follow-up.</h2>
            <p>We begin with the fastest opportunity—your dormant database—then close the gaps that cause future leads to disappear.</p>
            <div className="system-table">
              <div className="system-table-head" aria-hidden="true"><span>What we handle</span><span>What it does</span></div>
              {systemItems.map(([title, text], index) => (
                <article className="system-row" key={title}>
                  <h3><span>{String(index + 1).padStart(2, "0")}</span>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="document-section" id="included">
            <SectionLabel number="03">What’s included</SectionLabel>
            <h2>We build it. Your team handles the opportunities.</h2>
            <p>A complete implementation, from database cleanup to the follow-up after a consultation.</p>
            <ul className="included-list">{included.map(item => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul>
            <p className="section-footnote">Built around your existing tools wherever possible.</p>
          </section>

          <section className="document-section" id="process">
            <SectionLabel number="04">The process</SectionLabel>
            <h2>From dormant database to live system.</h2>
            <ol className="process-list">
              {[
                ["Diagnose", "We assess your data, follow-up gaps, customer value and capacity."],
                ["Build", "We segment the leads, write the campaigns and connect the automations."],
                ["Launch", "We start with dormant-lead reactivation to create the fastest opportunity."],
                ["Optimise", "We monitor responses, bookings and attendance for the first 45 days."],
              ].map(([title, text]) => <li key={title}><div><h3>{title}</h3><p>{text}</p></div></li>)}
            </ol>
            <p className="process-note"><strong>Your part:</strong> provide access, approve the messaging and handle qualified conversations.</p>
            <div className="promise-note">
              <h3>The 45-day promise</h3>
              <p>Before starting, we review your database and agree on a realistic target for qualified, attended appointments. If we miss it during the first 45 days, we waive the following management fee and continue improving the system free for up to another 45 days.</p>
              <a className="text-link" href="#consultation">Check if my business qualifies <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </section>

          <section className="document-section" id="fit">
            <SectionLabel number="05">A good fit?</SectionLabel>
            <h2>Let’s make sure the numbers make sense.</h2>
            <div className="fit-columns">
              <div><h3>This is a good fit if you…</h3><ul>
                <li>Sell a consultation-based service worth approximately €2,000+</li>
                <li>Have at least 1,000 old leads</li>
                <li>Generate at least 50 new enquiries monthly</li>
                <li>Have capacity for more appointments</li>
              </ul></div>
              <div><h3>This is not a fit if you…</h3><ul>
                <li>Have almost no existing leads</li>
                <li>Need us to generate advertising traffic</li>
                <li>Sell a very low-value service</li>
                <li>Cannot accommodate more appointments</li>
                <li>Expect automation to replace sales completely</li>
              </ul></div>
            </div>
            <div className="pilot-note"><h3>A note on the early-client pilot</h3><p>We’re building the first case studies for this offer. Suitable founding clients receive lower pilot pricing and extra hands-on support. In return, we ask for honest feedback and—only if the results are worth sharing—permission to publish an anonymised case study.</p></div>
          </section>

          <section className="document-section" id="faq">
            <SectionLabel number="06">Common questions</SectionLabel>
            <h2>Before we talk.</h2>
            <div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </section>

          <section className="document-section consultation-section" id="consultation">
            <SectionLabel number="07">The next step</SectionLabel>
            <h2>Before you buy more leads, let’s look at the ones you already have.</h2>
            <p>Tell us about your pipeline and choose a preferred time. We’ll discuss your follow-up, the likely conversion gaps and whether a recovery campaign makes sense.</p>
            <p className="consultation-note">A free, 30-minute conversation. No obligation. We’ll confirm your preferred time separately.</p>
            <ConsultationForm />
          </section>

          <footer className="document-footer"><a href="#top">LeadRevive</a><p>Lead recovery systems for service businesses.</p><a href="#top" className="back-to-top" aria-label="Back to top">↑</a></footer>
        </main>
      </div>
      <MobileStickyCta />
      <EmailPopup />
    </>
  );
}
