# YatraExpress — Bus Ticket Booking App (React.js)

A bus ticket booking web application built with React, Vite, React Router,
and Context API. Inspired by the standard online bus-booking flow used by
platforms like YesGoBus / redBus / AbhiBus — original UI, copy, and code.

## Tech Stack
- React 19 + Vite
- React Router DOM (client-side routing)
- Context API (booking state across the multi-step flow)
- Plain CSS (component-scoped files, navy/orange theme)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

## Folder Structure

```
src/
  components/   Reusable UI pieces (Navbar, SearchForm, BusCard, SeatMap, etc.)
  pages/        Route-level pages (Home, Search Results, Seat Selection, Checkout, Confirmation)
  context/      BookingContext — shared state for the booking flow
  data/         Mock data (cities, generated bus listings)
```

## User Flow
1. **Home** — search form (From / To / Date) + informational sections
   (why choose us, popular routes, offers, FAQ)
2. **Search Results** (`/search`) — list of buses with filters (type,
   departure slot) and sorting (price, rating, departure time)
3. **Seat Selection** (`/seats/:busId`) — interactive seat map, boarding
   point choice, live fare summary
4. **Checkout** (`/checkout`) — passenger detail form per seat, mock
   payment method selection
5. **Confirmation** (`/confirmation`) — booking summary with a generated
   booking ID

Bus and seat data is generated client-side from a seeded mock data
generator (`src/data/buses.js`) — no backend is wired up. Swap that file
for a real API call when you're ready to connect a backend.

## Notes for Interview Prep
- State management: Context API holds `selectedBus`, `selectedSeats`,
  `passengers`, `boardingPoint`, and `lastBooking` across the whole flow,
  so any page can read/update it without prop drilling.
- Forms: controlled inputs throughout (search form, passenger form,
  newsletter signup).
- Derived state: `useMemo` is used in the results page to recompute
  filtered/sorted buses only when filters or data change.
- Routing: dynamic route param (`/seats/:busId`) and query params
  (`/search?from=...&to=...&date=...`) are both used, which is a common
  thing interviewers probe on.
