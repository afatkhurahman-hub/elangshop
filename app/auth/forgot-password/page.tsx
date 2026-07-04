"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Membuat link reset manual mengarah ke halaman update-password kustom kamu
    const generatedManualLink = `${window.location.origin}/auth/update-password?email=${encodeURIComponent(email)}`;
    
    try {
      // 🚀 MENEMBAK API NEXT.JS (BYPASS SUPABASE RATE LIMIT)
      const res = await fetch("/api/send-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetLink: generatedManualLink }),
      });
      
      const resData = await res.json();
      
      if (resData.error) {
        alert("Gagal kirim email via Resend: " + resData.error);
      } else {
        setMessage("Email reset password telah dikirim! Silakan cek kotak masuk email AMIKOM Anda.");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B18] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-[450px] z-10">
        <div className="bg-[#091426]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-2xl">
          <h2 className="text-xl font-black text-white text-center mb-6 tracking-tight">
            LUPA PASSWORD <span className="text-yellow-400">ELANGSHOP</span> 🦅
          </h2>

          {message ? (
            <div className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 p-4 rounded-xl text-sm text-center font-medium">
              {message}
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Masukkan Alamat Email Anda 
                </label>
                <input 
                  type="email" 
                  placeholder="a.fatkhurahman@students.amikom.ac.id" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0B172B] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:border-yellow-400/50 outline-none transition-all"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-800 text-black font-black py-4 rounded-2xl transition-all duration-300"
              >
                {loading ? "Memproses..." : "KIRIM LINK RESET"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}