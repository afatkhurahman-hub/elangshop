"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient"; // ⚠️ JIKA ERROR, ganti jadi: import { supabase } from "../../supabaseClient" atau sesuaikan path file config lu
import Link from "next/link";

interface Transaction {
  id: string;
  email: string;
  total_price: number;
  status: string;
  created_at: string;
}

export default function CheckTransactionPage() {
  const [invoiceId, setInvoiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [txData, setTxData] = useState<Transaction | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setTxData(null);

    // Mengambil data dari tabel transactions di Supabase berdasarkan ID Invoice yang diketik
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", invoiceId.trim().toUpperCase()) // otomatis diubah jadi HURUF BESAR biar gak typo
      .single();

    if (error || !data) {
      setErrorMsg(
        "Nomor Invoice tidak ditemukan. Periksa kembali penulisan Anda.",
      );
    } else {
      setTxData(data);
    }
    setLoading(false);
  };

  // Pengaturan warna status biar estetik sesuai tema Elangshop
  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
      case "DIPROSES":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      case "SELESAI":
        return "bg-green-400/10 text-green-400 border-green-400/20";
      case "BATAL":
        return "bg-red-400/10 text-red-400 border-red-400/20";
      default:
        return "bg-gray-400/10 text-gray-400 border-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#050B18] flex items-center justify-center p-6 relative overflow-hidden text-white">
      {/* Efek lampu neon kuning khas Elangshop */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-[480px] z-10">
        <div className="bg-[#091426]/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-2xl">
          <h2 className="text-xl font-black text-center mb-6 tracking-tight">
            TRACKING PESANAN <span className="text-yellow-400">ELANGSHOP</span>{" "}
            🦅
          </h2>

          <form onSubmit={handleCheck} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Masukkan Nomor Invoice Anda
              </label>
              <input
                type="text"
                placeholder="Contoh: ELG-123456"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                required
                className="w-full bg-[#0B172B] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:border-yellow-400/50 outline-none transition-all text-center font-mono uppercase tracking-wider"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-800 text-black font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-yellow-400/10 active:scale-[0.98]"
            >
              {loading ? "Mencari data..." : "PERIKSA STATUS PESANAN"}
            </button>
          </form>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center font-medium">
              {errorMsg}
            </div>
          )}

          {txData && (
            <div className="bg-[#0B172B] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-gray-400 font-bold uppercase">
                  ID Invoice
                </span>
                <span className="font-mono text-yellow-400 font-bold tracking-wider">
                  {txData.id}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-xs text-gray-400 font-bold uppercase">
                  Total Belanja
                </span>
                <span className="font-extrabold text-white">
                  Rp {txData.total_price.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-gray-400 font-bold uppercase">
                  Status
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-wider ${getStatusStyle(txData.status)}`}
                >
                  {txData.status}
                </span>
              </div>

              {txData.status.toUpperCase() === "PENDING" && (
                <p className="text-[11px] text-gray-500 text-center pt-2 italic leading-relaxed">
                  *Silakan kirim bukti transfer ke WhatsApp admin. Pesanan akan
                  diproses maksimal 1x24 jam setelah dana masuk.
                </p>
              )}
            </div>
          )}

          <div className="text-center mt-6 pt-4 border-t border-white/5">
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-xs transition"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
