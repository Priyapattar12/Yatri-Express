import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import SeatMap from "../components/SeatMap";
import "./SeatSelectionPage.css";

const boardingPoints = [
  { id: "bp1", name: "Central Bus Stand", time: "20:45" },
  { id: "bp2", name: "Highway Toll Plaza", time: "21:10" },
  { id: "bp3", name: "Tech Park Junction", time: "21:30" },
];

export default function SeatSelectionPage() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const {
    selectedBus,
    selectedSeats,
    toggleSeat,
    boardingPoint,
    setBoardingPoint,
  } = useBooking();

  useEffect(() => {
    if (!selectedBus) {
      navigate("/");
    }
  }, [selectedBus, navigate]);

  if (!selectedBus) return null;

  const totalFare = selectedSeats.length * selectedBus.fare;

  function handleProceed() {
    if (selectedSeats.length === 0 || !boardingPoint) return;
    navigate("/checkout");
  }

  return (
    <div className="container seat-page">
      <div className="seat-page-header">
        <h2>
          {selectedBus.operator} · {selectedBus.from} → {selectedBus.to}
        </h2>
        <p>
          {selectedBus.departure} – {selectedBus.arrival} ·{" "}
          {selectedBus.type}
        </p>
      </div>

      <div className="seat-page-layout">
        <SeatMap
          bus={selectedBus}
          selectedSeats={selectedSeats}
          onToggleSeat={toggleSeat}
        />

        <div className="seat-side-panel">
          <div className="card boarding-card">
            <h4>Boarding Point</h4>
            {boardingPoints.map((bp) => (
              <label key={bp.id} className="boarding-option">
                <input
                  type="radio"
                  name="boarding"
                  checked={boardingPoint === bp.id}
                  onChange={() => setBoardingPoint(bp.id)}
                />
                <span>{bp.name}</span>
                <span className="boarding-time">{bp.time}</span>
              </label>
            ))}
          </div>

          <div className="card fare-summary">
            <h4>Fare Summary</h4>
            <div className="fare-row">
              <span>Seats selected</span>
              <span>
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "—"}
              </span>
            </div>
            <div className="fare-row">
              <span>Price per seat</span>
              <span>₹{selectedBus.fare}</span>
            </div>
            <div className="fare-row fare-total">
              <span>Total</span>
              <span>₹{totalFare}</span>
            </div>
            <button
              className="btn-primary seat-proceed-btn"
              disabled={selectedSeats.length === 0 || !boardingPoint}
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
            {selectedSeats.length > 0 && !boardingPoint && (
              <p className="seat-hint">Select a boarding point to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
