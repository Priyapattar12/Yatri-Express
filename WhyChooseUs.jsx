import "./WhyChooseUs.css";

const features = [
  {
    icon: "🛣️",
    title: "80,000+ Routes Covered",
    text: "From metro cities to small towns, find a bus on nearly every intercity route in India.",
  },
  {
    icon: "✅",
    title: "Verified Operators",
    text: "Every operator on our platform is vetted for safety, punctuality, and service quality.",
  },
  {
    icon: "🛏️",
    title: "AC, Sleeper & Seater Options",
    text: "Pick the comfort level that suits your journey and your budget.",
  },
  {
    icon: "⚡",
    title: "Instant Confirmation",
    text: "Get your ticket and boarding details the moment you complete payment.",
  },
  {
    icon: "💳",
    title: "Multiple Payment Options",
    text: "UPI, cards, net banking, and wallets — pay however is easiest for you.",
  },
  {
    icon: "↩️",
    title: "Easy Cancellations",
    text: "Plans changed? Cancel or reschedule with a transparent refund policy.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Why Travel With Us</h2>
        <p className="section-subtitle">
          A booking experience built around reliability and convenience.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
