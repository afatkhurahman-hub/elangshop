import { supabase } from "@/supabaseClient"; // Sesuaikan path config Supabase lu

export default function CheckoutButton({ totalHarga, userEmail, noWaUser }: any) {
  
  const handleBeliViaWhatsApp = async () => {
    // 1. Generate nomor invoice acak (Contoh hasil: ELG-482910)
    const invoiceId = `ELG-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 2. Insert data pesanan ke tabel Supabase
      const { error } = await supabase
        .from("transactions")
        .insert([
          { 
            id: invoiceId, // Ini alasan kenapa kolom id wajib tipe text
            email: userEmail, 
            whatsapp: noWaUser, 
            total_price: totalHarga, // Kirim nominal total belanja (angka murni)
            status: "PENDING" // Otomatis terbaca, tapi amannya kita deklarasikan
          }
        ]);

      if (error) {
        alert("Gagal membuat pesanan: " + error.message);
        return;
      }

      // 3. Jika sukses simpan ke Supabase, buat teks otomatis untuk WA
      const nomorAdminWA = "628193119133"; // ⚠️ GANTI pake nomor WA toko lu (Awali dengan 628, jangan pakai 08)
      const pesanOtomatis = `Halo ELANGSHOP 🦅,\n\nSaya ingin memesan produk dengan detail berikut:\n• *Nomor Invoice:* ${invoiceId}\n• *Total Pembayaran:* Rp ${totalHarga.toLocaleString("id-ID")}\n\nSaya akan segera transfer dan mengirimkan bukti bayarnya di sini. Mohon diproses ya min!`;

      // 4. Lempar user ke tab WhatsApp baru
      window.open(`https://wa.me/${nomorAdminWA}?text=${encodeURIComponent(pesanOtomatis)}`, "_blank");

    } catch (err) {
      alert("Terjadi kesalahan koneksi database.");
    }
  };

  return (
    <button 
      onClick={handleBeliViaWhatsApp}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/10"
    >
      💬 BELI SEKARANG VIA WHATSAPP
    </button>
  );
}