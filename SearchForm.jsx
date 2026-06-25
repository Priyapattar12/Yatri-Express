import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../data/cities";
import { useBooking } from "../context/BookingContext";
import "./SearchForm.css";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function SearchForm() {
  const navigate = useNavigate();
  const { setSearchParams } = useBooking();

  const [from, setFrom] = useState("Bengaluru");
  const [to, setTo] = useState("Chennai");
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState("");

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (from === to) {
      setError("Origin and destination cannot be the same.");
      return;
    }
    setError("");
    setSearchParams({ from, to, date });
    navigate(
      `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&date=${date}`
    );
  }

  return (
    <div className="search-form-wrapper">
      <form className="search-form card" onSubmit={handleSearch}>
        <div className="search-field">
          <label>From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="swap-btn"
          onClick={handleSwap}
          aria-label="Swap cities"
        >
          ⇄
        </button>

        <div className="search-field">
          <label>To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="search-field">
          <label>Date of Journey</label>
          <input
            type="date"
            value={date}
            min={todayISO()}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary search-submit">
          Search Buses
        </button>
      </form>
      {error && <p className="search-error">{error}</p>}
    </div>
  );
}
