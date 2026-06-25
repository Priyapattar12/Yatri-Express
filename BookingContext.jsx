import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState({});
  const [boardingPoint, setBoardingPoint] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);

  function resetSeatSelection() {
    setSelectedSeats([]);
    setPassengers({});
  }

  function toggleSeat(seatId, isBooked) {
    if (isBooked) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : prev.length < 6
        ? [...prev, seatId]
        : prev
    );
  }

  const value = {
    searchParams,
    setSearchParams,
    selectedBus,
    setSelectedBus,
    selectedSeats,
    setSelectedSeats,
    toggleSeat,
    passengers,
    setPassengers,
    boardingPoint,
    setBoardingPoint,
    resetSeatSelection,
    lastBooking,
    setLastBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}
