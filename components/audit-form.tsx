"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export function AuditForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="audit-form success-card">
        <div className="success-icon"><Check size={28}/></div>
        <span className="form-kicker">Request received</span>
        <h3>Your audit is in the queue.</h3>
        <p>We’ll review your answers and contact you within two business days. Requesting the audit does not commit you to the service.</p>
        <small>Preview form: connect your preferred form endpoint before launch.</small>
      </div>
    );
  }

  return (
    <form className="audit-form" onSubmit={submit}>
      <div className="form-head">
        <div><span className="form-kicker">Lead Leakage Audit</span><h3>{step === 1 ? "Tell us about your pipeline" : "Where should we send it?"}</h3></div>
        <span className="step-label">Step {step} of 2</span>
      </div>
      <div className="form-progress"><span style={{ width: step === 1 ? "50%" : "100%" }}/></div>

      {step === 1 ? (
        <div className="form-fields">
          <label>How many old leads are in your database?
            <select required defaultValue=""><option value="" disabled>Select a range</option><option>Fewer than 500</option><option>500–999</option><option>1,000–2,499</option><option>2,500–4,999</option><option>5,000+</option></select>
          </label>
          <label>How many new leads do you generate monthly?
            <select required defaultValue=""><option value="" disabled>Select a range</option><option>Fewer than 25</option><option>25–49</option><option>50–99</option><option>100–249</option><option>250+</option></select>
          </label>
          <label>What is one new customer approximately worth?
            <select required defaultValue=""><option value="" disabled>Select a range</option><option>Under €500</option><option>€500–€1,999</option><option>€2,000–€4,999</option><option>€5,000–€9,999</option><option>€10,000+</option></select>
          </label>
          <button className="button button-dark form-button" type="button" onClick={() => {
            const form = document.querySelector(".audit-form") as HTMLFormElement;
            if (form.reportValidity()) setStep(2);
          }}>Continue to my audit <ArrowRight size={18}/></button>
        </div>
      ) : (
        <div className="form-fields">
          <div className="two-fields"><label>First name<input name="firstName" required placeholder="Gleb"/></label><label>Business name<input name="business" required placeholder="Your business"/></label></div>
          <label>Website<input name="website" type="url" required placeholder="https://yourbusiness.com"/></label>
          <label>Work email<input name="email" type="email" required placeholder="you@yourbusiness.com"/></label>
          <label>Telephone number<input name="phone" type="tel" required placeholder="+31 6 1234 5678"/></label>
          <div className="form-actions"><button className="back-button" type="button" onClick={() => setStep(1)}><ArrowLeft size={17}/> Back</button><button className="button button-dark form-button" type="submit">Request my free audit <ArrowRight size={18}/></button></div>
          <p className="privacy-copy">We’ll use this information only to evaluate your lead-recovery opportunity and contact you about the requested audit.</p>
        </div>
      )}
    </form>
  );
}
