export default function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-rose-200 bg-white/95 backdrop-blur px-2 py-2">
      <div className="grid grid-cols-3 gap-2">
        <a
          href="tel:+919655244550"
          className="text-center py-2 rounded-lg bg-slate-100 text-slate-800 font-semibold text-sm"
        >
          Call
        </a>
        <a
          href="https://wa.me/919655244550?text=Hi%20I%20want%20to%20order%20fresh%20seafoods!"
          target="_blank"
          rel="noreferrer"
          className="text-center py-2 rounded-lg bg-green-500 text-white font-semibold text-sm"
        >
          WhatsApp
        </a>
        <a
          href="/products"
          className="text-center py-2 rounded-lg animated-gradient-btn text-white font-semibold text-sm"
        >
          Order Now
        </a>
      </div>
    </div>
  );
}
