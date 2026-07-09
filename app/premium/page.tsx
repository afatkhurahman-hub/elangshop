"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import Navbar from "@/components/landing-page/Navbar";
import AllPage from "@/components/all-page/PageDashboard";
import FaqAndFooter from "@/components/next-page/FaqAndFooter";
import TransactionForm from "@/components/landing-page/TransactionForm";

export default function MasterCategoryPage() {
  const router = useRouter(); 
  const pathname = usePathname(); 

  const [view, setView] = useState<"all-dashboard" | "detail">("all-dashboard");
  const [activeCategory, setActiveCategory] = useState("Pulsa");

  const [selectedProduct, setSelectedProduct] = useState<{
    title: string;
    category: string;
    image: string;
    sub?: string;
  } | null>(null);

  useEffect(() => {
    if (view === "detail") return;

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

  const handleSelectProductFromDashboard = (
    productName: string,
    category: string,
    productImage: string,
  ) => {
    const productSlug = productName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const categorySlug = category
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    router.push(`/${categorySlug}/${productSlug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {view === "all-dashboard" && (
        <AllPage
          onBack={() => {
            router.push("/");
          }}
          onSelectProduct={(title, category, img) =>
            handleSelectProductFromDashboard(title, category, img)
          }
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}

      {view === "detail" && selectedProduct && (
        <div className="pt-4 pb-12">
          <TransactionForm
            product={selectedProduct}
            onBack={() => {
              setView("all-dashboard");
              setSelectedProduct(null);
            }}
          />
        </div>
      )}

      <FaqAndFooter />
    </main>
  );
}