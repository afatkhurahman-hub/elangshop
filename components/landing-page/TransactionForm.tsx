"use client";

import { useState, useEffect } from "react";
import { Zap, ShieldCheck, ArrowLeft } from "lucide-react";
import { productsData } from "@/components/landing-page/productsData";
import { supabase } from "@/supabaseClient"; 

interface TransactionFormProps {
  product: {
    title: string;
    category: string;
    image?: string;
    sub?: string; 
  };
  onBack: () => void;
}

export default function TransactionForm({
  product,
  onBack,
}: TransactionFormProps) {
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedNominal, setSelectedNominal] = useState<string | null>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Ambil status login user saat halaman dimuat (hanya untuk logika potongan harga tampilan UI)
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user); 
    };
    checkUser();
  }, []);

  const getProductNominals = (): any[] => {
    if (!product || !product.title) return [];
    const targetCategory = product.category || "Game";
    const categoryData =
      productsData[targetCategory as keyof typeof productsData];
    if (!categoryData || !categoryData.items) return [];

    const cleanProductTitle = product.title.toLowerCase().trim();
    const foundKey = Object.keys(categoryData.items).find((key) => {
      const lowerKey = key.toLowerCase().trim();
      return (
        cleanProductTitle === lowerKey ||
        cleanProductTitle.includes(lowerKey) ||
        lowerKey.includes(cleanProductTitle)
      );
    });
    return foundKey ? (categoryData.items as any)[foundKey] : [];
  };

  const currentNominals = getProductNominals();

  // LOGIKA AUTO-KLIK NOMINAL DARI PRODUK POPULER
  useEffect(() => {
    if (product?.sub && currentNominals.length > 0) {
      const autoSelectTarget = currentNominals.find(
        (item: any, index: number) => {
          const itemLabel = (item.label || item.name || "")
            .toLowerCase()
            .trim();
          const incomingSub = product.sub!.toLowerCase().trim();
          return itemLabel === incomingSub;
        },
      );

      if (autoSelectTarget) {
        const targetId =
          autoSelectTarget.id ||
          autoSelectTarget.label ||
          autoSelectTarget.name;
        setSelectedNominal(targetId);
      }
    }
  }, [product?.title, product?.sub, currentNominals]);

  // Reset Pilihan Form saat Produk Berganti
  useEffect(() => {
    if (!product?.sub) {
      setSelectedNominal(null);
    }
    setUserId("");
    setZoneId("");
    setNickname("");
    setShowNotice(false);
  }, [product?.title]);

  // LOGIKA DETEKSI PRODUK & KATEGORI
  const titleLower = product.title?.toLowerCase() || "";
  const categoryLower = product.category?.toLowerCase() || "";

  const isMLBB = titleLower.includes("mobile legends");
  const isGenshin = titleLower.includes("genshin");
  const isHSR = titleLower.includes("honkai star rail");

  const isPremiumApp =
    categoryLower === "aplikasi premium" || categoryLower === "premium";
  const butuhServer = isMLBB || isGenshin || isHSR;
  const butuhNickname =
    titleLower.includes("free fire") || titleLower.includes("pubg") || isMLBB;

  // Label Step 1 Dinamis
  const getStepOneTitle = (): string => {
    if (isPremiumApp) return "Masukkan Alamat Email";
    if (categoryLower === "pulsa" || categoryLower === "paket data")
      return "Masukkan Nomor HP";
    if (titleLower.includes("pln"))
      return "Masukkan Nomor Meter / ID Pelanggan";
    return "Masukkan ID Akun";
  };

  // Placeholder Input Dinamis
  const getInputPlaceholder = (): string => {
    if (isPremiumApp) return "Masukkan Email Anda (Contoh: user@email.com)";
    if (isMLBB) return "Masukkan User ID";
    if (isGenshin || isHSR) return "Masukkan UID Akun";
    if (titleLower.includes("free fire")) return "Masukkan Player ID";
    if (titleLower.includes("pubg")) return "Masukkan Character ID";
    if (categoryLower === "pulsa" || categoryLower === "paket data")
      return "Masukkan Nomor HP";
    if (titleLower.includes("pln"))
      return "Masukkan Nomor Meter / ID Pelanggan";
    return "Masukkan ID Akun / Nomor HP";
  };

  // Label untuk Tabel Konfirmasi Ringkasan
  const getLabelIdType = (): string => {
    if (isPremiumApp) return "Email";
    if (categoryLower === "pulsa" || categoryLower === "paket data")
      return "No. HP";
    if (titleLower.includes("pln")) return "No. Meter / ID";
    return "ID Akun";
  };

  const handleValidateAndOpenNotice = () => {
    if (!userId || !selectedNominal) return;
    if (butuhServer && !zoneId) return;
    setShowNotice(true);
  };

  const targetNominalObj = currentNominals.find((item, index) => {
    const itemId =
      item.id || item.label || (item as any).name || `nominal-${index}`;
    return itemId === selectedNominal;
  });

  const nominalName = targetNominalObj
    ? targetNominalObj.label || (targetNominalObj as any).name || "Paket"
    : "Produk";

  // LOGIKA PERHITUNGAN HARGA POTONGAN PROMO MEMBER
  const getCalculatedPrice = () => {
    if (!targetNominalObj || !targetNominalObj.price) return "-";
    
    const rawPrice = parseInt(targetNominalObj.price.replace(/[^0-9]/g, ""), 10) || 0;
    
    if (isLoggedIn) {
      const promoPrice = rawPrice - 2500; 
      return "Rp " + promoPrice.toLocaleString("id-ID");
    }
    
    return targetNominalObj.price; 
  };

  const nominalPrice = getCalculatedPrice();

  // INTEGRASI SUPABASE & INTEGRASI WHATSAPP OTOMATIS
  const handleOrderWhatsApp = async () => {
    if (loading) return;
    setLoading(true);

    // 1. Membuat Invoice ID acak unik
    const invoiceId = `ELG-${Math.floor(100000 + Math.random() * 900000)}`;

    // 2. Membersihkan format harga menjadi murni integer
    let cleanPrice = 0;
    if (nominalPrice && nominalPrice !== "-") {
      cleanPrice = parseInt(String(nominalPrice).replace(/[^0-9]/g, ""), 10) || 0;
    }

    // Identifikasi data tujuan akun untuk format chat WA
    let accountData = userId;
    if (butuhServer) accountData = `${userId} (${zoneId})`;

    // 3. LOGIKA SORTIR OTOMATIS 3 JALUR BERDASARKAN PRODUK & INPUT USER
    let savedEmail = "-";
    let savedWhatsapp = "-";
    let savedTargetId = "-";

    if (categoryLower.includes("premium") || categoryLower.includes("aplikasi") || userId.includes("@")) {
      savedEmail = userId;
    } else if (
      titleLower.includes("dana") || titleLower.includes("gopay") || 
      titleLower.includes("ovo") || titleLower.includes("linkaja") || 
      categoryLower.includes("pulsa") || categoryLower.includes("paket data")
    ) {
      savedWhatsapp = userId;
    } else {
      savedTargetId = accountData; 
    }

    try {
      // 4. 🚀 Memanggil fungsi database (RPC v3) yang bersih tanpa field user_id
      const { error } = await supabase
        .rpc('insert_transaction_v3', {
          p_id: invoiceId,
          p_email: savedEmail,
          p_whatsapp: savedWhatsapp,
          p_total_price: cleanPrice,
          p_status: "PENDING",
          p_target_id: savedTargetId
        });

      if (error) {
        alert("Gagal mencatat transaksi ke database: " + error.message);
        setLoading(false);
        return;
      }

      // 5. Susun pesan template WhatsApp
      let message =
        `Halo ELANGSHOP 🦅,\n\n` +
        `Saya ingin memesan produk dengan detail berikut:\n\n` +
        `🧾 *Nomor Invoice:* ${invoiceId}\n` +
        `📦 Layanan: *${product.title}*\n` +
        `📝 ${getLabelIdType()}: *${accountData}*\n`;

      if (butuhNickname && nickname) {
        message += `👤 Nickname: *${nickname}*\n`;
      }

      message +=
        `💎 Paket: *${nominalName}*\n` +
        `💵 Total Harga: *${nominalPrice}*\n\n` +
        `Saya akan segera melakukan transfer pembayaran dan mengirimkan buktinya di sini. Mohon diproses ya min!`;

      // 6. Buka WhatsApp admin
      window.open(
        `https://wa.me/6281931194133?text=${encodeURIComponent(message)}`,
        "_blank",
      );
      
      setShowNotice(false);
    } catch (err) {
      alert("Terjadi masalah koneksi ke server database.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    !userId || !selectedNominal || (butuhServer && !zoneId) || loading;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 group transition-colors"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PANEL KIRI */}
        <div className="lg:col-span-1 bg-[#111625] border border-white/5 rounded-2xl p-6 h-fit">
          <div className="w-32 h-32 bg-[#070B14] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden font-black text-3xl text-[#FACC15] mb-6 shadow-md relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallbackText = e.currentTarget.nextElementSibling;
                  if (fallbackText) fallbackText.classList.remove("hidden");
                }}
              />
            ) : null}

            <span
              className={`text-3xl font-black text-[#FACC15] ${product.image ? "hidden" : ""}`}
            >
              {product.title ? product.title.substring(0, 2).toUpperCase() : "ES"}
            </span>
          </div>

          <h2 className="text-2xl font-black text-white mb-2">{product.title}</h2>

          <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-[#FACC15] text-xs font-bold px-3 py-1 rounded-full mb-6 border border-[#FACC15]/20">
            <ShieldCheck size={14} />
            Layanan Resmi & Terpercaya
          </div>

          <div className="text-sm text-gray-400 space-y-4 leading-relaxed font-normal">
            {isPremiumApp ? (
              <>
                <p>
                  Nikmati hiburan tanpa batas dan fitur premium tanpa gangguan iklan!
                  <strong className="text-white"> ELANGSHOP</strong> menyediakan layanan berlangganan akun
                  <span className="text-[#FACC15] font-semibold"> {product.title}</span> dengan proses yang super praktis, legal, dan aman 100%.
                </p>
              </>
            ) : categoryLower === "pulsa" || categoryLower === "paket data" ? (
              <>
                <p>
                  Jangan biarkan komunikasi dan internetanmu terputus di tengah jalan! Isi ulang pulsa atau kuota data{" "}
                  <strong className="text-white">{product.title}</strong> kamu sekarang juga di
                  <span className="text-[#FACC15] font-semibold"> ELANGSHOP</span> dengan harga agen yang jauh lebih hemat.
                </p>
              </>
            ) : titleLower.includes("pln") ? (
              <>
                <p>
                  Token listrik di rumah sudah berbunyi? Jangan panik! Top up token PLN atau bayar tagihan listrik Anda secara instan melalui
                  <strong className="text-white"> ELANGSHOP</strong> tanpa biaya admin yang mencekik.
                </p>
              </>
            ) : (
              <>
                <p>
                  Mau mabar makin percaya diri dengan skin dan item terbaru?
                  <strong className="text-white"> ELANGSHOP</strong> adalah solusi terbaik untuk top up
                  <span className="text-[#FACC15] font-semibold"> {product.title}</span> legal, aman, dan termurah di Indonesia.
                </p>
              </>
            )}
          </div>
        </div>

        {/* PANEL KANAN */}
        <div className="lg:col-span-2 space-y-6">
          {/* STEP 1 */}
          <div className="bg-[#111625] border border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-[#FACC15] text-black font-extrabold flex items-center justify-center text-sm shadow-sm">
                1
              </span>
              <h3 className="text-base font-bold text-white tracking-wide">
                {getStepOneTitle()}
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type={isPremiumApp ? "email" : "text"}
                    placeholder={getInputPlaceholder()}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full h-12 bg-[#070B14] border border-white/10 focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/30 rounded-xl px-4 text-sm outline-none transition text-white placeholder:text-gray-600 font-medium"
                  />
                </div>

                {butuhServer && (
                  <div className="w-full sm:w-[200px]">
                    <input
                      type="text"
                      placeholder={isMLBB ? "( Zone ID )" : "Pilih Server"}
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="w-full h-12 bg-[#070B14] border border-white/10 focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/30 rounded-xl px-4 text-sm text-center outline-none transition text-white placeholder:text-gray-600 font-medium"
                    />
                  </div>
                )}
              </div>

              {butuhNickname && (
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Masukkan Nickname Karakter (Opsional)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full h-12 bg-[#070B14] border border-white/10 focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/30 rounded-xl px-4 text-sm outline-none transition text-white placeholder:text-gray-600 font-medium"
                  />
                </div>
              )}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-[#111625] border border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#FACC15] text-black font-extrabold flex items-center justify-center text-sm shadow-sm">
                  2
                </span>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Pilih Nominal Top Up
                </h3>
              </div>
              
              {isLoggedIn ? (
                <span className="text-xs bg-green-500/10 text-green-400 font-bold px-3 py-1 rounded-md border border-green-500/20 animate-pulse">
                  🎉 Akun Member Aktif: Potongan Rp 2.500 Berhasil Diterapkan!
                </span>
              ) : (
                <span className="text-xs bg-blue-500/10 text-blue-400 font-bold px-3 py-1 rounded-md border border-blue-500/20">
                  💡 Mau Hemat Rp 2.500 tiap transaksi? Yuk Login / Register dulu!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {currentNominals.map((item, index) => {
                const itemId = item.id || item.label || (item as any).name || `nominal-${index}`;
                const isSelected = selectedNominal === itemId;
                const displayName = item.label || (item as any).name;

                const itemRawPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
                const promoPriceCalculated = "Rp " + (itemRawPrice - 2500).toLocaleString("id-ID");

                return (
                  <button
                    key={itemId}
                    type="button"
                    onClick={() => setSelectedNominal(itemId)}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[115px] group ${
                      isSelected
                        ? "bg-[#FACC15]/10 border-[#FACC15] shadow-[0_0_15px_rgba(250,204,21,0.08)]"
                        : "bg-[#070B14] border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="pt-2">
                      <p className={`text-xs font-black tracking-wide transition-colors ${isSelected ? "text-[#FACC15]" : "text-gray-300 group-hover:text-white"}`}>
                        {displayName}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-[10px] text-gray-500 font-semibold leading-none mb-1">Harga</p>
                      {isLoggedIn ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-black text-[#FACC15]">{promoPriceCalculated}</span>
                          <span className="text-[11px] text-gray-500 line-through font-bold">{item.price}</span>
                        </div>
                      ) : (
                        <p className="text-sm font-black text-white">{item.price}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              disabled={isButtonDisabled}
              onClick={handleValidateAndOpenNotice}
              className="flex-1 h-[46px] rounded-xl bg-[#FACC15] text-black font-extrabold text-[13px] hover:bg-[#EAB308] disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none transition shadow-lg active:scale-[0.98]"
            >
              {loading ? "Memproses..." : "Beli Sekarang"}
            </button>
            <button
              type="button"
              disabled={isButtonDisabled}
              onClick={handleValidateAndOpenNotice}
              className="w-[46px] h-[46px] rounded-xl bg-[#121A2E] disabled:bg-gray-800 disabled:text-gray-600 border border-white/10 flex items-center justify-center hover:border-[#FACC15]/30 transition group active:scale-[0.98] shrink-0"
            >
              <Zap
                className={`${isButtonDisabled ? "text-gray-600 fill-none" : "text-[#FACC15] fill-[#FACC15]/20 group-hover:scale-110"} transition`}
                size={16}
              />
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showNotice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091426] border border-[#FACC15]/30 w-full max-w-[450px] rounded-[24px] p-6 shadow-2xl">
            <div className="w-12 h-12 bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] rounded-full flex items-center justify-center mb-4 mx-auto text-xl">⚠️</div>
            <h3 className="text-white font-bold text-center text-[16px] mb-4">Konfirmasi Pengisian Data</h3>

            <div className="border border-white/10 rounded-xl overflow-hidden mb-6 text-sm">
              <div className="grid grid-cols-3 border-b border-white/5 bg-white/5 p-3">
                <span className="text-gray-400 font-medium">Layanan</span>
                <span className="col-span-2 text-white font-bold text-right">{product.title}</span>
              </div>

              <div className="grid grid-cols-3 border-b border-white/5 p-3">
                <span className="text-gray-400 font-medium">{getLabelIdType()}</span>
                <span className="col-span-2 text-[#FACC15] font-mono font-bold text-right tracking-wider break-all">{userId}</span>
              </div>

              {butuhServer && (
                <div className="grid grid-cols-3 border-b border-white/5 p-3">
                  <span className="text-gray-400 font-medium">Zone / Server</span>
                  <span className="col-span-2 text-white font-bold text-right">{zoneId}</span>
                </div>
              )}

              {butuhNickname && (
                <div className="grid grid-cols-3 border-b border-white/5 p-3">
                  <span className="text-gray-400 font-medium">Nickname</span>
                  <span className="col-span-2 text-cyan-400 font-bold text-right">{nickname || "-"}</span>
                </div>
              )}

              <div className="grid grid-cols-3 border-b border-white/5 p-3">
                <span className="text-gray-400 font-medium">Nominal</span>
                <span className="col-span-2 text-white font-bold text-right">{nominalName}</span>
              </div>

              <div className="grid grid-cols-3 bg-[#FACC15]/5 p-3">
                <span className="text-gray-400 font-medium">Harga</span>
                <span className="col-span-2 text-[#FACC15] font-black text-right text-base">{nominalPrice}</span>
              </div>
            </div>

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
                disabled={loading}
                onClick={handleOrderWhatsApp}
                className="h-[46px] bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold text-[13px] rounded-xl transition shadow-md shadow-[#FACC15]/10 flex items-center justify-center"
              >
                {loading ? "Menyimpan..." : "Ya, Sudah Benar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}