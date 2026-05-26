import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-gradient-to-r from-rose-700 to-orange-600 text-white py-8">
      <div className="section-shell">
        <div className="text-center">
          <p className="font-bold text-3xl md:text-4xl">Rameswaram Fresh Seafoods (R) {new Date().getFullYear()}</p>
          <p className="text-xl md:text-2xl opacity-95 mt-2">Fresh Seafoods Delivered Daily</p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 text-sm md:text-base">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-extrabold text-lg mb-2">Shop Location (Trichy)</h3>
            <p>
              Address: Plot No.24, Sf. No.44/2, opp. to Sanjeevi Nagar, Bharathy Nagar, Sanjeevi Nagar, Pallivasal,
              Tamil Nadu 620002
            </p>
            <p className="mt-2">Open 24 hours</p>
            <p className="mt-1">Phone: <a href="tel:+919655244550" className="underline font-semibold">096552 44550</a></p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-extrabold text-lg mb-2">About Us & Trust</h3>
            <p>
              We are now in Trichy, delivering fresh seafood with hygienic cleaning and reliable doorstep service.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="https://www.google.com/search?q=rameshwaram+sea+food&oq=rame&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIKCAEQLhixAxiABDIGCAIQRRg5MgwIAxAjGCcYgAQYigUyCggEEAAYsQMYgAQyCggFEAAYsQMYgAQyCggGEAAYsQMYgAQyEAgHEAAYgwEYsQMYgAQYigUyBwgIEAAYgAQyCggJEAAYsQMYgATSAQkxNjQzajBqMTWoAgiwAgHxBUZGWKgBKa7s8QVGRlioASmu7A&sourceid=chrome&ie=UTF-8&lqi=ChRyYW1lc2h3YXJhbSBzZWEgZm9vZEiBmJrXv62AgAhaIBABEAIYABgBGAIiFHJhbWVzaHdhcmFtIHNlYSBmb29kkgEOc2VhZm9vZF9tYXJrZXQ#rlimm=11309492791521078794"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg bg-white text-rose-700 font-bold text-sm"
              >
                View Shop on Google
              </a>
              <a
                href="https://www.google.com/search?q=rameshwaram+sea+food&oq=rame&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIKCAEQLhixAxiABDIGCAIQRRg5MgwIAxAjGCcYgAQYigUyCggEEAAYsQMYgAQyCggFEAAYsQMYgAQyCggGEAAYsQMYgAQyEAgHEAAYgwEYsQMYgAQYigUyBwgIEAAYgAQyCggJEAAYsQMYgATSAQkxNjQzajBqMTWoAgiwAgHxBUZGWKgBKa7s8QVGRlioASmu7A&sourceid=chrome&ie=UTF-8&lqi=ChRyYW1lc2h3YXJhbSBzZWEgZm9vZEiBmJrXv62AgAhaIBABEAIYABgBGAIiFHJhbWVzaHdhcmFtIHNlYSBmb29kkgEOc2VhZm9vZF9tYXJrZXQ#rlimm=11309492791521078794"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg border border-white text-white font-bold text-sm"
              >
                See Google Reviews
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <a href="/trichy-seafood-delivery" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold">Seafood Delivery in Trichy</a>
          <a href="/delivery-areas" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold">Delivery Areas</a>
          <a href="/cleaning-policy" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold">Cleaning Policy</a>
          <a href="/payment-refund" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold">Payment & Refund</a>
          <a href="/contact" className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold">Contact</a>
        </div>
      </div>
    </footer>
  );
}
