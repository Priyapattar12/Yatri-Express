import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { generateBuses } from "../data/buses";
import BusCard from "../components/BusCard";
import "./SearchResultsPage.css";

const busTypeFilters = ["AC", "Non-AC", "Sleeper", "Seater", "Volvo"];
const timeSlots = [
  { label: "Before 6 AM", test: (h) => h < 6 },
  { label: "6 AM – 12 PM", test: (h) => h >= 6 && h < 12 },
  { label: "12 PM – 6 PM", test: (h) => h >= 12 && h < 18 },
  { label: "After 6 PM", test: (h) => h >= 18 },
];

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const from = params.get("from") || "Bengaluru";
  const to = params.get("to") || "Chennai";
  const date = params.get("date") || "";

  const [allBuses, setAllBuses] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [slotFilter, setSlotFilter] = useState([]);
  const [sortBy, setSortBy] = useState("departure");

  useEffect(() => {
    setAllBuses(generateBuses(from, to, date));
  }, [from, to, date]);

  function toggleFilter(list, setList, value) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  const filteredBuses = useMemo(() => {
    let result = [...allBuses];

    if (typeFilter.length) {
      result = result.filter((b) =>
        typeFilter.some((t) => b.type.toLowerCase().includes(t.toLowerCase()))
      );
    }

    if (slotFilter.length) {
      result = result.filter((b) => {
        const hour = parseInt(b.departure.split(":")[0], 10);
        return slotFilter.some((label) =>
          timeSlots.find((s) => s.label === label)?.test(hour)
        );
      });
    }

    if (sortBy === "price") {
      result.sort((a, b) => a.fare - b.fare);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => a.departure.localeCompare(b.departure));
    }

    return result;
  }, [allBuses, typeFilter, slotFilter, sortBy]);

  return (
    <div className="container results-page">
      <div className="results-header">
        <h2>
          {from} → {to}
        </h2>
        <p>
          {date && new Date(date).toDateString()} · {filteredBuses.length}{" "}
          buses found
        </p>
      </div>

      <div className="results-layout">
        <aside className="filters-sidebar card">
          <h4>Bus Type</h4>
          <div className="filter-group">
            {busTypeFilters.map((t) => (
              <label key={t} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={typeFilter.includes(t)}
                  onChange={() => toggleFilter(typeFilter, setTypeFilter, t)}
                />
                {t}
              </label>
            ))}
          </div>

          <h4>Departure Time</h4>
          <div className="filter-group">
            {timeSlots.map((s) => (
              <label key={s.label} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={slotFilter.includes(s.label)}
                  onChange={() =>
                    toggleFilter(slotFilter, setSlotFilter, s.label)
                  }
                />
                {s.label}
              </label>
            ))}
          </div>
        </aside>

        <div className="results-list">
          <div className="sort-bar">
            <span>Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="departure">Departure Time</option>
              <option value="price">Price (Low to High)</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {filteredBuses.length === 0 ? (
            <p className="no-results">
              No buses match your filters. Try adjusting them.
            </p>
          ) : (
            filteredBuses.map((bus) => <BusCard key={bus.id} bus={bus} />)
          )}
        </div>
      </div>
    </div>
  );
}
