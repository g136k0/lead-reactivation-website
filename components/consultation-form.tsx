"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Globe2 } from "lucide-react";

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
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

  useEffect(() => {
    const dates: string[] = [];
    const cursor = new Date();
    cursor.setDate(cursor.getDate() + 1);

    while (dates.length < 14) {
      const day = cursor.getDay();
      if (day !== 0 && day !== 6) {
        const year = cursor.getFullYear();
        const month = String(cursor.getMonth() + 1).padStart(2, "0");
        const date = String(cursor.getDate()).padStart(2, "0");
        dates.push(`${year}-${month}-${date}`);
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    setAvailableDates(dates);
  }, []);

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
          timezone,
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
        <p>Your selected time has been sent to us. We’ll contact you shortly with the final confirmation and meeting details.</p>
      </div>
    );
  }

  return (
    <form className="audit-form" onSubmit={submit}>
      <input className="form-trap" name="companyWebsite" value={formData.companyWebsite} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-head">
        <div><span className="form-kicker">Free consultation</span><h3>{step === 1 ? "Tell us about your pipeline" : step === 2 ? "Choose a time" : "Your details"}</h3></div>
        <span className="step-label">Step {step} of 3</span>
      </div>
      <div className="form-progress"><span style={{ width: `${step * 33.333}%` }}/></div>

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
      ) : step === 2 ? (
        <div className="booking-picker">
          <div className="booking-meta">
            <span><Clock3 size={17}/> 30-minute consultation</span>
            <span><Globe2 size={17}/> {timezone.replaceAll("_", " ")}</span>
          </div>

          <div className="date-picker">
            <div className="picker-heading"><CalendarDays size={19}/><strong>Select a date</strong></div>
            <div className="date-grid">
              {availableDates.map((date) => {
                const value = new Date(`${date}T12:00:00`);
                return (
                  <button className={selectedDate === date ? "date-option selected" : "date-option"} type="button" key={date} onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime("");
                    setFormData((current) => ({ ...current, preferredTime: "" }));
                  }}>
                    <span>{value.toLocaleDateString(undefined, { weekday: "short" })}</span>
                    <strong>{value.getDate()}</strong>
                    <small>{value.toLocaleDateString(undefined, { month: "short" })}</small>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={selectedDate ? "time-picker visible" : "time-picker"}>
            <div className="picker-heading"><Clock3 size={19}/><strong>{selectedDate ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : "Select a date first"}</strong></div>
            {selectedDate && <div className="time-grid">{timeSlots.map((time) => (
              <button className={selectedTime === time ? "time-option selected" : "time-option"} type="button" key={time} onClick={() => {
                setSelectedTime(time);
                setFormData((current) => ({ ...current, preferredTime: `${selectedDate}T${time}` }));
              }}>{time}</button>
            ))}</div>}
          </div>

          {selectedDate && selectedTime && <div className="selected-slot"><Check size={18}/><span><small>Selected consultation</small><strong>{new Date(`${selectedDate}T${selectedTime}:00`).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</strong></span></div>}

          <div className="form-actions"><button className="back-button" type="button" onClick={() => setStep(1)}><ArrowLeft size={17}/> Back</button><button className="button button-dark form-button" type="button" disabled={!formData.preferredTime} onClick={() => setStep(3)}>Continue <ArrowRight size={18}/></button></div>
          <p className="privacy-copy">Times are shown in your local timezone. We’ll send the final confirmation and meeting details separately.</p>
        </div>
      ) : (
        <div className="form-fields">
          <div className="two-fields"><label>First name<input name="firstName" required value={formData.firstName} onChange={update} placeholder="Your first name"/></label><label>Business name<input name="business" required value={formData.business} onChange={update} placeholder="Your business"/></label></div>
          <label>Website<input name="website" type="url" required value={formData.website} onChange={update} placeholder="https://yourbusiness.com"/></label>
          <label>Work email<input name="email" type="email" required value={formData.email} onChange={update} placeholder="you@yourbusiness.com"/></label>
          <label>Telephone number<input name="phone" type="tel" required value={formData.phone} onChange={update} placeholder="+31 6 1234 5678"/></label>
          {status === "error" && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
          <div className="selected-slot compact"><CalendarDays size={18}/><span><small>Your selected time</small><strong>{new Date(`${selectedDate}T${selectedTime}:00`).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</strong></span><button type="button" onClick={() => setStep(2)}>Change</button></div>
          <div className="form-actions"><button className="back-button" type="button" onClick={() => setStep(2)}><ArrowLeft size={17}/> Back</button><button className="button button-dark form-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Book my consultation"} <ArrowRight size={18}/></button></div>
          <p className="privacy-copy">We’ll use this information only to evaluate your fit and contact you about the requested consultation.</p>
        </div>
      )}
    </form>
  );
}
