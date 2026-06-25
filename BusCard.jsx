import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./BusCard.css";

export default function BusCard({ bus }) {
  const navigate = useNavigate();
  const { setSelectedBus, resetSeatSelection } = useBooking();

  function handleSelect() {
    setSelectedBus(bus);
    resetSeatSelection();
    navigate(`/seats/${bus.id}`);
  }

  return (
    <div className="bus-card card">
      <div className="bus-card-main">
        <div className="bus-operator-block">
          <h3>{bus.operator}</h3>
          <p className="bus-type">{bus.type}</p>
          <div className="bus-amenities">
            {bus.amenities.map((a) => (
              <span key={a} className="amenity-pill">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="bus-time-block">
          <div className="time-col">
            <span className="time">{bus.departure}</span>
            <span className="time-label">Departure</span>
          </div>
          <div className="duration-col">
            <span className="duration-line" />
            <span className="duration-text">{bus.duration}</span>
          </div>
          <div className="time-col">
            <span className="time">{bus.arrival}</span>
            <span className="time-label">Arrival</span>
          </div>
        </div>

        <div className="bus-rating-block">
          <span className="badge badge-green">★ {bus.rating}</span>
          <span className="seats-left">{bus.seatsLeft} seats left</span>
        </div>

        <div className="bus-fare-block">
          <span className="fare">₹{bus.fare}</span>
          <button className="btn-primary" onClick={handleSelect}>
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
}
