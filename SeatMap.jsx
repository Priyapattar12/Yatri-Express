import "./SeatMap.css";

// Generates a deterministic lower-deck sleeper/seater layout: rows of 2+1
function buildSeatLayout(bookedCount, totalSeats) {
  const seats = [];
  const rows = Math.ceil(totalSeats / 3);
  let seatNum = 1;

  for (let r = 0; r < rows; r++) {
    const rowSeats = [];
    for (let c = 0; c < 3 && seatNum <= totalSeats; c++) {
      rowSeats.push({
        id: `S${seatNum}`,
        label: `${seatNum}`,
        isAisleGap: c === 1,
      });
      seatNum++;
    }
    seats.push(rowSeats);
  }

  // mark booked seats deterministically based on bookedCount
  const flatIds = seats.flat().map((s) => s.id);
  const bookedSet = new Set(flatIds.slice(0, bookedCount));

  return seats.map((row) =>
    row.map((seat) => ({ ...seat, booked: bookedSet.has(seat.id) }))
  );
}

export default function SeatMap({ bus, selectedSeats, onToggleSeat }) {
  const layout = buildSeatLayout(bus.bookedCount, bus.totalSeats);

  return (
    <div className="seat-map card">
      <div className="seat-map-header">
        <span className="wheel-icon">🚘</span>
        <span>Driver</span>
      </div>

      <div className="seat-rows">
        {layout.map((row, idx) => (
          <div className="seat-row" key={idx}>
            {row.map((seat) =>
              seat.isAisleGap ? (
                <span key={seat.id + "-gap"} className="seat-gap" />
              ) : null
            )}
            {row.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);
              return (
                <button
                  key={seat.id}
                  className={`seat ${seat.booked ? "booked" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  disabled={seat.booked}
                  onClick={() => onToggleSeat(seat.id, seat.booked)}
                  title={seat.booked ? "Already booked" : `Seat ${seat.label}`}
                >
                  {seat.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="seat-legend">
        <span>
          <i className="legend-box available" /> Available
        </span>
        <span>
          <i className="legend-box selected" /> Selected
        </span>
        <span>
          <i className="legend-box booked" /> Booked
        </span>
      </div>
    </div>
  );
}
