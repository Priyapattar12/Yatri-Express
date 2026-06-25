import { useState } from "react";
import "./FAQAccordion.css";

const faqs = [
  {
    q: "How do I book a bus ticket?",
    a: "Enter your origin, destination, and travel date, pick a bus from the results, choose your seats, and complete payment. You'll get instant confirmation.",
  },
  {
    q: "Can I cancel or reschedule my ticket?",
    a: "Yes. Go to My Bookings, select your ticket, and choose to cancel or reschedule. Refund amounts depend on how close to departure you cancel.",
  },
  {
    q: "Are student discounts available?",
    a: "Yes, verified students get a discount on select routes — look for the STUDENT10 coupon at checkout.",
  },
  {
    q: "Are there hidden charges?",
    a: "No. The fare shown at search time is the fare you pay, including all taxes and convenience fees.",
  },
  {
    q: "How do I choose my boarding point?",
    a: "After selecting your seats, you'll be shown a list of boarding points for that route. Pick the one closest to you.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section" id="faq" style={{ background: "var(--white)" }}>
      <div className="container faq-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Everything you need to know before you book.
        </p>
        <div className="faq-list">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className="faq-item card" key={item.q}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className={`faq-chevron ${isOpen ? "open" : ""}`}>
                    ⌄
                  </span>
                </button>
                {isOpen && <p className="faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
