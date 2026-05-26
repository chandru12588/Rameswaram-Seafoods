import Seo from "../components/Seo";

export default function AreaSrirangam() {
  return (
    <div className="pt-28 pb-12 section-shell max-w-5xl">
      <Seo
        title="Seafood Delivery in Srirangam"
        description="Order fresh seafood delivery in Srirangam, Trichy from Rameswaram Fresh Seafoods."
        path="/seafood-delivery-srirangam"
        keywords="seafood delivery srirangam, fish shop srirangam, fish delivery srirangam trichy"
      />
      <h1 className="text-3xl md:text-5xl font-extrabold text-rose-700">Seafood Delivery in Srirangam</h1>
      <p className="mt-4 text-slate-700">Fresh fish, prawns and crab delivered to Srirangam homes with hygienic handling.</p>
      <a href="/products" className="inline-block mt-6 animated-gradient-btn text-white px-7 py-3 rounded-xl font-bold">Order Now</a>
    </div>
  );
}
