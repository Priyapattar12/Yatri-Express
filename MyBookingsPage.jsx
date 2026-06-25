import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./MyBookingsPage.css";

export default function MyBookingsPage() {
  const { lastBooking } = useBooking();

  return (
    <div className="container my-bookings-page">
      <h2>My Bookings</h2>

      {!lastBooking ? (
        <div className="card empty-bookings">
          <p>You don't have any bookings yet in this session.</p>
          <Link to="/" className="btn-primary">
            Search Buses
          </Link>
        </div>
      ) : (
        <div className="card booking-row">
          <div>
            <h4>
              {lastBooking.bus.from} → {lastBooking.bus.to}
            </h4>
            <p>
              {lastBooking.bus.operator} · Seats:{" "}
              {lastBooking.seats.join(", ")}
            </p>
          </div>
          <span className="badge badge-green">Confirmed</span>
        </div>
      )}
    </div>
  );
}
