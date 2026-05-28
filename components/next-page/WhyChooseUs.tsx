"use client";

import {
  Zap,
  Trophy,
  CreditCard,
  ShieldCheck,
  Headphones,
  RotateCcw,
} from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Proses Instan",
    desc: "Top up masuk dalam hitungan detik",
  },
  {
    icon: Trophy,
    title: "Harga Kompetitif",
    desc: "Harga terbaik dan banyak promo menarik",
  },
  {
    icon: CreditCard,
    title: "Pembayaran Lengkap",
    desc: "QRIS, E-Wallet, Transfer, dan lainnya",
  },
  {
    icon: ShieldCheck,
    title: "Aman & Terpercaya",
    desc: "Sistem aman, data terjamin 100%",
  },
  {
    icon: Headphones,
    title: "CS Fast Response",
    desc: "Customer service siap membantu 24/7",
  },
  {
    icon: RotateCcw,
    title: "Refund Cepat",
    desc: "100% uang kembali jika terjadi masalah",
  },
];

export default function WhyChooseUs() {
  return (
    // 🔥 Ditambahkan id="why-choose-us" dan scroll-mt-24 di sini
    <section
      id="why-choose-us"
      className="scroll-mt-24 px-6 py-10 bg-[#081120]"
    >
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[30px] font-black text-white text-center mb-8">
          Kenapa Memilih ElangShop?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-[#091426] border border-[#17304F] rounded-[18px] p-5 text-center hover:border-yellow-400/40 transition"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4 relative">
                <div className="absolute w-10 h-10 bg-yellow-400/20 blur-2xl" />
                <item.icon
                  size={28}
                  className="text-yellow-400 relative z-10"
                />
              </div>
              <h3 className="text-[15px] font-bold text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-[12px] text-gray-400 leading-[1.8] mt-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
