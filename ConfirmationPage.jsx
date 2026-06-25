import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./ConfirmationPage.css";

export default function ConfirmationPage() {
  const { lastBooking } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastBooking) navigate("/");
  }, [lastBooking, navigate]);

  if (!lastBooking) return null;

  const { bookingId, bus, seats, passengers, totalFare } = lastBooking;

  return (
    <div className="container confirmation-page">
      <div className="confirmation-card card">
        <div className="confirmation-check">✓</div>
        <h2>Booking Confirmed!</h2>
        <p className="confirmation-id">Booking ID: {bookingId}</p>

        <div className="ticket-details">
          <div className="ticket-row">
            <span>Route</span>
            <span>
              {bus.from} → {bus.to}
            </span>
          </div>
          <div className="ticket-row">
            <span>Operator</span>
            <span>{bus.operator}</span>
          </div>
          <div className="ticket-row">
            <span>Departure</span>
            <span>{bus.departure}</span>
          </div>
          <div className="ticket-row">
            <span>Seats</span>
            <span>{seats.join(", ")}</span>
          </div>
          <div className="ticket-row">
            <span>Passengers</span>
            <span>
              {seats
                .map((s) => passengers[s]?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
          <div className="ticket-row total">
            <span>Total Paid</span>
            <span>₹{totalFare}</span>
          </div>
        </div>

        <p className="confirmation-note">
          A confirmation has been sent to your registered email and phone
          number. Please arrive at the boarding point 15 minutes early.
        </p>

        <Link to="/" className="btn-primary confirmation-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
