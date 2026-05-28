"use client";

import { Wallet, ScanSearch, CreditCard, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Wallet,
    title: "Pilih Produk",
    desc: "Pilih game atau produk yang ingin kamu top up",
  },
  {
    number: "2",
    icon: ScanSearch,
    title: "Masukkan Data",
    desc: "Masukkan ID / nomor tujuan dan pilih nominal",
  },
  {
    number: "3",
    icon: CreditCard,
    title: "Pilih Pembayaran",
    desc: "Pilih metode pembayaran yang tersedia dan selesaikan",
  },
  {
    number: "4",
    icon: CreditCard,
    title: "Top Up Selesai",
    desc: "Top up berhasil! Produk akan masuk otomatis ke akun kamu",
  },
];

export default function HowToTopUp() {
  return (
    // 🔥 Ditambahkan id="how-to-topup" dan scroll-mt-24 di sini
    <section id="how-to-topup" className="scroll-mt-24 px-6 py-10 bg-[#081120]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <img src="/logo.png" alt="logo" className="w-10" />
          <h2 className="text-[30px] font-black text-white">
            Cara Top Up di ElangShop
          </h2>
          <img src="/logo.png" alt="logo" className="w-10 scale-x-[-1]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-[#091426] border border-[#17304F] rounded-[20px] p-5 h-full overflow-hidden">
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-black text-sm">
                  {item.number}
                </div>
                <div className="flex justify-center mt-8 mb-5">
                  <item.icon size={42} className="text-yellow-400" />
                </div>
                <h3 className="text-[18px] font-bold text-center text-white">
                  {item.title}
                </h3>
                <p className="text-center text-gray-400 text-[13px] leading-[1.9] mt-3">
                  {item.desc}
                </p>
              </div>

              {index !== 3 && (
                <div className="hidden xl:flex absolute -right-[34px] top-1/2 -translate-y-1/2 z-50">
                  <div className="flex items-center">
                    <div className="flex items-center gap-1 mr-[2px] relative left-1">
                      <div className="w-1 h-1 rounded-full bg-yellow-400" />
                      <div className="w-1 h-1 rounded-full bg-yellow-400" />
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-yellow-400 relative right-1"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
