const operators = [
  "Sharma Travels",
  "Konark Voyages",
  "Greenline Express",
  "Royal Comfort",
  "Highway Star",
  "Sundar Travels",
  "Orange Tours",
  "Western Express",
];

const busTypes = [
  "AC Sleeper (2+1)",
  "Non-AC Seater (2+2)",
  "AC Seater/Sleeper",
  "Volvo Multi-Axle AC",
  "Non-AC Sleeper",
];

const amenitiesPool = [
  "Charging Point",
  "Water Bottle",
  "Blanket",
  "Reading Light",
  "CCTV",
  "Live Tracking",
];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function pick(arr, rand) {
  return arr[Math.floor(rand() * arr.length)];
}

function pickMany(arr, rand, count) {
  const copy = [...arr];
  const result = [];
  for (let i = 0; i < count && copy.length; i++) {
    const idx = Math.floor(rand() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

export function generateBuses(from, to, date) {
  const seedBase = `${from}-${to}-${date}`
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rand = seededRandom(seedBase || 42);

  const count = 6 + Math.floor(rand() * 5);
  const buses = [];

  for (let i = 0; i < count; i++) {
    const depHour = 18 + Math.floor(rand() * 8); // evening departures, common for intercity
    const depMin = pick([0, 15, 30, 45], rand);
    const durationHrs = 6 + Math.floor(rand() * 7);
    const arrHour = (depHour + durationHrs) % 24;

    const fare = 450 + Math.floor(rand() * 1200);
    const totalSeats = 32;
    const bookedCount = Math.floor(rand() * 22);

    buses.push({
      id: `bus-${i}-${seedBase}`,
      operator: pick(operators, rand),
      type: pick(busTypes, rand),
      departure: `${String(depHour).padStart(2, "0")}:${String(
        depMin
      ).padStart(2, "0")}`,
      arrival: `${String(arrHour).padStart(2, "0")}:${String(depMin).padStart(
        2,
        "0"
      )}`,
      duration: `${durationHrs}h ${pick([0, 15, 30, 45], rand)}m`,
      fare,
      rating: (3.4 + rand() * 1.5).toFixed(1),
      seatsLeft: totalSeats - bookedCount,
      totalSeats,
      bookedCount,
      amenities: pickMany(amenitiesPool, rand, 3),
      from,
      to,
      date,
    });
  }

  return buses.sort((a, b) => a.departure.localeCompare(b.departure));
}
