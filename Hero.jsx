import SearchForm from "./SearchForm";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>
            Book Bus Tickets <span className="hero-accent">Smarter</span>
          </h1>
          <p>
            Compare 1000+ trusted operators, pick your seat, and travel
            across India at the best fares — all in a few taps.
          </p>
        </div>
        <SearchForm />
      </div>
    </section>
  );
}
