import React from "react";

const highlights = [
  {
    title: "Fresh Catch Everyday",
    desc: "Delivered within hours of arrival.",
    icon: "FC",
  },
  {
    title: "Clean and Hygienic",
    desc: "Professionally cleaned and packed.",
    icon: "CH",
  },
  {
    title: "Fast Delivery",
    desc: "Same-day doorstep service.",
    icon: "FD",
  },
];

const gallery = ["/logo.png", "/logo.png", "/logo.png", "/logo.png"];

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700">
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Fresh Seafoods Delivered Daily
          </h1>
          <p className="text-lg mt-4 opacity-90">
            From the ocean to your kitchen. Fresh, clean and premium quality.
          </p>

          <a
            href="/products"
            className="inline-block mt-6 px-8 py-3 rounded-lg bg-teal-500 hover:bg-teal-600 font-semibold"
          >
            Order Now
          </a>
        </div>
      </section>

      <section className="text-center py-10 px-6">
        <h2 className="text-2xl font-bold text-teal-700">Why Choose Us?</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          We source fresh catch directly from Rameswaram shores, clean and pack with care,
          ensuring top quality seafood for your family.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          {highlights.map((item) => (
            <div key={item.title} className="p-5 border rounded-lg shadow hover:shadow-lg transition bg-white">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-bold">
                {item.icon}
              </span>
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 text-center bg-white">
        <h2 className="text-3xl font-bold text-pink-600">Follow us on Instagram</h2>
        <p className="text-gray-600 mt-2">Fresh catch updates, cleaning process and daily offers.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6">
          {gallery.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Rameswaram Seafoods"
              className="rounded-lg shadow-md hover:scale-105 transition"
            />
          ))}
        </div>

        <a
          href="https://www.instagram.com/rameswaramfreshseafoods/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Follow us on Instagram
        </a>
      </section>

      <section className="py-12 text-center bg-teal-50">
        <h2 className="text-3xl font-bold text-teal-700">Explore Our Products</h2>
        <p className="text-gray-600 mt-2">Fresh fish, prawns, crabs and more.</p>

        <a
          href="/products"
          className="mt-5 inline-block bg-teal-600 text-white px-7 py-3 rounded-lg shadow hover:bg-teal-700"
        >
          Shop Now
        </a>
      </section>

      <a
        href="https://wa.me/919655244550?text=Hi%20I%20want%20to%20order%20fresh%20seafoods!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 bg-green-500 px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform z-50 text-white font-semibold"
      >
        WhatsApp
      </a>
    </div>
  );
}
