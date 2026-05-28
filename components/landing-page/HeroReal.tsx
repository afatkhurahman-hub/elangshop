"use client";

import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Wallet,
  ShieldCheck,
  Smartphone,
  Wifi,
  Crown,
  Gamepad2,
  Bolt,
  ChevronDown,
} from "lucide-react";
import { productsData } from "./productsData";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Game");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [currentPrice, setCurrentPrice] = useState("Rp 0");

  // State untuk kontrol custom dropdown produk/operator
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const matchedKey =
    Object.keys(productsData).find(
      (k) => k.toLowerCase() === activeTab.toLowerCase(),
    ) || "Game";

  const currentConfig = productsData[matchedKey as keyof typeof productsData];

  // Menutup dropdown saat klik di luar komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleSelectProductGlobal = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const clickedProductTitle = customEvent.detail;

      if (!clickedProductTitle) return;

      let foundTab = "";
      let foundProduct = "";

      for (const tabKey in productsData) {
        const config = productsData[tabKey as keyof typeof productsData];
        if (config && Array.isArray(config.products)) {
          const matched = config.products.find(
            (p) => p.toLowerCase() === clickedProductTitle.toLowerCase(),
          );
          if (matched) {
            foundTab = tabKey;
            foundProduct = matched;
            break;
          }
        }
      }

      if (foundTab && foundProduct) {
        setActiveTab(foundTab);
        setSelectedProduct(foundProduct);
      }
    };

    window.addEventListener("selectProduct", handleSelectProductGlobal);
    return () => {
      window.removeEventListener("selectProduct", handleSelectProductGlobal);
    };
  }, []);

  useEffect(() => {
    if (
      currentConfig?.products &&
      !currentConfig.products.includes(selectedProduct)
    ) {
      if (currentConfig.products.length > 0) {
        setSelectedProduct(currentConfig.products[0]);
      }
    } else if (!currentConfig?.products) {
      setSelectedProduct("");
    }
  }, [activeTab, currentConfig, selectedProduct]);

  useEffect(() => {
    if (currentConfig && selectedProduct) {
      const availableItems =
        (currentConfig.items as any)[selectedProduct] || [];
      if (Array.isArray(availableItems) && availableItems.length > 0) {
        setSelectedItem(availableItems[0].label);
        setCurrentPrice(availableItems[0].price);
      } else {
        setSelectedItem("");
        setCurrentPrice("Rp 0");
      }
    } else {
      setSelectedItem("");
      setCurrentPrice("Rp 0");
    }
  }, [selectedProduct, activeTab, currentConfig]);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemName = e.target.value;
    setSelectedItem(itemName);

    const availableItems =
      (currentConfig?.items as any)?.[selectedProduct] || [];
    if (Array.isArray(availableItems)) {
      const matched = availableItems.find((i: any) => i.label === itemName);
      if (matched) {
        setCurrentPrice(matched.price);
      }
    }
  };

  const currentItems = (currentConfig?.items as any)?.[selectedProduct] || [];

  // Mengambil data path icon dari config (mendukung format .icons objek atau fallback dinamis)
  const getProductIconPath = (productName: string) => {
    if (!productName) return "";
    const config = currentConfig as any;
    if (config?.icons && config.icons[productName]) {
      return config.icons[productName];
    }
    // Fallback: Mengubah "Mobile Legends" menjadi "/images/operators/mobile-legends.png" atau sejenisnya jika strukturnya statis
    return `/images/operators/${productName.toLowerCase().replace(/\s+/g, "-")}.png`;
  };

  const getDynamicPlaceholder = () => {
    const config = currentConfig as any;
    const tab = activeTab.toLowerCase();

    if (tab.includes("game")) {
      if (config?.placeholders) {
        return config.placeholders[selectedProduct] || "Masukkan ID";
      }
      return config?.inputPlaceholder || "Masukkan ID";
    }

    if (
      tab.includes("pulsa") ||
      tab.includes("data") ||
      tab.includes("internet")
    ) {
      return "Masukkan No HP";
    }

    if (tab.includes("wallet") || tab.includes("dompet")) {
      return "Masukkan No Akun / HP";
    }

    if (tab.includes("premium")) {
      return "Masukkan Email Akun";
    }

    return config?.inputPlaceholder || "Masukkan ID";
  };

  return (
    <>
      {/* SECTION CONTAINER */}
      <section className="relative px-6 sm:px-10 lg:px-16 pt-28 pb-16 overflow-hidden text-white bg-[#070B14]">
        {/* 🦅 MASKOT ELANG RAKSASA (Diperbesar secara aman dan presisi tanpa merusak layout) 🦅 */}
        <div className="absolute top-[50%] left-[50%] lg:left-[43%] xl:left-[41%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none mix-blend-screen hidden md:block">
          <img
            src="/hero-banner.png"
            alt="Elang Megah"
            className="w-[700px] lg:w-[850px] xl:w-[980px] h-auto object-contain max-w-none opacity-20 lg:opacity-85 transition-all duration-300"
          />
        </div>

        {/* UTILITY LAYOUT GRID */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              <Zap size={14} className="text-blue-400 fill-blue-400/20" />
              <span className="text-[11px] font-bold text-blue-400 tracking-wider">
                TOP UP CEPAT & AMAN
              </span>
            </div>

            {/* TEXT MAIN */}
            <h1 className="text-[36px] sm:text-[48px] xl:text-[54px] leading-[1.1] font-black tracking-tight drop-shadow-lg">
              Top Up Cepat,
              <br />
              <span className="text-[#FACC15]">Harga Hemat,</span>
              <br />
              <span className="text-white">Transaksi Anti Ribet!</span>
            </h1>

            <p className="text-gray-400 text-[15px] leading-relaxed max-w-[520px] mx-auto lg:mx-0">
              Top-up game, pulsa, e-wallet, dan aplikasi premium murah dengan
              pembayaran QRIS serta proses instan 24 jam aman, cepat, dan
              terpercaya.
            </p>

            {/* INFO BANNER HORIZONTAL */}
            <div className="pt-4 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-white">
              {[
                {
                  title: "Proses Instan",
                  desc: "Dalam hitungan detik",
                  icon: Zap,
                },
                {
                  title: "Harga Terbaik",
                  desc: "Lebih hemat setiap saat",
                  icon: Wallet,
                },
                {
                  title: "Aman & Terpercaya",
                  desc: "100% transaksi aman",
                  icon: ShieldCheck,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="w-11 h-11 rounded-full bg-[#1A2438]/50 border border-white/5 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-blue-400" />
                  </div>
                  <div className="whitespace-nowrap">
                    <h3 className="font-bold text-[13px] text-gray-200">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: TRANSACTION FORM */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[540px] bg-[#0B1220]/80 border border-white/10 rounded-[24px] p-6 backdrop-blur-xl shadow-2xl">
              {/* TAB SELECTION */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-6 gap-2 overflow-x-auto scrollbar-none">
                {["Game", "Pulsa", "Paket Data", "E-Wallet", "Premium"].map(
                  (item) => {
                    const isActive =
                      activeTab.toLowerCase() === item.toLowerCase();
                    return (
                      <button
                        key={item}
                        onClick={() => setActiveTab(item)}
                        className="relative pb-2 shrink-0 transition"
                      >
                        <span
                          className={`text-[12px] font-bold tracking-wide transition-colors ${
                            isActive
                              ? "text-[#FACC15]"
                              : "text-gray-500 hover:text-gray-400"
                          }`}
                        >
                          {item}
                        </span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FACC15] rounded-full shadow-[0_0_10px_#FACC15]" />
                        )}
                      </button>
                    );
                  },
                )}
              </div>

              {/* INPUT FIELDS */}
              <div className="space-y-5">
                {/* BARIS 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dropdown 1 (CUSTOM COMPONENT - Mampu merender ikon operator & game) */}
                  <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className="text-[11px] font-bold text-gray-400 tracking-wide block uppercase">
                      {(() => {
                        const tab = activeTab.toLowerCase();
                        if (tab.includes("premium")) return "Pilih Aplikasi";
                        if (tab.includes("pulsa") || tab.includes("data"))
                          return "Pilih Operator";
                        if (tab.includes("wallet")) return "Pilih E-Wallet";
                        return "Pilih Game";
                      })()}
                    </label>

                    {/* Tombol utama pemicu dropdown */}
                    <div
                      onClick={() =>
                        setIsProductDropdownOpen(!isProductDropdownOpen)
                      }
                      className="w-full h-[52px] bg-[#121A2E] border border-white/10 rounded-xl px-4 flex items-center justify-between text-[13px] font-semibold text-white cursor-pointer select-none hover:border-white/20 transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={getProductIconPath(selectedProduct)}
                          alt=""
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                          className="w-5 h-5 object-contain rounded"
                        />
                        <span>{selectedProduct || "Pilih..."}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${isProductDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </div>

                    {/* Menu list item dropdown saat terbuka */}
                    {isProductDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-full max-h-[240px] bg-[#0E1628] border border-white/10 rounded-xl overflow-y-auto z-50 shadow-2xl custom-scrollbar">
                        {currentConfig?.products?.map((prod) => (
                          <div
                            key={prod}
                            onClick={() => {
                              setSelectedProduct(prod);
                              setIsProductDropdownOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-gray-200 cursor-pointer hover:bg-[#121A2E] hover:text-[#FACC15] transition ${
                              selectedProduct === prod
                                ? "bg-[#121A2E] text-[#FACC15]"
                                : ""
                            }`}
                          >
                            <img
                              src={getProductIconPath(prod)}
                              alt=""
                              onError={(e) => {
                                (e.target as HTMLElement).style.display =
                                  "none";
                              }}
                              className="w-5 h-5 object-contain rounded"
                            />
                            <span>{prod}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dropdown 2 */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 tracking-wide block uppercase">
                      {activeTab.toLowerCase().includes("pulsa")
                        ? "Pilih Pulsa"
                        : activeTab.toLowerCase().includes("data")
                          ? "Pilih Paket"
                          : "Pilih Nominal"}
                    </label>
                    <select
                      value={selectedItem}
                      onChange={handleItemChange}
                      className="w-full h-[52px] bg-[#121A2E] border border-white/10 rounded-xl px-4 text-[13px] font-semibold outline-none text-white focus:border-[#FACC15]/40 cursor-pointer appearance-none transition"
                    >
                      {Array.isArray(currentItems) &&
                        currentItems.map((item: any) => (
                          <option
                            key={item.label}
                            value={item.label}
                            className="bg-[#0E1628]"
                          >
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* BARIS 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Input Text Field */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 tracking-wide block uppercase">
                      {getDynamicPlaceholder()}
                    </label>
                    <input
                      type={currentConfig?.inputType || "text"}
                      placeholder={getDynamicPlaceholder()}
                      className="w-full h-[52px] bg-[#121A2E] border border-white/10 rounded-xl px-4 text-[13px] outline-none placeholder:text-gray-500 text-white focus:border-[#FACC15]/40 transition"
                    />
                  </div>

                  {/* Harga */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 tracking-wide block uppercase">
                      Harga
                    </label>
                    <div className="w-full h-[52px] bg-[#121A2E] border border-white/10 rounded-xl px-4 flex items-center justify-end">
                      <span className="font-extrabold text-lg text-[#FACC15] tracking-wide">
                        {currentPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 h-[52px] rounded-xl bg-[#FACC15] text-black font-extrabold text-[14px] hover:bg-[#EAB308] transition shadow-lg shadow-[#FACC15]/10 active:scale-[0.98]">
                    Beli Sekarang
                  </button>
                  <button className="w-[52px] h-[52px] rounded-xl bg-[#121A2E] border border-white/10 flex items-center justify-center hover:border-[#FACC15]/30 transition group active:scale-[0.98]">
                    <Zap
                      className="text-[#FACC15] group-hover:scale-110 transition fill-[#FACC15]/20"
                      size={18}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOWER SECTION */}
      <section className="px-6 lg:px-16 pb-20 text-white bg-[#070B14]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: Smartphone, title: "Top Up Pulsa", desc: "Semua Operator" },
            { icon: Wifi, title: "Top Up Data", desc: "Paket Internet" },
            {
              icon: Wallet,
              title: "Top Up E-Wallet",
              desc: "Dana, OVO, GoPay, Shopeepay",
            },
            {
              icon: Crown,
              title: "Aplikasi Premium",
              desc: "Spotify, Netflix, YouTube, Vidio",
            },
            {
              icon: Gamepad2,
              title: "Top Up Game",
              desc: "MLBB, FF, PUBG, Valorant",
            },
            { icon: Bolt, title: "Listrik PLN", desc: "Token & Pascabayar" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#0B1220]/60 border border-white/5 rounded-[20px] p-5 hover:border-[#FACC15]/30 hover:bg-[#0B1220] transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#FACC15]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FACC15]/20 transition">
                  <item.icon className="text-[#FACC15]" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[14px] text-gray-100 leading-tight group-hover:text-[#FACC15] transition">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
