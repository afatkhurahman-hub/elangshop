"use client";

import { useState, useEffect } from "react";

// Data konten untuk 3 slide promo carousel sebelah kiri sesuai gambar mockup
const promoSlides = [
  {
    title: "DISKON UP TO",
    value: "20%",
    desc: "Top Up Game, Pulsa, Data & Aplikasi Premium",
    btnText: "Top Up Sekarang",
    img: "/promo-baner.png",
  },
  {
    title: "CASHBACK UNTUNG",
    value: "Rp 50.000",
    desc: "Khusus Pengguna Baru Transaksi Lewat E-Wallet",
    btnText: "Ambil Cashback",
    img: "/promo-baner.png",
  },
  {
    title: "PREMIUM FLASH SALE",
    value: "BELI 2 DAPAT 3",
    desc: "Langganan Netflix, Spotify & YouTube Murah",
    btnText: "Serbu Promo",
    img: "/promo-baner.png",
  },
];

export default function Featrues() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efek auto-play carousel berganti otomatis tiap 4 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 pb-6">
      <div className="max-w-[1400px] mx-auto grid xl:grid-cols-[2.5fr_1fr] gap-4 items-stretch">
        {/* LEFT PROMO (CAROUSEL SLIDE BANNER) */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-[#102768] via-[#091a45] to-[#081120] h-[170px] px-8 flex items-center transition-all duration-500">
          {/* Box Konten */}
          <div className="relative z-10 w-[60%] flex flex-col justify-start pt-1">
            <div>
              <div className="inline-flex px-2 py-0 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 font-bold text-[11px] mb-1.5">
                PROMO SPESIAL
              </div>
            </div>

            {/* Wrapper konten text slide */}
            <div key={currentSlide} className="animate-fadeIn">
              <h2 className="text-[24px] xl:text-[28px] font-black leading-none text-white tracking-wide">
                {promoSlides[currentSlide].title}
              </h2>
              <div className="text-[28px] xl:text-[32px] font-black text-yellow-400 leading-none mt-0.5">
                {promoSlides[currentSlide].value}
              </div>
              <p className="text-gray-300 text-[13px] mt-1 line-clamp-1">
                {promoSlides[currentSlide].desc}
              </p>
            </div>

            <div>
              {/* mt-2 membuat posisi tombol naik lebih tinggi dan ideal */}
              <button className="mt-2 bg-yellow-400 text-black px-5 py-2 rounded-xl font-black text-sm hover:opacity-90 transition relative z-20 shadow-md shadow-yellow-400/10">
                {promoSlides[currentSlide].btnText}
              </button>
            </div>
          </div>

          {/* Gambar Banner Sisi Kanan */}
          <img
            key={`img-${currentSlide}`}
            src={promoSlides[currentSlide].img}
            alt="promo"
            className="absolute right-0 top-0 h-full w-[42%] object-cover opacity-90 transition-all duration-500 select-none pointer-events-none z-0"
          />

          {/* Indikator Bulat Navigasi Halaman Carousel di Tengah Bawah */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {promoSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "bg-yellow-400 w-5"
                    : "bg-white/20 w-2 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT CARD (Tiga Kartu Kecil) */}
        <div className="grid grid-cols-3 gap-4 h-[170px]">
          {/* QRIS */}
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#2157FF] to-[#081B5E] p-4">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl" />
            <p className="text-[13px] font-semibold text-white/90">
              Cashback QRIS
            </p>
            <h3 className="mt-5 text-[16px] leading-tight font-black text-white">
              s/d 10Rb
            </h3>
            <p className="mt-5 text-[12px] leading-relaxed text-white/70">
              Min. Transaksi 50Rb
            </p>
            <img
              src="/qriss.png"
              alt="qris"
              className="absolute bottom-4 right-4 w-[42px] object-contain"
            />
          </div>

          {/* PULSA */}
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#008D43] to-[#003D1E] p-4">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-green-400/20 blur-2xl" />
            <p className="text-[13px] font-semibold text-white/90">
              Diskon Pulsa
            </p>
            <h3 className="mt-5 text-[16px] leading-tight font-black text-white">
              s/d 15%
            </h3>
            <p className="mt-4 text-[12px] leading-relaxed text-white/70">
              All Operator
            </p>
            <img
              src="/pulsaa.png"
              alt="pulsa"
              className="absolute bottom-0.25 right-4 w-[42px] object-contain"
            />
          </div>

          {/* MEMBER */}
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#7B1FFF] to-[#2B005C] p-4">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-400/20 blur-2xl" />
            <p className="text-[13px] font-semibold text-white/90">
              Member Baru
            </p>
            <h3 className="mt-1 text-[16px] leading-tight font-black text-white">
              Cashback 5Rb
            </h3>
            <p className="mt-1 text-[12px] leading-relaxed text-white/70">
              Min. Transaksi 25Rb
            </p>
            <img
              src="/giftt.png"
              alt="gift"
              className="absolute bottom-1 right-4 w-[42px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
