import Seo from "../components/Seo";

const areas = [
  "Srirangam",
  "Thillai Nagar",
  "KK Nagar",
  "Woraiyur",
  "Cantonment",
  "Puthur",
  "Kattur",
  "Ariyamangalam",
];

export default function DeliveryAreas() {
  return (
    <div className="pt-28 pb-12 section-shell max-w-5xl">
      <Seo
        title="Seafood Delivery Areas in Trichy"
        description="Check seafood home delivery areas in Trichy covered by Rameswaram Fresh Seafoods."
        path="/delivery-areas"
        keywords="trichy seafood delivery areas, fish delivery areas trichy, seafood near me trichy"
      />
      <h1 className="text-3xl md:text-5xl font-extrabold text-rose-700">Delivery Areas in Trichy</h1>
      <p className="mt-4 text-slate-700">
        We deliver fresh seafood across key Trichy localities with same-day service based on slot availability.
      </p>
      <div className="premium-card mt-6 p-6">
        <h2 className="text-2xl font-extrabold">Covered Locations</h2>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-slate-700">
          {areas.map((area) => (
            <li key={area}>- {area}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
