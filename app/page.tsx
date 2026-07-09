"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/landing-page/Navbar";
import Hero from "@/components/landing-page/Hero";
import Featrues from "@/components/landing-page/Featrues";
import PopularProducts from "@/components/next-page/PopularProducts";
import Testimonials from "@/components/next-page/Testimonials";
import WhyChooseUs from "@/components/next-page/WhyChooseUs";
import HowToTopUp from "@/components/next-page/HowToTopUp";
import FaqAndFooter from "@/components/next-page/FaqAndFooter";
import AllPage from "@/components/all-page/PageDashboard";

// IMPORT COMPONENT FORM DETAIL BARU
import TransactionForm from "@/components/landing-page/TransactionForm";

export default function Home() {
  const [view, setView] = useState<"home" | "all-dashboard" | "detail">("home");
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const pathname = usePathname();

  // Menambahkan properti 'sub' opsional ke dalam tipe data state selectedProduct
  const [selectedProduct, setSelectedProduct] = useState<{
    title: string;
    category: string;
    image: string;
    sub?: string;
  } | null>(null);

  const [previousView, setPreviousView] = useState<"home" | "all-dashboard">(
    "home",
  );

  // 🚀 PERBAIKAN UTAMA: Perbaiki logika sinkronisasi agar tidak menabrak "detail"
  useEffect(() => {
    // KUNCI: Jika sedang melihat detail transaksi, JANGAN biarkan URL mereset view!
    if (view === "detail") return;

    if (pathname === "/") {
      setView("home");
      setActiveCategory("home");
    } else {
      setView("all-dashboard");
      // Mencari kategori yang cocok berdasarkan slug URL saat ini agar tab aktifnya sesuai
      const slugs: Record<string, string> = {
        "/game": "Game",
        "/pulsa": "Pulsa",
        "/paketdata": "Paket Data",
        "/e-wallet": "E-Wallet",
        "/premium": "Premium",
        "/pln": "PLN",
      };
      if (slugs[pathname]) {
        setActiveCategory(slugs[pathname]);
      }
    }
  }, [pathname, view]); // Jalankan ulang hanya jika rute browser atau status tampilan berubah

  useEffect(() => {
    const handleOpenAllProducts = () => {
      setView("all-dashboard");
      setActiveCategory("Game");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleOpenHome = () => {
      setView("home");
      setActiveCategory("home");
      setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleLocalSelectProduct = (event: Event) => {
      const customEvent = event as CustomEvent<{
        title: string;
        category: string;
        image?: string;
        sub?: string;
      }>;
      if (customEvent.detail) {
        setPreviousView("home");

        setSelectedProduct({
          title: customEvent.detail.title,
          category: customEvent.detail.category || "Game",
          image: customEvent.detail.image || "",
          sub: customEvent.detail.sub || "",
        });
        setView("detail");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("openAllProductsView", handleOpenAllProducts);
    window.addEventListener("openHomeView", handleOpenHome);
    window.addEventListener("selectProduct", handleLocalSelectProduct);

    return () => {
      window.removeEventListener("openAllProductsView", handleOpenAllProducts);
      window.removeEventListener("openHomeView", handleOpenHome);
      window.removeEventListener("selectProduct", handleLocalSelectProduct);
    };
  }, []);

  const handleNavbarCategorySelect = (categoryName: string) => {
    if (categoryName === "Promo") {
      setActiveCategory("Promo");
      if (view !== "home") setView("home");

      setTimeout(() => {
        const promoElement = document.getElementById("promo-section");
        if (promoElement)
          promoElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    setActiveCategory(categoryName);
    setView("all-dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProductFromDashboard = (
    productName: string,
    category: string,
    productImage: string,
  ) => {
    setPreviousView("all-dashboard");

    setSelectedProduct({
      title: productName,
      category: category,
      image: productImage,
    });

    // 🚀 Pemicu perpindahan ke form detail transaksi
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-white overflow-x-hidden">
      <Navbar
        onCategorySelect={handleNavbarCategorySelect}
        activeCategory={activeCategory}
      />

      {view === "home" && (
        <>
          <Hero />
          <Featrues />
          <PopularProducts />
          <WhyChooseUs />
          <HowToTopUp />
          <Testimonials />
        </>
      )}

      {view === "all-dashboard" && (
        <AllPage
          onBack={() => {
            setView("home");
            setActiveCategory("home");
          }}
          onSelectProduct={(title, category, img) =>
            handleSelectProductFromDashboard(title, category, img)
          }
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}

      {view === "detail" && selectedProduct && (
        <TransactionForm
          product={selectedProduct}
          onBack={() => {
            setView(previousView);
            setSelectedProduct(null);

            if (previousView === "home") {
              setActiveCategory("home");
            }
          }}
        />
      )}

      <FaqAndFooter />
    </main>
  );
}
