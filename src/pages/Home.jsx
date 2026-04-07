import React, { useEffect, useState } from "react";

const heroSlides = ["/home/rms2.avif", "/home/rms3.jpeg", "/home/rms5.jpg", "/home/velameen.webp"];

const slides = [
  { src: "/home/hero.jpg", title: "Fresh arrivals from Rameswaram coast" },
  { src: "/home/insta-1.jpg", title: "Daily catch selected with care" },
  { src: "/home/insta-2.jpg", title: "Cleaned, packed, and delivered fresh" },
  { src: "/home/insta-3.jpg", title: "Trusted seafood for every family meal" },
];

export default function Home() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full">
      <section className="relative min-h-[72vh] md:min-h-[78vh] flex items-center justify-center overflow-hidden">
        {heroSlides.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Rameswaram hero ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${activeHeroSlide === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/40" />

        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white text-xs md:text-sm px-4 py-2 rounded-full floating-pill fade-up">
          Daily Fresh Catch from Rameswaram
        </div>

        <div className="relative z-10 text-center text-white px-5 max-w-3xl section-shell">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight fade-up">Fresh Seafoods Delivered Daily</h1>
          <p className="text-base md:text-xl mt-4 opacity-95 max-w-2xl mx-auto fade-up-delay-1">
            From the ocean to your kitchen. Fresh, clean, and premium quality seafood with same-day delivery.
          </p>

          <a href="/products" className="animated-gradient-btn inline-block mt-8 px-8 py-3.5 rounded-xl font-bold text-white fade-up-delay-2">
            Order Now
          </a>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveHeroSlide(index)}
              className={`h-2.5 rounded-full transition-all ${activeHeroSlide === index ? "w-7 bg-white" : "w-2.5 bg-white/70"}`}
              aria-label={`Go to hero slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="section-shell py-10 md:py-12">
        <div className="relative premium-card overflow-hidden">
          <img
            src={slides[activeSlide].src}
            alt={slides[activeSlide].title}
            className="w-full h-[230px] sm:h-[320px] md:h-[420px] object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <p className="absolute left-4 md:left-6 bottom-4 md:bottom-6 text-white font-bold text-lg md:text-2xl max-w-2xl">
            {slides[activeSlide].title}
          </p>

          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 text-slate-900 font-bold"
            aria-label="Previous slide"
          >
            {"<"}
          </button>

          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 text-slate-900 font-bold"
            aria-label="Next slide"
          >
            {">"}
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-7 bg-white" : "w-2.5 bg-white/60"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-6 md:pb-10">
        <div className="premium-card p-5 md:p-8 bg-gradient-to-r from-amber-50 to-sky-50">
          <h2 className="text-2xl md:text-4xl font-extrabold text-rose-700">Story of Rameswaram & Fisherman Life</h2>
          <p className="text-slate-700 mt-4 leading-relaxed">
            Rameswaram is a coastal town built on faith, sea winds, and generations of fishing families. Before sunrise,
            fishermen head into the water with skill passed down through families, facing changing tides and weather to bring
            back the day&apos;s fresh catch. Every order supports this hardworking community, their boats, and their families.
          </p>
          <p className="text-slate-700 mt-3 leading-relaxed">
            At Rameswaram Seafoods, we respect that journey from sea to home. We source carefully, clean hygienically, and deliver
            quickly so customers in Trichy get authentic coastal freshness with trust.
          </p>
        </div>
      </section>

      <section className="section-shell text-center py-14 px-1">
        <h2 className="text-2xl md:text-4xl font-extrabold text-rose-700 fade-up">Why Choose Us?</h2>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto fade-up-delay-1">
          We source fresh catch directly from Rameswaram shores, clean and pack with care, and deliver high quality seafood for your family.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-9">
          <div className="premium-card p-6 fade-up">
            <span className="text-sm font-bold uppercase tracking-wider text-rose-600">Fresh</span>
            <h3 className="text-xl font-extrabold mt-2">Fresh Catch Everyday</h3>
            <p className="text-slate-500 mt-1">Delivered within hours of arrival.</p>
          </div>

          <div className="premium-card p-6 fade-up-delay-1">
            <span className="text-sm font-bold uppercase tracking-wider text-rose-600">Clean</span>
            <h3 className="text-xl font-extrabold mt-2">Clean and Hygienic</h3>
            <p className="text-slate-500 mt-1">Professionally cleaned and packed.</p>
          </div>

          <div className="premium-card p-6 fade-up-delay-2">
            <span className="text-sm font-bold uppercase tracking-wider text-rose-600">Fast</span>
            <h3 className="text-xl font-extrabold mt-2">Fast Delivery</h3>
            <p className="text-slate-500 mt-1">Same-day doorstep service.</p>
          </div>
        </div>
      </section>

      <section className="py-14 text-center bg-white/80 border-y border-rose-100">
        <div className="section-shell px-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-rose-700 fade-up">Follow us on Instagram</h2>
          <p className="text-slate-600 mt-2 fade-up-delay-1">Fresh catch updates, cleaning process, customer orders, and daily offers.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-7">
            <img src="/home/insta-1.jpg" className="rounded-xl shadow-md hover:scale-[1.03] transition duration-300 aspect-square object-cover" alt="Seafood update 1" />
            <img src="/home/insta-2.jpg" className="rounded-xl shadow-md hover:scale-[1.03] transition duration-300 aspect-square object-cover" alt="Seafood update 2" />
            <img src="/home/insta-3.jpg" className="rounded-xl shadow-md hover:scale-[1.03] transition duration-300 aspect-square object-cover" alt="Seafood update 3" />
            <img src="/home/insta-4.png" className="rounded-xl shadow-md hover:scale-[1.03] transition duration-300 aspect-square object-cover" alt="Seafood update 4" />
          </div>

          <a
            href="https://www.instagram.com/rameswaramfreshseafoods/"
            target="_blank"
            rel="noreferrer"
            className="animated-gradient-btn mt-7 inline-block text-white px-7 py-3 rounded-full font-semibold shadow-lg"
          >
            Follow us on Instagram
          </a>
        </div>
      </section>

      <section className="py-14 text-center">
        <div className="section-shell premium-card px-5 py-10 md:px-12 md:py-12 bg-gradient-to-r from-rose-50 to-orange-50">
          <h2 className="text-3xl md:text-4xl font-extrabold text-rose-700">Explore Our Products</h2>
          <p className="text-slate-600 mt-3">Fresh fish, prawns, crabs, and more.</p>

          <a href="/products" className="animated-gradient-btn mt-6 inline-block text-white px-8 py-3 rounded-xl font-bold">
            Shop Now
          </a>
        </div>
      </section>

      <a
        href="https://wa.me/919655244550?text=Hi%20I%20want%20to%20order%20fresh%20seafoods!"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 bg-green-500 p-3.5 md:p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50 flex items-center justify-center pulse-glow"
      >
        <img src="/home/whatsapp.svg" className="w-8 h-8 md:w-9 md:h-9" alt="WhatsApp Chat" />
      </a>
    </div>
  );
}
