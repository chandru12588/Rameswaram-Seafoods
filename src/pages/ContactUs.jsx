import Seo from "../components/Seo";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Rameswaram Fresh Seafoods",
  url: "https://rameswaram-seafoods.vercel.app/contact",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Rameswaram Fresh Seafoods",
    telephone: "+91-9655244550",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No.24, SF No.44/2, Opp Sanjeevi Nagar, Pallivasal",
      addressLocality: "Trichy",
      addressRegion: "Tamil Nadu",
      postalCode: "620002",
      addressCountry: "IN",
    },
  },
};

export default function ContactUs() {
  return (
    <div className="pt-28 pb-12 section-shell max-w-5xl">
      <Seo
        title="Contact Seafood Shop in Trichy"
        description="Contact Rameswaram Fresh Seafoods for seafood orders, support, and delivery help in Trichy."
        path="/contact"
        keywords="contact seafood shop trichy, fish order contact trichy, rameswaram fresh seafoods phone number"
      />
      <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      <h1 className="text-3xl md:text-5xl font-extrabold text-rose-700">Contact Us</h1>
      <div className="premium-card mt-6 p-6 text-slate-700 space-y-3">
        <p><strong>Phone:</strong> <a href="tel:+919655244550" className="text-rose-700">+91 96552 44550</a></p>
        <p><strong>WhatsApp:</strong> <a className="text-rose-700" href="https://wa.me/919655244550" target="_blank" rel="noreferrer">Chat now</a></p>
        <p><strong>Address:</strong> Plot No.24, SF No.44/2, Opp Sanjeevi Nagar, Pallivasal, Trichy, Tamil Nadu 620002</p>
        <p><strong>Service Hours:</strong> Open 24 hours</p>
      </div>
    </div>
  );
}
