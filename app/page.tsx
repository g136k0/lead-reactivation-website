import { ArrowRight, Check, Clock3, Database, MailCheck, ShieldCheck, Sparkles, Target, UserCheck, X } from "lucide-react";
import Image from "next/image";
import { ConsultationForm } from "@/components/consultation-form";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { PslDeck } from "@/components/psl-deck";

const systemItems = [
  { icon: Database, title: "Dormant lead reactivation", text: "Restart conversations with old enquiries using segmented, relevant campaigns." },
  { icon: Clock3, title: "Immediate lead response", text: "Give every new enquiry a useful next step while their interest is still high." },
  { icon: MailCheck, title: "Long-term nurture", text: "Follow up with prospects who are interested, but not ready to decide today." },
  { icon: Target, title: "Appointment booking", text: "Move qualified prospects toward the correct consultation or next step." },
  { icon: UserCheck, title: "No-show recovery", text: "Confirm appointments, send reminders and make rescheduling simple." },
  { icon: Sparkles, title: "Unclosed opportunity follow-up", text: "Continue the conversation after consultations that did not close immediately." },
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

function Cta({ label = "Book my free consultation", dark = false }: { label?: string; dark?: boolean }) {
  return (
    <a className={dark ? "button button-dark" : "button button-accent"} href="#consultation">
      {label}<ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="LeadRevive home">
          <Image className="wordmark-logo" src="/leadrevive-logo-light.svg" width={200} height={40} alt="LeadRevive" priority />
        </a>
        <nav aria-label="Main navigation">
          <a href="#system">The system</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href="#consultation">Free consultation <ArrowRight size={16} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid page-shell">
          <div className="hero-copy">
            <div className="eyebrow"><span /> For established service businesses</div>
            <h1>You already paid for the leads.<br /><em>Stop losing them.</em></h1>
            <p className="hero-lede">We reactivate dormant leads and install the follow-up system that turns more new enquiries into qualified, attended appointments.</p>
            <div className="hero-actions">
              <Cta />
              <a className="text-link" href="#psl">See how it works <ArrowRight size={17} /></a>
            </div>
            <p className="microcopy">No obligation. Clear recommendations. Delivered within two business days.</p>
          </div>

          <div className="pipeline-panel" aria-label="Illustrative lead recovery pipeline">
            <div className="panel-topline"><span>Opportunity pipeline</span><span className="live-pill">LIVE</span></div>
            <div className="metric-row">
              <div><small>Dormant leads</small><strong>1,284</strong></div>
              <div><small>Re-engaged</small><strong className="accent-text">94</strong></div>
            </div>
            <div className="pipeline-list">
              <div><span className="dot dot-muted"/><p>Database cleaned</p><b>1,284</b></div>
              <div><span className="dot dot-warm"/><p>Conversations restarted</p><b>94</b></div>
              <div><span className="dot dot-accent"/><p>Qualified opportunities</p><b>27</b></div>
              <div><span className="dot dot-white"/><p>Appointments attended</p><b>14</b></div>
            </div>
            <p className="example-label">Illustrative dashboard data</p>
          </div>
        </div>
        <div className="qualification-strip">
          <span>Built for businesses with</span>
          <strong>€2K+ client value</strong>
          <strong>1,000+ dormant leads</strong>
          <strong>50+ monthly enquiries</strong>
        </div>
      </section>

      <section className="section psl-section" id="psl">
        <div className="page-shell narrow-shell">
          <div className="section-intro centered">
            <span className="section-number">01 / THE OPPORTUNITY</span>
            <h2>See how the recovery system works.</h2>
            <p>A six-slide breakdown of where service businesses lose valuable enquiries—and how to recover them.</p>
          </div>
          <PslDeck />
        </div>
      </section>

      <section className="section problem-section">
        <div className="page-shell split-heading">
          <div>
            <span className="section-number">02 / THE LEAK</span>
            <h2>Most businesses don’t have a lead problem.</h2>
          </div>
          <div className="large-copy">
            <p>They have a <mark>follow-up problem.</mark></p>
            <p className="body-copy">A prospect enquires. Someone calls once or twice. The prospect doesn’t answer. The team gets busy with newer leads. The original enquiry disappears.</p>
          </div>
        </div>
        <div className="page-shell cost-card">
          <div>
            <span className="cost-kicker">A simple example</span>
            <p>100 leads/month</p>
            <p>€2,000 client value</p>
          </div>
          <div className="cost-equation">
            <span>Recover just</span>
            <strong>3</strong>
            <span>additional clients</span>
          </div>
          <div className="cost-result">
            <span>Potential value</span>
            <strong>€6,000</strong>
            <small>Illustrative example</small>
          </div>
        </div>
      </section>

      <section className="section system-section" id="system">
        <div className="page-shell">
          <div className="section-intro max-copy">
            <span className="section-number">03 / THE SYSTEM</span>
            <h2>One system. Every stage of follow-up.</h2>
            <p>We begin with the fastest opportunity—your dormant database—then close the gaps that cause future leads to disappear.</p>
          </div>
          <div className="system-grid">
            {systemItems.map(({ icon: Icon, title, text }, index) => (
              <article className="system-card" key={title}>
                <div className="card-index">0{index + 1}</div>
                <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section offer-section">
        <div className="page-shell offer-grid">
          <div className="offer-copy">
            <span className="section-number">04 / WHAT YOU GET</span>
            <h2>A complete conversion infrastructure—not a folder of emails.</h2>
            <p>We build, launch and improve the machinery. Your team handles the real opportunities.</p>
            <Cta label="See what my business is missing" />
          </div>
          <div className="included-card">
            <div className="included-title"><span>Complete implementation</span><b>Included</b></div>
            <ul>
              {included.map((item) => <li key={item}><Check size={17} />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="page-shell">
          <div className="section-intro centered light-text">
            <span className="section-number">05 / THE PROCESS</span>
            <h2>From dormant database to live system.</h2>
          </div>
          <div className="process-grid">
            {[
              ["01", "Diagnose", "We assess your data, follow-up gaps, customer value and capacity."],
              ["02", "Build", "We segment the leads, write the campaigns and connect the automations."],
              ["03", "Launch", "We start with dormant-lead reactivation to create the fastest opportunity."],
              ["04", "Optimise", "We monitor responses, bookings and attendance for the first 45 days."],
            ].map(([n, title, text]) => (
              <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <p className="process-note">Your involvement: provide access, approve the messaging, handle qualified conversations.</p>
        </div>
      </section>

      <section className="section guarantee-section">
        <div className="page-shell guarantee-card">
          <div className="guarantee-icon"><ShieldCheck size={34} strokeWidth={1.5}/></div>
          <div>
            <span className="section-number">THE 45-DAY PROMISE</span>
            <h2>We take responsibility for the part we control.</h2>
            <p>Before starting, we review your database and agree on a realistic target for qualified, attended appointments. If we miss it during the first 45 days, we waive the following management fee and continue improving the system free for up to another 45 days.</p>
            <a className="text-link dark-link" href="#consultation">Check if my business qualifies <ArrowRight size={17}/></a>
          </div>
        </div>
      </section>

      <section className="section fit-section">
        <div className="page-shell fit-grid">
          <div className="fit-card fit-yes">
            <div className="fit-title"><Check size={20}/><h3>This is a good fit if you…</h3></div>
            <ul>
              <li>Sell a consultation-based service worth approximately €2,000+</li>
              <li>Have at least 1,000 old leads</li>
              <li>Generate at least 50 new enquiries monthly</li>
              <li>Have capacity to handle more appointments</li>
            </ul>
          </div>
          <div className="fit-card">
            <div className="fit-title"><X size={20}/><h3>This is not a fit if you…</h3></div>
            <ul>
              <li>Have almost no existing leads</li>
              <li>Need us to generate advertising traffic</li>
              <li>Sell a very low-value service</li>
              <li>Cannot accommodate additional appointments</li>
              <li>Expect automation to replace sales completely</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section founder-section">
        <div className="page-shell founder-card">
          <div className="pilot-card" aria-label="Three pilot places available">
            <span>EARLY-CLIENT PILOT</span>
            <strong>3</strong>
            <p>places available</p>
            <small>Lower pilot pricing<br/>+ direct implementation support</small>
          </div>
          <div>
            <span className="section-number">WHY THE PILOT EXISTS</span>
            <h2>Get the full system at a lower pilot price.</h2>
            <p>We are building the first case studies for this offer. The first three suitable businesses receive lower pricing and extra hands-on support. In return, we ask for honest feedback and—only if the results are worth sharing—permission to publish an anonymised case study.</p>
            <div className="pilot-terms">
              <span><Check size={17}/> Full implementation</span>
              <span><Check size={17}/> 45 days of optimisation</span>
              <span><Check size={17}/> No invented results or testimonials</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="page-shell faq-grid">
          <div className="section-intro">
            <span className="section-number">06 / QUESTIONS</span>
            <h2>Before you book a consultation.</h2>
          </div>
          <div className="faq-list">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section audit-section" id="consultation">
        <div className="page-shell audit-grid">
          <div className="audit-copy">
            <span className="section-number">FREE CONSULTATION</span>
            <h2>Before you buy more leads, let’s look at the ones you already have.</h2>
            <p>Tell us about your pipeline and choose a preferred time. We’ll discuss your current follow-up, the likely conversion gaps and whether a recovery campaign makes sense.</p>
            <div className="audit-benefits">
              <span><Check size={16}/> We’ll confirm your preferred time</span>
              <span><Check size={16}/> No obligation or generic sales pitch</span>
              <span><Check size={16}/> Honest recommendation—even if we’re not a fit</span>
            </div>
          </div>
          <ConsultationForm />
        </div>
      </section>

      <footer>
        <div className="page-shell footer-grid">
          <div className="wordmark"><Image className="wordmark-logo" src="/leadrevive-logo-light.svg" width={200} height={40} alt="LeadRevive" /></div>
          <p>Lead recovery systems for service businesses that value every enquiry.</p>
        </div>
      </footer>

      <MobileStickyCta />
    </main>
  );
}
