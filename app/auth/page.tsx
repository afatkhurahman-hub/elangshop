"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // PROSES LOGIN
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Login Gagal: " + error.message);
      } else {
        alert("Selamat Datang Kembali di ELANGSHOP!");
        router.push("/"); // Kembali ke Beranda
      }
    } else {
      // PROSES DAFTAR (REGISTER)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) {
        alert("Pendaftaran Gagal: " + error.message);
      } else {
        alert("Pendaftaran Berhasil! Silakan cek email untuk verifikasi (jika diaktifkan).");
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050B18] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Efek Cahaya Latar Belakang */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-[450px] z-10">
        {/* LOGO & TITLE */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="logo" className="w-10" />
            <h1 className="text-2xl font-black tracking-tighter">
              <span className="text-white">ELANG</span>
              <span className="text-yellow-400">SHOP</span>
            </h1>
          </Link>
          <p className="text-gray-400 text-sm">
            {isLogin ? "Masuk ke akun untuk transaksi lebih cepat" : "Daftar akun baru ElangShop sekarang"}
          </p>
        </div>

        {/* CARD FORM (Glassmorphism) */}
        <div className="bg-[#091426]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-2xl">
          {/* TAB SWITCHER */}
          <div className="flex bg-[#050B18] p-1 rounded-2xl mb-8 border border-white/5">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isLogin ? "bg-yellow-400 text-black shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                !isLogin ? "bg-yellow-400 text-black shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Contoh: Alif Fatkhurahman"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0B172B] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:border-yellow-400/50 outline-none transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Alamat Email</label>
              <input
                type="email"
                placeholder="email@anda.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B172B] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:border-yellow-400/50 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B172B] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:border-yellow-400/50 outline-none transition-all"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <Link href="/auth/forgot-password">
                  <span className="text-xs text-yellow-400/80 hover:text-yellow-400 transition cursor-pointer">
                    Lupa Password?
                  </span>
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-800 disabled:cursor-not-allowed text-black font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-yellow-400/10 active:scale-[0.98] mt-4"
            >
              {loading ? "Memproses..." : isLogin ? "MASUK SEKARANG" : "BUAT AKUN GRATIS"}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs">
              Dengan masuk, Anda menyetujui <span className="text-gray-300 underline cursor-pointer">Syarat & Ketentuan</span> kami.
            </p>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition flex items-center justify-center gap-2">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}