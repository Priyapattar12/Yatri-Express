import { useNavigate } from "react-router-dom";
import { popularRoutes } from "../data/cities";
import { useBooking } from "../context/BookingContext";
import "./PopularRoutes.css";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function PopularRoutes() {
  const navigate = useNavigate();
  const { setSearchParams } = useBooking();

  function handleSelect(from, to) {
    const date = todayISO();
    setSearchParams({ from, to, date });
    navigate(`/search?from=${from}&to=${to}&date=${date}`);
  }

  return (
    <section className="section" style={{ background: "var(--white)" }}>
      <div className="container">
        <h2 className="section-title">Popular Routes</h2>
        <p className="section-subtitle">
          Quick links to the journeys travelers book most.
        </p>
        <div className="routes-grid">
          {popularRoutes.map((r) => (
            <button
              key={`${r.from}-${r.to}`}
              className="route-card card"
              onClick={() => handleSelect(r.from, r.to)}
            >
              <span className="route-city">{r.from}</span>
              <span className="route-arrow">→</span>
              <span className="route-city">{r.to}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
