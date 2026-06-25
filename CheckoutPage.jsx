import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    selectedBus,
    selectedSeats,
    passengers,
    setPassengers,
    boardingPoint,
    setLastBooking,
  } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!selectedBus || selectedSeats.length === 0) {
      navigate("/");
    }
  }, [selectedBus, selectedSeats, navigate]);

  if (!selectedBus || selectedSeats.length === 0) return null;

  function updatePassenger(seatId, field, value) {
    setPassengers((prev) => ({
      ...prev,
      [seatId]: { ...prev[seatId], [field]: value },
    }));
  }

  const allDetailsFilled = selectedSeats.every(
    (seatId) => passengers[seatId]?.name && passengers[seatId]?.age
  );

  const totalFare = selectedSeats.length * selectedBus.fare;

  function handlePay(e) {
    e.preventDefault();
    if (!allDetailsFilled) return;
    setProcessing(true);

    // Simulated payment processing — no real transaction occurs.
    setTimeout(() => {
      const bookingId = `YE${Math.floor(100000 + Math.random() * 900000)}`;
      setLastBooking({
        bookingId,
        bus: selectedBus,
        seats: selectedSeats,
        passengers,
        boardingPoint,
        totalFare,
        paymentMethod,
      });
      setProcessing(false);
      navigate("/confirmation");
    }, 1200);
  }

  return (
    <div className="container checkout-page">
      <h2 className="checkout-title">Passenger Details</h2>

      <div className="checkout-layout">
        <form className="passenger-form" onSubmit={handlePay}>
          {selectedSeats.map((seatId) => (
            <div className="passenger-card card" key={seatId}>
              <h4>Seat {seatId}</h4>
              <div className="passenger-fields">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={passengers[seatId]?.name || ""}
                  onChange={(e) =>
                    updatePassenger(seatId, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  min="1"
                  max="110"
                  value={passengers[seatId]?.age || ""}
                  onChange={(e) =>
                    updatePassenger(seatId, "age", e.target.value)
                  }
                  required
                />
                <select
                  value={passengers[seatId]?.gender || ""}
                  onChange={(e) =>
                    updatePassenger(seatId, "gender", e.target.value)
                  }
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}

          <div className="card payment-card">
            <h4>Payment Method</h4>
            <div className="payment-options">
              {["upi", "card", "netbanking"].map((method) => (
                <label key={method} className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  {method === "upi" && "UPI"}
                  {method === "card" && "Credit / Debit Card"}
                  {method === "netbanking" && "Net Banking"}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary checkout-pay-btn"
            disabled={!allDetailsFilled || processing}
          >
            {processing ? "Processing Payment…" : `Pay ₹${totalFare}`}
          </button>
        </form>

        <aside className="checkout-summary card">
          <h4>Trip Summary</h4>
          <p className="summary-route">
            {selectedBus.from} → {selectedBus.to}
          </p>
          <p className="summary-meta">
            {selectedBus.operator} · {selectedBus.departure} –{" "}
            {selectedBus.arrival}
          </p>
          <div className="summary-row">
            <span>Seats</span>
            <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="summary-row">
            <span>Fare per seat</span>
            <span>₹{selectedBus.fare}</span>
          </div>
          <div className="summary-row total">
            <span>Total Payable</span>
            <span>₹{totalFare}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
