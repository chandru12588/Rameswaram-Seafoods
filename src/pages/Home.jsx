import React from "react";

export default function Home() {
  return (
    <div className="w-full">

      {/* Hero Banner */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=1200')] 
                        bg-cover bg-center bg-no-repeat h-[70vh] flex items-center justify-center">
        <div className="bg-black/50 w-full h-full absolute"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Fresh Seafoods Delivered Daily 🐟
          </h1>
          <p className="text-lg mt-4 opacity-90">
            From the ocean to your kitchen — Fresh, Clean & Premium Quality.
          </p>

          <a href="/products" 
            className="inline-block mt-6 px-8 py-3 rounded-lg bg-teal-500 hover:bg-teal-600 font-semibold">
            Order Now
          </a>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="text-center py-10 px-6">
        <h2 className="text-2xl font-bold text-teal-700">Why Choose Us?</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          We source fresh catch directly from Rameswaram shores, clean and pack with care,
          ensuring the highest quality seafood for your family.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">

          <div className="p-5 border rounded-lg shadow hover:shadow-lg transition bg-white">
            <span className="text-4xl">🐠</span>
            <h3 className="text-lg font-semibold mt-2">Fresh Catch Everyday</h3>
            <p className="text-gray-500">Delivered within hours of arrival.</p>
          </div>

          <div className="p-5 border rounded-lg shadow hover:shadow-lg transition bg-white">
            <span className="text-4xl">✨</span>
            <h3 className="text-lg font-semibold mt-2">Clean & Hygienic</h3>
            <p className="text-gray-500">Professionally cleaned & packed.</p>
          </div>

          <div className="p-5 border rounded-lg shadow hover:shadow-lg transition bg-white">
            <span className="text-4xl">🚚</span>
            <h3 className="text-lg font-semibold mt-2">Fast Delivery</h3>
            <p className="text-gray-500">Same-day doorstep service.</p>
          </div>

        </div>
      </section>

      {/* ================= INSTAGRAM FOLLOW SECTION ================= */}
      <section className="py-10 text-center bg-white">
        <h2 className="text-3xl font-bold text-pink-600">📸 Follow us on Instagram</h2>
        <p className="text-gray-600 mt-2">
          Fresh catch updates, cleaning process, customer orders & daily offers!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6">
          <img src="https://pbs.twimg.com/media/D6NqF7RVUAA-jJx.jpg" className="rounded-lg shadow-md hover:scale-105 transition" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmCVpZQgR2fnM6W-CSEKaDR9XkMuKfq_5WJg&s" className="rounded-lg shadow-md hover:scale-105 transition" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzx6ajUULOUKY0yKj1zYJ9_07tPYrD4ZJIfQ&s" className="rounded-lg shadow-md hover:scale-105 transition" />
          <img src="https://images.exoticamp.com/vendors/images/profile/Blog%20%20News%20Banners%20%20%20(18)_20240829T093457232Z.jpg" className="rounded-lg shadow-md hover:scale-105 transition" />
        </div>

        <a 
          href="https://www.instagram.com/rameswaramfreshseafoods/" 
          target="_blank"
          className="mt-6 inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          🔥 Follow us on Instagram
        </a>
      </section>

      {/* Shop CTA */}
      <section className="py-12 text-center bg-teal-50">
        <h2 className="text-3xl font-bold text-teal-700">Explore Our Products</h2>
        <p className="text-gray-600 mt-2">Fresh fish, prawns, crabs & more!</p>

        <a 
          href="/products"
          className="mt-5 inline-block bg-teal-600 text-white px-7 py-3 rounded-lg shadow hover:bg-teal-700">
          Shop Now
        </a>
      </section>

      {/* 🟢 WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/919655244550?text=Hi%20I%20want%20to%20order%20fresh%20seafoods!"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          className="w-9 h-9"
          alt="WhatsApp Chat"
        />
      </a>

    </div>
  );
}
