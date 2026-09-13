"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const initialForm = {
  oldLeads: "",
  monthlyLeads: "",
  customerValue: "",
  firstName: "",
  business: "",
  website: "",
  email: "",
  phone: "",
  preferredTime: "",
  companyWebsite: "",
};

export function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function update(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="audit-form success-card">
        <div className="success-icon"><Check size={28}/></div>
        <span className="form-kicker">Request received</span>
        <h3>Your consultation request is in.</h3>
        <p>We’ll review your answers and contact you to confirm the consultation time. There is no obligation to work with us.</p>
      </div>
    );
  }

  return (
    <form className="audit-form" onSubmit={submit}>
      <input className="form-trap" name="companyWebsite" value={formData.companyWebsite} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-head">
        <div><span className="form-kicker">Free consultation</span><h3>{step === 1 ? "Tell us about your pipeline" : "Request a consultation time"}</h3></div>
        <span className="step-label">Step {step} of 2</span>
      </div>
      <div className="form-progress"><span style={{ width: step === 1 ? "50%" : "100%" }}/></div>

      {step === 1 ? (
        <div className="form-fields">
          <label>How many old leads are in your database?
            <select name="oldLeads" required value={formData.oldLeads} onChange={update}><option value="" disabled>Select a range</option><option>Fewer than 500</option><option>500–999</option><option>1,000–2,499</option><option>2,500–4,999</option><option>5,000+</option></select>
          </label>
          <label>How many new leads do you generate monthly?
            <select name="monthlyLeads" required value={formData.monthlyLeads} onChange={update}><option value="" disabled>Select a range</option><option>Fewer than 25</option><option>25–49</option><option>50–99</option><option>100–249</option><option>250+</option></select>
          </label>
          <label>What is one new customer approximately worth?
            <select name="customerValue" required value={formData.customerValue} onChange={update}><option value="" disabled>Select a range</option><option>Under €500</option><option>€500–€1,999</option><option>€2,000–€4,999</option><option>€5,000–€9,999</option><option>€10,000+</option></select>
          </label>
          <button className="button button-dark form-button" type="button" onClick={() => {
            const form = document.querySelector(".audit-form") as HTMLFormElement;
            if (form.reportValidity()) setStep(2);
          }}>Continue to booking <ArrowRight size={18}/></button>
        </div>
      ) : (
        <div className="form-fields">
          <div className="two-fields"><label>First name<input name="firstName" required value={formData.firstName} onChange={update} placeholder="Your first name"/></label><label>Business name<input name="business" required value={formData.business} onChange={update} placeholder="Your business"/></label></div>
          <label>Website<input name="website" type="url" required value={formData.website} onChange={update} placeholder="https://yourbusiness.com"/></label>
          <label>Work email<input name="email" type="email" required value={formData.email} onChange={update} placeholder="you@yourbusiness.com"/></label>
          <label>Telephone number<input name="phone" type="tel" required value={formData.phone} onChange={update} placeholder="+31 6 1234 5678"/></label>
          <label>Preferred consultation time<input name="preferredTime" type="datetime-local" required value={formData.preferredTime} onChange={update}/><small className="field-note">We’ll contact you to confirm the time.</small></label>
          {status === "error" && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
          <div className="form-actions"><button className="back-button" type="button" onClick={() => setStep(1)}><ArrowLeft size={17}/> Back</button><button className="button button-dark form-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request my consultation"} <ArrowRight size={18}/></button></div>
          <p className="privacy-copy">We’ll use this information only to evaluate your fit and contact you about the requested consultation.</p>
        </div>
      )}
    </form>
  );
}
