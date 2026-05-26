import Seo from "../components/Seo";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you deliver seafood across Trichy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We deliver fresh seafood across the entire Trichy city area, including major residential localities, based on daily delivery slots.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get cleaned fish delivery in Trichy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide hygienic fish cleaning before delivery for eligible seafood items.",
      },
    },
    {
      "@type": "Question",
      name: "How do I order seafood online in Trichy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can browse products, add items to cart, and place your order directly on our website.",
      },
    },
    {
      "@type": "Question",
      name: "What seafood items are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We regularly stock fresh fish, prawns, crab, and other seafood based on daily catch availability.",
      },
    },
  ],
};

export default function TrichySeafoodDelivery() {
  return (
    <div className="pt-28 pb-12 section-shell max-w-5xl">
      <Seo
        title="Seafood Delivery in Trichy"
        description="Looking for seafood delivery anywhere in Trichy? Order fresh fish, prawns, crab and cleaned seafood online from Rameswaram Fresh Seafoods."
        path="/trichy-seafood-delivery"
        keywords="seafood delivery anywhere in trichy, fish delivery entire trichy, order seafood online trichy, cleaned fish trichy, fresh prawns trichy"
        image="/home/hero.jpg"
      />

      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <h1 className="text-3xl md:text-5xl font-extrabold text-rose-700 leading-tight">
        Seafood Delivery in Trichy
      </h1>
      <p className="text-slate-700 mt-4 text-base md:text-lg leading-relaxed">
        Rameswaram Fresh Seafoods provides fresh seafood delivery across entire Trichy with hygienic
        cleaning, careful packing, and reliable doorstep service. If you want to order sea
        food anywhere in Trichy, our team helps you get daily fresh fish, prawns, and crab quickly.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="premium-card p-5">
          <h2 className="font-extrabold text-xl">Fresh Daily Stock</h2>
          <p className="text-slate-600 mt-2">Daily catch sourced and prepared for quality-focused delivery.</p>
        </div>
        <div className="premium-card p-5">
          <h2 className="font-extrabold text-xl">Hygienic Cleaning</h2>
          <p className="text-slate-600 mt-2">Optional cut and cleaning support for a ready-to-cook experience.</p>
        </div>
        <div className="premium-card p-5">
          <h2 className="font-extrabold text-xl">Doorstep in Trichy</h2>
          <p className="text-slate-600 mt-2">Fast local delivery designed for homes and families in Trichy.</p>
        </div>
      </div>

      <div className="premium-card p-6 mt-8">
        <h2 className="text-2xl font-extrabold">Popular Search Intent We Serve</h2>
        <ul className="mt-3 text-slate-700 space-y-2">
          <li>Fresh fish delivery in Trichy</li>
          <li>Order prawns online in Trichy</li>
          <li>Seafood shop near me in Trichy</li>
          <li>Cleaned fish home delivery Trichy</li>
        </ul>
      </div>

      <div className="premium-card p-6 mt-8">
        <h2 className="text-2xl font-extrabold">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-bold">Do you deliver seafood across Trichy?</h3>
            <p className="text-slate-600 mt-1">Yes, we handle seafood delivery across the entire Trichy city area.</p>
          </div>
          <div>
            <h3 className="font-bold">Can I request fish cleaning?</h3>
            <p className="text-slate-600 mt-1">Yes, cleaned fish options are available for eligible products.</p>
          </div>
          <div>
            <h3 className="font-bold">How can I order quickly?</h3>
            <p className="text-slate-600 mt-1">Use our product page, add items, and complete checkout in minutes.</p>
          </div>
        </div>
      </div>

      <a
        href="/products"
        className="inline-block mt-8 animated-gradient-btn text-white px-8 py-3 rounded-xl font-bold"
      >
        Order Seafood Now
      </a>
    </div>
  );
}
