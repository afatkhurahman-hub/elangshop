"use client";

import { ChevronRight } from "lucide-react";

const products = [
  {
    image: "/emel.png",
    title: "Mobile Legends",
    sub: "12 Diamonds",
    price: "Rp 6.813",
  },
  {
    image: "/epep.png",
    title: "Free Fire",
    sub: "70 Diamonds",
    price: "Rp 10.348",
  },
  {
    image: "/pubgg.png",
    title: "PUBG Mobile",
    sub: "30 UC",
    price: "Rp 11.000",
  },
  {
    image: "/valorantt.png",
    title: "Valorant",
    sub: "125 VP",
    price: "Rp 15.000",
  },
  {
    image: "/spotifyy.png",
    title: "Spotify",
    sub: "1 Bulan",
    price: "Rp 25.000",
  },
  {
    image: "/netflixx.png",
    title: "Netflix",
    sub: "1 Bulan",
    price: "Rp 50.000",
  },
];

export default function PopularProducts() {
  const handleProductClick = (item: (typeof products)[number]) => {
    // 1. Kirim data lengkap (title, sub, DAN SEKARANG TERMASUK image & category)
    const event = new CustomEvent("selectProduct", {
      detail: {
        title: item.title,
        sub: item.sub,
        image: item.image, // 🌟 INI DIA! Sekarang gambarnya ikut dikirim agar muncul di form
        // Otomatis deteksi kategori: Jika Spotify/Netflix masuk "Premium", sisanya masuk "Game"
        category:
          item.title === "Spotify" || item.title === "Netflix"
            ? "Premium"
            : "Game",
      },
    });
    window.dispatchEvent(event);

    // 2. Otomatis scroll mulus kembali ke atas menuju form transaksi
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="px-6 pb-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[28px] font-bold">Produk Populer</h2>
          <button
            onClick={() => {
              // Memicu event kustom agar disaklar oleh state di app/page.tsx
              const event = new Event("openAllProductsView");
              window.dispatchEvent(event);
            }}
            className="flex items-center gap-1 text-yellow-400 text-sm font-semibold cursor-pointer bg-transparent border-none outline-none hover:underline"
          >
            Lihat Semua <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {products.map((item, index) => (
            <div
              key={index}
              onClick={() => handleProductClick(item)} // 🔥 Mengirimkan seluruh object item
              className="bg-[#0E1628] border border-white/10 rounded-[18px] p-4 hover:border-yellow-400 transition cursor-pointer"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                  <p className="text-yellow-400 text-lg font-black mt-1">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
