"use client";

import { useState } from "react";
import {
  Gamepad2,
  Smartphone,
  Database,
  Wallet,
  Tv,
  Search,
  ArrowLeft,
  Zap,
} from "lucide-react";

// ✅ 1. Perbaikan Path Import: disesuaikan dengan folder asli kamu di sidebar
import { productsData } from "@/components/landing-page/productsData";

// ✅ 2. MODIFIKASI: Tambahkan parameter ketiga (image: string) pada onSelectProduct
interface PageDashboardProps {
  onBack: () => void;
  onSelectProduct: (
    productName: string,
    category: string,
    image: string,
  ) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function PageDashboardAll({
  onBack,
  onSelectProduct,
  activeCategory,
  setActiveCategory,
}: PageDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Daftar Kategori beserta Ikon pendukung dari Lucide React
  const categories = [
    { id: "Game", label: "Game", icon: Gamepad2 },
    { id: "Pulsa", label: "Pulsa", icon: Smartphone },
    { id: "Paket Data", label: "Paket Data", icon: Database },
    { id: "E-Wallet", label: "E-Wallet", icon: Wallet },
    { id: "Premium", label: "Aplikasi Premium", icon: Tv },
    { id: "PLN", label: "PLN", icon: Zap },
  ];

  // Fungsi pemetaan gambar lokal dari folder public kamu (Mencegah fallback elangshop terus)
  const getProductImage = (name: string) => {
    const cleanName = name.trim().toLowerCase();

    // 1. KATEGORI GAME
    if (cleanName.includes("mobile legends")) return "/ml.png";
    if (cleanName.includes("free fire")) return "/ff.png";
    if (cleanName.includes("pubg mobile")) return "/pubgg.png";
    if (cleanName.includes("call of duty")) return "/cod.png";
    if (cleanName.includes("valorant")) return "/valorantt.png";
    if (cleanName.includes("aov") || cleanName.includes("arena of valor"))
      return "/aov.png";
    if (cleanName.includes("genshin")) return "/gi.png";
    if (cleanName.includes("clash of clans")) return "/coc.png";
    if (cleanName.includes("roblox")) return "/roblox.png";
    if (cleanName.includes("honor of kings")) return "/hok.png";
    if (cleanName.includes("point blank")) return "/pb.png";
    if (cleanName.includes("honkai star rail")) return "/honkai.png";
    if (cleanName.includes("steam wallet")) return "/steam.png";

    // 2. KATEGORI PULSA & PAKET DATA
    if (cleanName.includes("telkomsel")) return "/telkomsel.png";
    if (cleanName.includes("indosat")) return "/indosat.png";
    if (cleanName.includes("xl")) return "/xl.png";
    if (cleanName.includes("axis")) return "/axis.png";
    if (cleanName.includes("smartfren")) return "/smartfren.png";
    if (cleanName.includes("tri") || cleanName === "3") return "/3.png";
    if (cleanName.includes("by.u")) return "/byu.png";

    // 3. KATEGORI E-WALLET
    if (cleanName.includes("dana")) return "/dana1.png";
    if (cleanName.includes("ovo")) return "/ovo.png";
    if (cleanName.includes("gopay")) return "/gopay1.png";
    if (cleanName.includes("shopeepay")) return "/shoppepay1.png";

    // 4. KATEGORI PREMIUM
    if (cleanName.includes("netflix")) return "/netflix.png";
    if (cleanName.includes("youtube")) return "/ytb.png";
    if (cleanName.includes("spotify")) return "/spotifyy.png";
    if (cleanName.includes("vidio")) return "/vidio.png";
    if (cleanName.includes("we tv") || cleanName.includes("wetv"))
      return "/wetv.png";
    if (cleanName.includes("viu")) return "/viu.png";
    if (cleanName.includes("prime video")) return "/primevideo.png";
    if (cleanName.includes("disney")) return "/disney.png";
    if (cleanName.includes("bstation")) return "/bstation.png";
    if (cleanName.includes("canva")) return "/canva.png";
    if (cleanName.includes("capcut")) return "/capcut.png";
    if (cleanName.includes("picsart")) return "/picsart.png";
    if (cleanName.includes("alight motion")) return "/am.png";

    // 5. KATEGORI PLN
    if (cleanName.includes("pln")) return "/pln.png";

    return "";
  };

  // ✅ 3. Ambil data produk secara dinamis HANYA untuk kategori yang sedang aktif saat ini
  const currentCategoryData =
    productsData[activeCategory as keyof typeof productsData];
  const productList = currentCategoryData?.products || [];

  // Filter produk berdasarkan ketikan di kolom pencarian dashboard
  const filteredProducts = productList.filter((product) =>
    product.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-[#070B14] text-white px-4 md:px-8 py-6">
      {/* Tombol Kembali & Judul Dashboard Utama */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-gray-800/60 hover:bg-gray-700/80 rounded-xl transition group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
              Dashboard <span className="text-yellow-400">Semua Layanan</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Pilih kategori dan jenis layanan top up kamu
            </p>
          </div>
        </div>

        {/* Kolom Pencarian / Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Cari di ${activeCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111625] border border-gray-800 focus:border-yellow-400 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Menu Navigasi Pemisah Kategori (Tabs Internal Dashboard) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-800/50">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id); // Merubah state global di page.tsx sekaligus mengubah keaktifan navbar
                setSearchQuery("");
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition ${
                isActive
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/10 font-bold"
                  : "bg-[#111625] text-gray-400 hover:text-white border border-gray-800/60"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid List Layanan yang Ditampilkan */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredProducts.map((product, index) => {
            const imgUrl = getProductImage(product);

            return (
              <button
                key={index}
                // MODIFIKASI: Sekarang ikut melemparkan imgUrl saat fungsi diklik!
                onClick={() => onSelectProduct(product, activeCategory, imgUrl)}
                className="flex flex-col items-center bg-[#111625] border border-gray-800/40 hover:border-yellow-400/60 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                {/* Tempat Ikon Gambar/Logo */}
                <div className="w-16 h-16 rounded-2xl bg-gray-900/50 flex items-center justify-center overflow-hidden mb-4 border border-gray-800 group-hover:border-yellow-400/30 transition shadow-inner">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={product}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      onError={(e) => {
                        // Jika gambar gagal dimuat (404), dia akan memunculkan logo default/cadangan elangshop kamu
                        e.currentTarget.style.display = "none";
                        const sibling = e.currentTarget.nextElementSibling;
                        if (sibling) sibling.classList.remove("hidden");
                      }}
                    />
                  ) : null}

                  {/* Ikon Pengganti bawaan jika gambar lokal .png belum tersedia */}
                  <div
                    className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${imgUrl ? "hidden" : ""}`}
                  >
                    {activeCategory === "PLN" ? (
                      <Zap className="w-6 h-6 text-gray-500 group-hover:text-yellow-400 transition" />
                    ) : (
                      <Gamepad2 className="w-6 h-6 text-gray-500 group-hover:text-yellow-400 transition" />
                    )}
                  </div>
                </div>

                {/* Nama Produk */}
                <span className="text-sm font-semibold text-center text-gray-200 group-hover:text-yellow-400 transition line-clamp-2 px-1">
                  {product}
                </span>

                {/* Badge Kategori */}
                <span className="text-[10px] text-gray-500 mt-1 font-medium bg-gray-900/30 px-2 py-0.5 rounded-full">
                  {activeCategory}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Tampilan jika ketikan pencarian tidak ketemu */
        <div className="flex flex-col items-center justify-center py-20 bg-[#111625]/30 rounded-2xl border border-gray-800/40">
          {activeCategory === "PLN" ? (
            <Zap className="w-12 h-12 text-gray-600 mb-3 stroke-[1.5]" />
          ) : (
            <Gamepad2 className="w-12 h-12 text-gray-600 mb-3 stroke-[1.5]" />
          )}
          <p className="text-gray-400 text-sm">
            Layanan "{searchQuery || activeCategory}" tidak ditemukan
          </p>
        </div>
      )}
    </div>
  );
}
