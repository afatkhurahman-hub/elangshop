"use client";

import { Wallet, Headphones, RotateCcw, ShieldCheck } from "lucide-react";

const infoItems = [
  {
    icon: Wallet,
    title: "Pembayaran Lengkap",
    desc: "QRIS, E-Wallet, Transfer, VA",
  },
  {
    icon: Headphones,
    title: "Customer Service 24/7",
    desc: "Siap membantu kapan saja",
  },
  { icon: RotateCcw, title: "Refund Cepat", desc: "100% uang kembali" },
  { icon: ShieldCheck, title: "100% Aman", desc: "Sistem keamanan terjamin" },
];

export default function FootInfo() {
  return (
    <section className="px-6 pb-10">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#0E1628] border border-yellow-400/10 rounded-[22px] p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                <item.icon size={22} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-[16px]">{item.title}</h3>
                <p className="text-[13px] text-gray-400 mt-1">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
