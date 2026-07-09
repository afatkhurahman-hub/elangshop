"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, AlertTriangle, LogOut, User } from "lucide-react";
import { supabase } from "@/supabaseClient";
import Link from "next/link";
// 🚀 UPDATE: Import useRouter dari next/navigation untuk navigasi URL rute halaman
import { useRouter } from "next/navigation";

// 1. Interface Props tetap dipertahankan
interface NavbarProps {
  onCategorySelect?: (categoryName: string) => void;
  activeCategory?: string;
  onSearchChange?: (query: string) => void; // Untuk sinkronisasi pencarian jika digunakan di parent
}

export default function Navbar({
  onCategorySelect,
  activeCategory,
  onSearchChange,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // State baru untuk manajemen session user dari Supabase
  const [user, setUser] = useState<any>(null);

  // State untuk mengontrol kemunculan pop-up kustom "fitur sedang dikembangkan"
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  // 🚀 UPDATE: Inisialisasi router Next.js
  const router = useRouter();

  // Ambil dan pantau session login user
  useEffect(() => {
    // 1. Dapatkan user aktif saat pertama kali navbar dimuat
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // 2. Pasang listener untuk mendeteksi perubahan auth (Login/Logout) secara real-time
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fungsi penanganan keluar akun (Logout)
  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Apakah Anda yakin ingin keluar dari ELANGSHOP?",
    );
    if (confirmLogout) {
      await supabase.auth.signOut();
      alert("Berhasil keluar akun!");
    }
  };

  // Mapping Menu Display dengan ID Kategori data asli kamu
  // 🚀 UPDATE: Tambahkan properti slug pada tiap objek menu untuk alamat URL-nya
  const menuList = [
    { name: "Beranda", id: "home", slug: "/" },
    { name: "Game", id: "Game", slug: "/game" },
    { name: "Pulsa", id: "Pulsa", slug: "/pulsa" },
    { name: "Paket Data", id: "PaketData", slug: "/paketdata" },
    { name: "E-Wallet", id: "E-Wallet", slug: "/e-wallet" },
    { name: "Aplikasi Premium", id: "Premium", slug: "/premium" },
    { name: "PLN", id: "PLN", slug: "/pln" },
    { name: "Promo", id: "Promo", slug: "#promo-section" },
  ];

  // Tentukan menu mana yang aktif berdasarkan prop dari parent page.tsx
  const currentActiveMenu =
    menuList.find((m) => m.id === activeCategory)?.name || "Beranda";

  // 🚀 UPDATE: Tambahkan parameter `slug` di dalam fungsi klik
  const handleMenuClick = (menuName: string, menuId: string, slug?: string) => {
    setIsMobileMenuOpen(false);

    // Jika user mengklik Beranda
    if (menuId === "home") {
      router.push("/"); // 🚀 Pindahkan halaman ke Home
      window.dispatchEvent(new Event("openHomeView"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Jika user mengklik Promo
    if (menuId === "Promo") {
      const promoElement = document.getElementById("promo-section");
      if (promoElement) {
        promoElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // 🚀 UPDATE: Arahkan URL browser sesuai halaman kategori yang diklik
    if (slug) {
      router.push(slug);
    }

    // Untuk kategori produk
    if (onCategorySelect) {
      onCategorySelect(menuId);
    }
  };

  // Fungsi saat mengetik di pencarian
  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#070B14]/90 backdrop-blur-xl w-full">
      {/* Container Utama */}
      <div className="max-w-[1400px] mx-auto px-6 h-[76px] xl:h-[84px] flex items-center justify-between gap-4">
        {/* ========================== LOGO ========================== */}
        <button
          onClick={() => handleMenuClick("Beranda", "home", "/")}
          className="flex items-center gap-2 shrink-0 group outline-none text-left active:scale-[0.98] transition-transform"
        >
          <img
            src="/logo.png"
            alt="ELANGSHOP Logo"
            className="w-8 h-8 xl:w-9 xl:h-9 object-contain shrink-0 group-hover:brightness-110 transition-all"
          />
          <h1 className="text-[16px] sm:text-[17px] xl:text-[19px] font-black leading-none whitespace-nowrap tracking-wider select-none">
            <span className="text-white group-hover:text-gray-200 transition-colors">
              ELANG
            </span>
            <span className="text-[#FACC15] group-hover:text-yellow-300 transition-colors">
              SHOP
            </span>
          </h1>
        </button>

        {/* BARISAN MENU DESKTOP */}
        <div className="hidden xl:flex items-center gap-8 text-[13px] font-bold whitespace-nowrap h-full pt-1">
          {menuList.map((menu) => {
            const isActive = currentActiveMenu === menu.name;
            return (
              <button
                key={menu.id}
                onClick={() => handleMenuClick(menu.name, menu.id, menu.slug)} // 🚀 UPDATE: Oper properti menu.slug ke fungsi klik
                className={`relative h-full flex items-center justify-center transition-all pb-1 tracking-wide ${
                  isActive ? "text-[#FACC15]" : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{menu.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2.5px] bg-[#FACC15] rounded-full shadow-[0_0_8px_#FACC15]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ========================== SEARCH BAR DESKTOP ========================== */}
        <div className="hidden xl:flex items-center justify-between w-[180px] h-[42px] bg-[#121A2E] border border-white/10 rounded-xl px-3 group focus-within:border-[#FACC15]/40 transition-all shrink-0">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            className="bg-transparent outline-none text-xs w-full placeholder:text-gray-500 text-white pr-1"
          />
          <Search
            size={14}
            className="text-gray-500 group-focus-within:text-[#FACC15] transition-colors shrink-0"
          />
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsDevModalOpen(true)}
            className="hidden xl:flex h-[42px] px-4 items-center justify-center rounded-xl border border-white/10 hover:border-[#FACC15]/30 hover:bg-white/5 transition text-xs font-bold text-gray-300 hover:text-white whitespace-nowrap"
          >
            Cek Transaksi
          </button>

          {/* KONDISIONAL USER INTERFACE: SUDAH LOGIN VS BELUM LOGIN */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* Tampilan Ringkas Info User */}
              <div className="hidden sm:flex flex-col items-end px-2">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  Member
                </span>
                <span className="text-xs font-bold text-gray-200 max-w-[120px] truncate">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
              </div>
              {/* Tombol Logout */}
              <button
                onClick={handleLogout}
                className="h-[38px] xl:h-[42px] px-3 sm:px-4 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 transition text-xs font-bold text-red-400 flex items-center gap-1.5"
                title="Keluar Akun"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          ) : (
            <>
              {/* Tombol Login mengarah ke page /auth (tab default Masuk) */}
              <Link
                href="/auth"
                className="h-[38px] xl:h-[42px] px-4 rounded-xl border border-white/10 hover:border-[#FACC15]/30 hover:bg-white/5 transition text-xs font-bold text-gray-200 hover:text-white flex items-center justify-center whitespace-nowrap"
              >
                Login
              </Link>

              {/* Tombol Daftar mengarah ke page /auth (bisa dialihkan via state/query param jika dikembangkan lanjut) */}
              <Link
                href="/auth"
                className="h-[38px] xl:h-[42px] px-4 rounded-xl bg-[#FACC15] text-black font-extrabold hover:bg-[#EAB308] transition text-xs flex items-center justify-center whitespace-nowrap shadow-lg shadow-[#FACC15]/5 active:scale-[0.97]"
              >
                Daftar
              </Link>
            </>
          )}

          {/* TOGGLE BUTTON FOR MOBILE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden flex h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] items-center justify-center rounded-xl border border-white/10 text-white hover:border-[#FACC15]/30 transition"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* TAMPILAN MENU MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#070B14] border-b border-white/5 px-6 py-5 space-y-4 animate-fade-in">
          {/* Search Bar Mobile */}
          <div className="flex items-center justify-between w-full h-[42px] bg-[#121A2E] border border-white/10 rounded-xl px-3">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              className="bg-transparent outline-none text-xs w-full placeholder:text-gray-500 text-white pr-1"
            />
            <Search size={14} className="text-gray-500" />
          </div>

          <hr className="border-white/5" />

          {/* List Menu Mobile */}
          <div className="flex flex-col gap-1">
            {menuList.map((menu) => {
              const isActive = currentActiveMenu === menu.name;
              return (
                <button
                  key={menu.id}
                  onClick={() => handleMenuClick(menu.name, menu.id, menu.slug)} // 🚀 UPDATE: Oper properti menu.slug ke fungsi klik mobile
                  className={`w-full text-left py-3 px-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#FACC15]/10 text-[#FACC15]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {menu.name}
                </button>
              );
            })}
          </div>

          <hr className="border-white/5" />

          {/* Tombol Cek Transaksi Mobile */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsDevModalOpen(true);
            }}
            className="w-full h-[42px] flex items-center justify-center rounded-xl border border-white/10 text-xs font-bold text-gray-300 hover:text-white"
          >
            Cek Transaksi
          </button>
        </div>
      )}

      {/* ========================== POP-UP MODAL SESUAI REFERENSI GAMBAR ========================== */}
      {isDevModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          {/* Box Utama Dialog Pop-up */}
          <div className="w-full max-w-[400px] bg-[#0c1324] border border-gray-800/60 p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center">
            {/* Sisi Atas: Lingkaran Segitiga Warning */}
            <div className="w-14 h-14 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>

            {/* Sisi Tengah: Teks Pengingat */}
            <h3 className="text-white text-lg font-bold tracking-wide mb-2">
              Fitur Dalam Pengembangan
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed px-2 mb-6">
              Maaf, fitur ini masih belum tersedia dan dalam tahap pengerjaan.
              Silakan coba lagi nanti secara berkala.
            </p>

            {/* Sisi Bawah: Aksi Tombol Konfirmasi Bersanding */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => setIsDevModalOpen(false)}
                className="h-11 rounded-xl border border-gray-800 bg-[#111726] hover:bg-white/5 text-gray-300 hover:text-white font-bold text-xs transition"
              >
                Kembali
              </button>
              <button
                onClick={() => setIsDevModalOpen(false)}
                className="h-11 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-black font-extrabold text-xs transition active:scale-[0.98] shadow-lg shadow-[#FACC15]/5"
              >
                Ya, Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
