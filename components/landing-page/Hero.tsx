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

const plnConfig = {
  products: ["PLN Token", "PLN Pascabayar"],
  inputPlaceholder: "Masukkan No Meter / ID Pel",
  inputType: "text",
  items: {
    "PLN Token": [
      { label: "Token PLN Rp 20.000", price: "Rp 21.500" },
      { label: "Token PLN Rp 50.000", price: "Rp 51.500" },
      { label: "Token PLN Rp 100.000", price: "Rp 101.500" },
      { label: "Token PLN Rp 200.000", price: "Rp 201.500" },
    ],
    "PLN Pascabayar": [
      { label: "Cek & Bayar Tagihan", price: "Sesuai Tagihan" },
    ],
  },
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Game");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [userId, setUserId] = useState("");
  const [currentPrice, setCurrentPrice] = useState("Rp 0");
  const [showNotice, setShowNotice] = useState(false);

  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isOpenItem, setIsOpenItem] = useState(false);

  const productRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const isPLN =
    activeTab.toLowerCase() === "pln" ||
    activeTab.toLowerCase().includes("listrik");

  const matchedKey =
    Object.keys(productsData).find(
      (k) =>
        k.toLowerCase() === activeTab.toLowerCase() ||
        activeTab.toLowerCase().includes(k.toLowerCase()),
    ) || "Game";

  const currentConfig = isPLN
    ? plnConfig
    : productsData[matchedKey as keyof typeof productsData];

  const scrollToForm = () => {
    const formElement = document.getElementById("transaction-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCardClick = (targetTab: string) => {
    setActiveTab(targetTab);
    setTimeout(() => {
      scrollToForm();
    }, 50);
  };

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        productRef.current &&
        !productRef.current.contains(event.target as Node)
      ) {
        setIsOpenProduct(false);
      }
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsOpenItem(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler Tab dari Navbar
  useEffect(() => {
    const handleNavbarTabChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const targetTabName = customEvent.detail;

      if (!targetTabName) return;

      const foundKey = Object.keys(productsData).find(
        (k) =>
          k.toLowerCase() === targetTabName.toLowerCase() ||
          targetTabName.toLowerCase().includes(k.toLowerCase()),
      );

      if (foundKey) {
        setActiveTab(foundKey);
      } else if (
        targetTabName.toLowerCase().includes("pln") ||
        targetTabName.toLowerCase().includes("listrik")
      ) {
        setActiveTab("PLN");
      }

      scrollToForm();
    };

    window.addEventListener("changeTabFromNavbar", handleNavbarTabChange);
    return () => {
      window.removeEventListener("changeTabFromNavbar", handleNavbarTabChange);
    };
  }, []);

  // SINKRONISASI GLOBAL (Ketika card game di klik luar/halaman produk dipilih)
  useEffect(() => {
    const handleSelectProductGlobal = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (!customEvent.detail) return;

      const clickedProductTitle =
        typeof customEvent.detail === "object"
          ? customEvent.detail.title
          : customEvent.detail;
      const clickedProductSub =
        typeof customEvent.detail === "object" ? customEvent.detail.sub : "";

      let foundTab = "";
      let foundProduct = "";

      for (const tabKey of Object.keys(productsData)) {
        const config = productsData[tabKey as keyof typeof productsData];
        if (config && Array.isArray(config.products)) {
          const matched = config.products.find(
            (p) =>
              typeof p === "string" &&
              p.toLowerCase() === clickedProductTitle?.toLowerCase(),
          );

          if (matched) {
            foundTab = tabKey;
            foundProduct = matched;
            break;
          }
        }
      }

      // Jika tidak ketemu di database biasa, cek PLN kustom
      if (
        !foundProduct &&
        (clickedProductTitle?.toLowerCase().includes("pln") ||
          clickedProductTitle?.toLowerCase().includes("listrik"))
      ) {
        foundTab = "PLN";
        foundProduct =
          plnConfig.products.find(
            (p) => p.toLowerCase() === clickedProductTitle.toLowerCase(),
          ) || plnConfig.products[0];
      }

      if (foundTab && foundProduct) {
        setActiveTab(foundTab);
        setSelectedProduct(foundProduct);

        const config =
          foundTab === "PLN"
            ? plnConfig
            : productsData[foundTab as keyof typeof productsData];
        const availableItems = (config?.items as any)?.[foundProduct] || [];

        const matchedItem = availableItems.find((item: any) =>
          item.label
            .toLowerCase()
            .includes(clickedProductSub.toString().toLowerCase()),
        );

        if (matchedItem) {
          setSelectedItem(matchedItem.label);
          setCurrentPrice(matchedItem.price);
        } else if (availableItems.length > 0) {
          setSelectedItem(availableItems[0].label);
          setCurrentPrice(availableItems[0].price);
        }
      }
    };

    window.addEventListener("selectProduct", handleSelectProductGlobal);
    return () => {
      window.removeEventListener("selectProduct", handleSelectProductGlobal);
    };
  }, []);

  useEffect(() => {
    setUserId("");
  }, [activeTab]);

  // Efek pengkondisian urutan abjad & reset produk saat tab berganti
  useEffect(() => {
    if (currentConfig?.products && currentConfig.products.length > 0) {
      const sortedProducts = [...currentConfig.products].sort((a, b) =>
        a.localeCompare(b),
      );
      if (!currentConfig.products.includes(selectedProduct)) {
        setSelectedProduct(sortedProducts[0]);
      }
    } else {
      setSelectedProduct("");
    }
  }, [activeTab, currentConfig]);

  // REAKTIF SINKRONISASI HARGA: Menjamin harga langsung ter-update saat produk atau item berubah
  useEffect(() => {
    if (currentConfig && selectedProduct) {
      const availableItems =
        (currentConfig.items as any)[selectedProduct] || [];
      if (Array.isArray(availableItems) && availableItems.length > 0) {
        const matched = availableItems.find((i) => i.label === selectedItem);
        if (matched) {
          setCurrentPrice(matched.price);
        } else {
          // Jika tidak ada item yang terpilih saat ini, fallback ke index ke-0
          setSelectedItem(availableItems[0].label);
          setCurrentPrice(availableItems[0].price);
        }
      } else {
        setSelectedItem("");
        setCurrentPrice("Rp 0");
      }
    } else {
      setSelectedItem("");
      setCurrentPrice("Rp 0");
    }
  }, [selectedProduct, selectedItem, currentConfig]);

  const handleItemSelect = (itemName: string) => {
    setSelectedItem(itemName);
    setIsOpenItem(false);
  };

  const handleValidateAndOpenNotice = () => {
    if (!userId.trim()) {
      alert(`Silakan isi ${getDynamicPlaceholder()} Anda terlebih dahulu!`);
      return;
    }
    setShowNotice(true);
  };

  const handleOrderWhatsApp = () => {
    setShowNotice(false);

    const nomorWA = "6281931194133";
    const pesanTeks =
      `Halo MinEls, saya mau order top up:\n\n` +
      `• *Kategori* : ${activeTab}\n` +
      `• *Pilihan Produk* : ${selectedProduct}\n` +
      `• *Nominal Paket* : ${selectedItem}\n` +
      `• *User ID / No* : ${userId}\n` +
      `• *Total Harga* : ${currentPrice}\n\n` +
      `Mohon dibantu instruksi pembayarannya ya!`;

    const linkWhatsApp = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanTeks)}`;
    window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
  };

  const currentItems = (currentConfig?.items as any)?.[selectedProduct] || [];

  const getDynamicPlaceholder = () => {
    const config = currentConfig as any;
    const tab = activeTab.toLowerCase();

    if (tab.includes("pln") || tab.includes("listrik")) {
      return "Masukkan No Meter / ID Pel";
    }
    if (tab.includes("game")) {
      if (config?.placeholders) {
        return config.placeholders[selectedProduct] || "Masukkan ID Game";
      }
      return config?.inputPlaceholder || "Masukkan ID Game";
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

  const getProductImage = (productName: string) => {
    if (!productName) return "/logo.png";
    const name = productName.toLowerCase();

    if (name.includes("mobile legends")) return "/ml.png";
    if (name.includes("free fire")) return "/ff.png";
    if (name.includes("pubg")) return "/pubgg.png";
    if (name.includes("call of duty") || name.includes("cod"))
      return "/cod.png";
    if (name.includes("valorant")) return "/valorantt.png";
    if (name.includes("aov")) return "/aov.png";
    if (name.includes("genshin")) return "/gi.png";
    if (name.includes("clash of clans") || name.includes("coc"))
      return "/coc.png";
    if (name.includes("honor of kings") || name.includes("hok"))
      return "/hok.png";
    if (name.includes("point blank") || name.includes("pb")) return "/pb.png";
    if (name.includes("roblox")) return "/roblox.png";
    if (name.includes("honkai star rail") || name.includes("honkai"))
      return "/hsr.png";
    if (name.includes("steam")) return "/steam.png";

    if (name.includes("dana")) return "/dana1.png";
    if (name.includes("gopay")) return "/gopay1.png";
    if (name.includes("ovo")) return "/ovo.png";
    if (name.includes("shopee")) return "/shoppepay1.png";

    if (name.includes("netflix")) return "/netflix.png";
    if (name.includes("youtube") || name.includes("ytb")) return "/ytbprem.png";
    if (name.includes("spotify")) return "/spotifyy.png";
    if (name.includes("vidio")) return "/vidio.png";
    if (name.includes("we tv") || name.includes("wetv")) return "/wetv.png";
    if (name.includes("viu")) return "/viu.png";
    if (name.includes("disney")) return "/disney.png";
    if (name.includes("bstation")) return "/bstation.png";
    if (name.includes("canva")) return "/canva.png";
    if (name.includes("capcut")) return "/capcut.png";
    if (name.includes("picsart")) return "/picsart.png";
    if (name.includes("alight motion") || name.includes("am")) return "/am.png";
    if (name.includes("primevideo")) return "/primevideo.png";

    if (name.includes("telkomsel")) return "/telkomsel.png";
    if (name.includes("indosat")) return "/indosat.png";
    if (name.includes("xl")) return "/xl.png";
    if (name.includes("axis")) return "/axis.png";
    if (name.includes("smartfren")) return "/smartfren.png";
    if (name.includes("tri") || name.startsWith("3")) return "/3.png";
    if (name.includes("by.u") || name.includes("byu")) return "/byu.png";

    if (name.includes("pln")) return "/pln.png";

    return "/logo.png";
  };

  const activeProductImg = getProductImage(selectedProduct);

  const renderSecureLogo = () => {
    if (activeProductImg !== "/logo.png") {
      return (
        <img
          src={activeProductImg}
          alt={selectedProduct}
          className="absolute left-3 w-5 h-5 rounded-md object-cover z-10 pointer-events-none"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      );
    }

    const name = selectedProduct.toLowerCase();
    if (
      name.includes("pln") ||
      name.includes("token") ||
      name.includes("listrik")
    ) {
      return <Bolt className="absolute left-3 text-yellow-400 w-5 h-5 z-10" />;
    }
    if (activeTab.toLowerCase().includes("game")) {
      return (
        <Gamepad2 className="absolute left-3 text-blue-400 w-5 h-5 z-10" />
      );
    }
    if (activeTab.toLowerCase().includes("wallet")) {
      return (
        <Wallet className="absolute left-3 text-emerald-400 w-5 h-5 z-10" />
      );
    }
    if (
      activeTab.toLowerCase().includes("pulsa") ||
      activeTab.toLowerCase().includes("data")
    ) {
      return (
        <Smartphone className="absolute left-3 text-purple-400 w-5 h-5 z-10" />
      );
    }

    return <Crown className="absolute left-3 text-[#FACC15] w-5 h-5 z-10" />;
  };

  return (
    <>
      <section className="relative px-4 sm:px-10 lg:px-16 pt-14 pb-8 lg:pt-12 lg:pb-10 overflow-hidden text-white bg-[#070B14] flex flex-col justify-start">
        <div className="absolute inset-0 z-0 pointer-events-none select-none flex justify-center lg:justify-start items-center lg:left-[28%] xl:left-[30%]">
          <img
            src="/hero-banner.png"
            alt="Mankels Elang"
            className="w-[70%] max-w-[340px] md:max-w-[420px] lg:max-w-[390px] object-contain opacity-[0.15] lg:opacity-[0.45] transition-all"
          />
        </div>

        <div className="max-w-[1300px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center relative z-10 mt-2 lg:mt-4">
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start relative z-20">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
              <Zap size={11} className="text-blue-400 fill-blue-400/20" />
              <span className="text-[9px] sm:text-[10px] font-bold text-blue-400 tracking-wider">
                TOP UP CEPAT & AMAN
              </span>
            </div>

            <h1 className="text-[28px] sm:text-[34px] lg:text-[36px] xl:text-[38px] leading-[1.2] font-black tracking-tight drop-shadow-xl">
              Top Up Cepat,
              <br />
              <span className="text-[#FACC15]">Harga Hemat,</span>
              <br />
              <span className="text-white">Transaksi Anti Ribet!</span>
            </h1>

            <p className="text-gray-400 text-[12px] sm:text-[13px] leading-relaxed max-w-[420px]">
              ElangShop platform top up game, pulsa, data, e-wallet, PLN dan
              aplikasi premium murah, cepat dan terpercaya.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-white w-full">
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
                  title: "Aman Terpercaya",
                  desc: "100% transaksi aman",
                  icon: ShieldCheck,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-left justify-center sm:justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1A2438]/60 border border-white/5 flex items-center justify-center shrink-0">
                    <item.icon size={12} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[11.5px] text-gray-200">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM ISIAN TRANSAKSI */}
          <div
            id="transaction-form"
            className="lg:col-span-6 w-full flex justify-center lg:justify-end relative z-20"
          >
            <div className="w-full max-w-[520px] bg-[#0B1220]/80 border border-white/10 rounded-[24px] p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4 gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {[
                  "Game",
                  "Pulsa",
                  "Paket Data",
                  "E-Wallet",
                  "Premium",
                  "PLN",
                ].map((item) => {
                  const isActive =
                    activeTab.toLowerCase() === item.toLowerCase() ||
                    item.toLowerCase().includes(activeTab.toLowerCase());
                  return (
                    <button
                      key={item}
                      onClick={() => setActiveTab(item)}
                      className="relative pb-2 shrink-0 transition"
                    >
                      <span
                        className={`text-[12.5px] font-bold tracking-wide transition-colors ${
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
                })}
              </div>

              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5 relative" ref={productRef}>
                    <label className="text-[10px] font-bold text-gray-400 tracking-wide block uppercase">
                      {activeTab.toLowerCase().includes("premium")
                        ? "Pilih Aplikasi"
                        : activeTab.toLowerCase().includes("pulsa") ||
                            activeTab.toLowerCase().includes("data")
                          ? "Pilih Operator"
                          : activeTab.toLowerCase().includes("pln")
                            ? "Jenis Layanan"
                            : "Pilih Game"}
                    </label>
                    <div className="relative flex items-center">
                      {renderSecureLogo()}
                      <div
                        onClick={() => setIsOpenProduct(!isOpenProduct)}
                        className="w-full h-[46px] bg-[#121A2E] border border-white/10 rounded-xl pl-10 pr-11 flex items-center text-[12.5px] font-semibold text-white cursor-pointer select-none justify-between transition"
                      >
                        <span className="truncate">
                          {selectedProduct || "Pilih..."}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`absolute right-4 text-gray-400 pointer-events-none transition-transform ${isOpenProduct ? "rotate-180" : ""}`}
                        />
                      </div>

                      {isOpenProduct && (
                        <div className="absolute top-[52px] left-0 w-full max-h-[220px] bg-[#0E1628] border border-white/10 rounded-xl overflow-y-auto z-50 shadow-2xl custom-scrollbar">
                          {[...(currentConfig?.products || [])]
                            .sort((a, b) => a.localeCompare(b))
                            .map((prod) => (
                              <div
                                key={prod}
                                onClick={() => {
                                  setSelectedProduct(prod);
                                  setIsOpenProduct(false);
                                }}
                                className={`px-4 py-2.5 text-[12.5px] font-medium cursor-pointer transition-colors text-gray-200 hover:bg-[#1A2438] hover:text-[#FACC15] ${selectedProduct === prod ? "bg-[#1A2438] text-[#FACC15]" : ""}`}
                              >
                                {prod}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 relative" ref={itemRef}>
                    <label className="text-[10px] font-bold text-gray-400 tracking-wide block uppercase">
                      {activeTab.toLowerCase().includes("pulsa")
                        ? "Pilih Pulsa"
                        : activeTab.toLowerCase().includes("data")
                          ? "Pilih Paket"
                          : "Pilih Nominal"}
                    </label>
                    <div className="relative flex items-center">
                      <div
                        onClick={() => setIsOpenItem(!isOpenItem)}
                        className="w-full h-[46px] bg-[#121A2E] border border-white/10 rounded-xl px-4 pr-11 flex items-center text-[12.5px] font-semibold text-white cursor-pointer select-none justify-between transition"
                      >
                        <span className="truncate">
                          {selectedItem || "Pilih..."}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`absolute right-4 text-gray-400 pointer-events-none transition-transform ${isOpenItem ? "rotate-180" : ""}`}
                        />
                      </div>

                      {isOpenItem && (
                        <div className="absolute top-[52px] left-0 w-full max-h-[220px] bg-[#0E1628] border border-white/10 rounded-xl overflow-y-auto z-50 shadow-2xl custom-scrollbar">
                          {Array.isArray(currentItems) &&
                            currentItems.map((item: any) => (
                              <div
                                key={item.label}
                                onClick={() => handleItemSelect(item.label)}
                                className={`px-4 py-2.5 text-[12.5px] font-medium cursor-pointer transition-colors text-gray-200 hover:bg-[#1A2438] hover:text-[#FACC15] ${selectedItem === item.label ? "bg-[#1A2438] text-[#FACC15]" : ""}`}
                              >
                                {item.label}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 tracking-wide block uppercase">
                      {getDynamicPlaceholder()}
                    </label>
                    <input
                      type="text"
                      placeholder={getDynamicPlaceholder()}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full h-[46px] bg-[#121A2E] border border-white/10 rounded-xl px-4 text-[12.5px] outline-none placeholder:text-gray-500 text-white focus:border-[#FACC15]/40 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 tracking-wide block uppercase">
                      Harga
                    </label>
                    <div className="w-full h-[46px] bg-[#121A2E] border border-white/10 rounded-xl px-4 flex items-center justify-end">
                      <span className="font-extrabold text-[16px] text-[#FACC15] tracking-wide">
                        {currentPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleValidateAndOpenNotice}
                    className="flex-1 h-[46px] rounded-xl bg-[#FACC15] text-black font-extrabold text-[13px] hover:bg-[#EAB308] transition shadow-lg shadow-[#FACC15]/10 active:scale-[0.98]"
                  >
                    Beli Sekarang
                  </button>
                  <button
                    onClick={handleValidateAndOpenNotice}
                    className="w-[46px] h-[46px] rounded-xl bg-[#121A2E] border border-white/10 flex items-center justify-center hover:border-[#FACC15]/30 transition group active:scale-[0.98] shrink-0"
                  >
                    <Zap
                      className="text-[#FACC15] group-hover:scale-110 transition fill-[#FACC15]/20"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOWER ROW CATEGORIES */}
      <section className="px-4 sm:px-10 lg:px-16 pb-12 text-white bg-[#070B14]">
        <div className="max-w-[1300px] mx-auto bg-[#0B1220]/40 border border-white/5 rounded-[24px] p-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
          {[
            {
              icon: Smartphone,
              title: "Top Up Pulsa",
              desc: "Semua Operator",
              targetTab: "Pulsa",
              iconBg: "bg-blue-500/10",
              iconColor: "text-blue-400",
            },
            {
              icon: Wifi,
              title: "Top Up Data",
              desc: "Paket Internet",
              targetTab: "Paket Data",
              iconBg: "bg-emerald-500/10",
              iconColor: "text-emerald-400",
            },
            {
              icon: Wallet,
              title: "Top Up E-Wallet",
              desc: "Dana, OVO, GoPay",
              targetTab: "E-Wallet",
              iconBg: "bg-cyan-500/10",
              iconColor: "text-cyan-400",
            },
            {
              icon: Crown,
              title: "Aplikasi Premium",
              desc: "Spotify, Netflix, dll",
              targetTab: "Premium",
              iconBg: "bg-purple-500/10",
              iconColor: "text-purple-400",
            },
            {
              icon: Gamepad2,
              title: "Top Up Game",
              desc: "MLBB, FF, PUBG, dll",
              targetTab: "Game",
              iconBg: "bg-amber-500/10",
              iconColor: "text-amber-400",
            },
            {
              icon: Bolt,
              title: "Listrik PLN",
              desc: "Token & Pascabayar",
              targetTab: "PLN",
              iconBg: "bg-yellow-500/10",
              iconColor: "text-yellow-400",
            },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.targetTab)}
              className="flex items-center gap-3 w-[47%] sm:w-[31%] lg:w-auto flex-1 p-2 rounded-xl hover:bg-white/[0.02] transition-all cursor-pointer group select-none"
            >
              <div
                className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 transition`}
              >
                <item.icon className={item.iconColor} size={18} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-[12.5px] text-gray-200 leading-tight group-hover:text-[#FACC15] transition-colors whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div id="promo-section" className="scroll-mt-28" />

      {/* CONFIRMATION MODAL */}
      {showNotice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091426] border border-[#FACC15]/30 w-full max-w-[400px] rounded-[24px] p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] rounded-full flex items-center justify-center mb-4 mx-auto text-xl">
              ⚠️
            </div>
            <h3 className="text-white font-bold text-[16px] mb-2">
              Konfirmasi Pengisian Data
            </h3>
            <p className="text-gray-400 text-[12.5px] leading-relaxed mb-6">
              Pastikan pengisian data sudah benar. Kesalahan pengisian merupakan
              tanggung jawab anda.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowNotice(false)}
                className="h-[46px] bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-[13px] rounded-xl transition"
              >
                Tidak, Edit Lagi
              </button>
              <button
                type="button"
                onClick={handleOrderWhatsApp}
                className="h-[46px] bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold text-[13px] rounded-xl transition shadow-md shadow-[#FACC15]/10"
              >
                Ya, Sudah Benar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
