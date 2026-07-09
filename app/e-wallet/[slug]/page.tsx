"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/landing-page/Navbar";
import TransactionForm from "@/components/landing-page/TransactionForm";
import FaqAndFooter from "@/components/next-page/FaqAndFooter";
import { productsData } from "@/components/landing-page/productsData";

const getProductImage = (name: string): string => {
  const normalized = name.toLowerCase();
  if (normalized.includes("mobile legends")) return "/ml.png";
  if (normalized.includes("free fire")) return "/ff.png";
  if (normalized.includes("pubg")) return "/pubgg.png";
  if (normalized.includes("call of duty") || normalized.includes("cod")) return "/cod.png";
  if (normalized.includes("valorant")) return "/valorantt.png";
  if (normalized.includes("aov")) return "/aov.png";
  if (normalized.includes("genshin")) return "/gi.png";
  if (normalized.includes("clash of clans") || normalized.includes("coc")) return "/coc.png";
  if (normalized.includes("honor of kings") || normalized.includes("hok")) return "/hok.png";
  if (normalized.includes("point blank") || normalized.includes("pb")) return "/pb.png";
  if (normalized.includes("roblox")) return "/roblox.png";
  if (normalized.includes("honkai star rail") || normalized.includes("honkai")) return "/hsr.png";
  if (normalized.includes("steam")) return "/steam.png";
  if (normalized.includes("dana")) return "/dana1.png";
  if (normalized.includes("gopay")) return "/gopay1.png";
  if (normalized.includes("ovo")) return "/ovo.png";
  if (normalized.includes("shopee")) return "/shoppepay1.png";
  if (normalized.includes("netflix")) return "/netflix.png";
  if (normalized.includes("youtube") || normalized.includes("ytb")) return "/ytbprem.png";
  if (normalized.includes("spotify")) return "/spotifyy.png";
  if (normalized.includes("vidio")) return "/vidio.png";
  if (normalized.includes("we tv") || normalized.includes("wetv")) return "/wetv.png";
  if (normalized.includes("viu")) return "/viu.png";
  if (normalized.includes("disney")) return "/disney.png";
  if (normalized.includes("bstation")) return "/bstation.png";
  if (normalized.includes("canva")) return "/canva.png";
  if (normalized.includes("capcut")) return "/capcut.png";
  if (normalized.includes("picsart")) return "/picsart.png";
  if (normalized.includes("alight motion") || normalized.includes("am")) return "/am.png";
  if (normalized.includes("primevideo")) return "/primevideo.png";
  if (normalized.includes("telkomsel")) return "/telkomsel.png";
  if (normalized.includes("indosat")) return "/indosat.png";
  if (normalized.includes("xl")) return "/xl.png";
  if (normalized.includes("axis")) return "/axis.png";
  if (normalized.includes("smartfren")) return "/smartfren.png";
  if (normalized.includes("tri") || normalized.startsWith("3")) return "/3.png";
  if (normalized.includes("by.u") || normalized.includes("byu")) return "/byu.png";
  if (normalized.includes("pln")) return "/pln.png";
  return "/logo.png";
};

export default function DetailEWalletPage() {
  const params = useParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("E-Wallet");
  const slug = params.slug as string;

  const currentItems = productsData["E-Wallet"]?.items || {};
  const foundKey = Object.keys(currentItems).find((key) => {
    const cleanKey = key.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return cleanKey === slug;
  });

  if (!foundKey) {
    return (
      <main className="min-h-screen bg-[#070B14] text-white overflow-x-hidden">
        <Navbar onCategorySelect={(cat) => setActiveCategory(cat)} activeCategory={activeCategory} />
        <div className="p-20 text-center text-white">
          <p className="text-lg font-semibold">Produk tidak ditemukan.</p>
          <button onClick={() => router.push("/e-wallet")} className="mt-4 text-[#FACC15] font-bold hover:underline">
            Kembali ke E-Wallet
          </button>
        </div>
        <FaqAndFooter />
      </main>
    );
  }

  const mockProduct = {
    title: foundKey,
    category: "E-Wallet", 
    image: getProductImage(foundKey), 
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-x-hidden">
      <Navbar
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          const catSlug = cat.toLowerCase().replace(/\s+/g, "-");
          router.push(`/${catSlug}`);
        }}
        activeCategory={activeCategory}
      />
      <div className="pt-4 pb-12">
        <TransactionForm product={mockProduct} onBack={() => router.push("/e-wallet")} />
      </div>
      <FaqAndFooter />
    </main>
  );
}