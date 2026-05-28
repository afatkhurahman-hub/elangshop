"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rizky Pratama",
    comment:
      "Top up di ElangShop cepat, aman, dan harganya murah banget dibanding lapak sebelah!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Dewi Lestari",
    comment:
      "Prosesnya instan banget, gak nyampe semenit diamond ML udah langsung masuk akun.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Farhan Maulana",
    comment:
      "Pembayaran lengkap pakai QRIS langsung ke-detek otomatis. Rekomendasi pol!",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Budi Santoso",
    comment:
      "Awalnya ragu, pas nyoba nyari UC PUBG paling murah ternyata di sini tempatnya.",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Siti Rahma",
    comment:
      "Customer servicenya ramah dan fast response pas nanya jam aktif operasional bank.",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Kevin Wijaya",
    comment:
      "Langganan premium apps di sini amanah semua, anti on-hold dan durasi full.",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Anisa Fitri",
    comment:
      "Suka banyak event promo potongan harganya kalau weekend, sering-sering ya min!",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Dimas Saputra",
    comment:
      "Situs top up paling bersih tampilannya, gak ribet, gak banyak iklan nge-bug.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Megawati",
    comment:
      "Sistem otomatisnya juara, top up subuh-subuh tetep masuk hitungan detik.",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    name: "Aditya Nugraha",
    comment:
      "Beli VP Valorant di sini praktis, tinggal masukin ID, bayar, langsung sat-set masuk.",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Rina Wijayanti",
    comment:
      "Udah jadi langganan tetap squad mabar kami buat urusan supply diamond bulanan.",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Fajar Ramadan",
    comment:
      "Gak nyesel top up FF di sini, legal 100% dan akun aman jaya dari banned.",
    image: "https://i.pravatar.cc/150?img=14",
  },
];

export default function Testimonials() {
  // Melacak halaman slide aktif (0 sampai 3)
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4; // 12 data dibagi 3 kartu = 4 slide halaman

  // Efek Geser Otomatis (Auto-play) setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 py-14 bg-[#081120] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[42px] font-black text-white text-center mb-12">
          Apa Kata Mereka?
        </h2>

        {/* WINDOW VIEWPORT CAROUSEL */}
        <div className="w-full overflow-hidden">
          {/* TRACK CAROUSEL YANG BERGESER */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Loop sebanyak 4 kali untuk membuat 4 halaman slide utama */}
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pr-1"
              >
                {/* Isi masing-masing slide dengan 3 data testimonial yang sesuai */}
                {testimonials
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative bg-[#091426] border border-[#17304F] rounded-[22px] p-7 min-h-[210px] flex flex-col justify-between overflow-hidden hover:border-yellow-400/30 transition-colors duration-300"
                    >
                      {/* Hiasan Tanda Petik Estetik */}
                      {index === 0 && (
                        <div className="absolute bottom-[-60px] left-2 text-[100px] text-blue-500/10 font-black leading-none select-none pointer-events-none">
                          “
                        </div>
                      )}
                      {index === 2 && (
                        <div className="absolute top-[-30px] right-3 text-[100px] text-blue-500/10 font-black leading-none select-none pointer-events-none">
                          ”
                        </div>
                      )}

                      <div className="flex items-center gap-4 relative z-10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                        />
                        <div>
                          <h3 className="text-[18px] font-bold text-white">
                            {item.name}
                          </h3>
                          <div className="text-yellow-400 text-base mt-0.5 tracking-wider">
                            ★★★★★
                          </div>
                        </div>
                      </div>
                      <p className="relative z-10 text-gray-300 text-[15px] leading-[1.8] mt-5">
                        {item.comment}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* INDIKATOR TITIK (DOTS) INTERAKTIF */}
        <div className="flex justify-center gap-3 mt-10">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-yellow-400"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Buka slide halaman ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
