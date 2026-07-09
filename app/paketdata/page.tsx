"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import Navbar from "@/components/landing-page/Navbar";
import AllPage from "@/components/all-page/PageDashboard";
import FaqAndFooter from "@/components/next-page/FaqAndFooter";

// 🚀 PASTIKAN COMPONENT FORM INI SUDAH DI-IMPORT
import TransactionForm from "@/components/landing-page/TransactionForm";

export default function Paketdata() {
  // 1. Pastikan memiliki state "detail" agar form bisa muncul
  const [view, setView] = useState<"all-dashboard" | "detail">("all-dashboard");
   const [activeCategory, setActiveCategory] = useState("paketdata");
  const pathname = usePathname(); 

  const [selectedProduct, setSelectedProduct] = useState<{
    title: string;
    category: string;
    image: string;
    sub?: string;
  } | null>(null);

  // Sinkronisasi kategori aktif berdasarkan URL
  useEffect(() => {
    if (view === "detail") return; // Jangan reset jika sedang di halaman detail

    const slugs: Record<string, string> = {
      "/game": "Game",
      "/pulsa": "Pulsa",
      "/paket-data": "Paket Data",
      "/e-wallet": "E-Wallet",
      "/premium": "Premium",
      "/pln": "PLN"
    };
    
    if (slugs[pathname]) {
      setActiveCategory(slugs[pathname]);
    }
  }, [pathname, view]);

  // 2. FUNGSI UTAMA: Menangani ketika kartu provider diklik di dashboard
  const handleSelectProductFromDashboard = (
    productName: string,
    category: string,
    productImage: string,
  ) => {
    setSelectedProduct({
      title: productName,
      category: category,
      image: productImage,
    });
    
    setView("detail"); // 🚀 Mengubah view menjadi detail agar form transaksi muncul
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-x-hidden">
      <Navbar
        onCategorySelect={(cat) => setActiveCategory(cat)}
        activeCategory={activeCategory}
      />

      {/* 3. TAMPILAN DASHBOARD UTAMA */}
      {view === "all-dashboard" && (
        <AllPage
          onBack={() => {
            window.location.href = "/"; // Kembali ke beranda utama
          }}
          // 🚀 HUBUNGKAN KE FUNGSI handleSelectProduct KAMI DI ATAS
          onSelectProduct={(title, category, img) =>
            handleSelectProductFromDashboard(title, category, img)
          }
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}

      {/* 4. TAMPILAN FORM TRANSAKSI (YANG MEMBUAT FORM MUNCUL) */}
      {view === "detail" && selectedProduct && (
        <TransactionForm
          product={selectedProduct}
          onBack={() => {
            setView("all-dashboard"); // Jika tombol kembali di form diklik, balik ke dashboard
            setSelectedProduct(null);
          }}
        />
      )}

      <FaqAndFooter />
    </main>
  );
}