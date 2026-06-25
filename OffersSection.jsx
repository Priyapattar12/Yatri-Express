import "./OffersSection.css";

const offers = [
  {
    code: "FIRST200",
    title: "First Booking Discount",
    text: "Save ₹200 on your first ticket booked through the app.",
  },
  {
    code: "STUDENT10",
    title: "Student Fares",
    text: "10% off for verified students on select routes.",
  },
  {
    code: "WEEKEND15",
    title: "Weekend Getaway",
    text: "15% off on Friday and Saturday departures, all season.",
  },
];

export default function OffersSection() {
  return (
    <section className="section" id="offers">
      <div className="container">
        <h2 className="section-title">Offers &amp; Discounts</h2>
        <p className="section-subtitle">
          Active coupon codes you can apply at checkout.
        </p>
        <div className="offers-grid">
          {offers.map((o) => (
            <div className="offer-card card" key={o.code}>
              <span className="badge badge-orange">{o.code}</span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
