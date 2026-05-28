"use client";

import { useState } from "react";

// =========================================================================
// DATA JALUR INFORMASI & LEGALITAS (INTEGRITAS DOKUMEN & REPUTASI PLATFORM)
// =========================================================================

const faqs = [
  "Metode pembayaran apa saja yang tersedia?",
  "Kenapa transaksi saya pending?",
  "Apakah ada refund jika top up gagal?",
  "Jam berapa customer service aktif?",
  "Kenapa harus memilih ElangShop dibandingkan yang lain?",
];

const faqAnswers = [
  "Kami menyediakan berbagai metode pembayaran lengkap mulai dari QRIS (Dana, OVO, GoPay, ShopeePay), Transfer Bank (BCA, Mandiri, BNI, BRI), hingga Virtual Account yang diproses otomatis 24 jam.",
  "Transaksi pending biasanya terjadi karena adanya antrean sistem pada provider game atau gangguan pada mutasi e-wallet/bank. Silakan tunggu 5-10 menit atau hubungi CS WhatsApp jika belum masuk.",
  "Tentu saja! Jika sistem kami gagal memproses pesanan Anda karena kesalahan teknis, saldo atau uang Anda akan dikembalikan 100% tanpa potongan.",
  "Customer Service ElangShop aktif dan siap membantu kamu setiap hari selama 24 jam non-stop (24/7)!",
  "ElangShop menggunakan sistem integrasi otomatis 24/7 untuk setiap transaksi top up dan pembelian akun premium, didukung oleh jalur pembayaran legal serta layanan Customer Service yang responsif. Dengan sistem otomatis ini, kamu tidak perlu menunggu proses manual dari admin. Transaksi tetap berjalan meski tengah malam, prosesnya jauh lebih cepat dari toko konvensional, dan yang terpenting: biaya admin kami jauh lebih rendah sehingga harga akhirnya tetap wajar dan ramah di kantong. Kamu nggak perlu lagi stres nungguin saldo masuk saat lagi butuh-butuhnya. Mabar jalan terus, kerjaan tetap lancar, dan langganan aplikasi favorit jadi lebih hemat. Kamu mendapatkan kecepatan, kenyamanan, dan penghematan dalam satu tempat tanpa perlu takut akun bermasalah. Stop buang waktu dan uangmu! Klik link di bawah ini untuk Top Up Sekarang dan rasakan sensasi transaksi secepat kilat!",
];

const syaratKetentuan = {
  title: "⚖️ Syarat & Ketentuan Penggunaan",
  content:
    "Dengan bertransaksi di ElangShop, pembeli dianggap telah membaca, memahami, dan menyetujui semua aturan yang berlaku. Layanan ElangShop terbuka untuk umum, namun pastikan Anda menggunakan metode pembayaran milik sendiri atau atas izin orang tua.\n\n⚠️ Penting Sebelum Melakukan Transaksi! ⚠️\nPastikan ID Game, Server, atau Nomor HP sudah benar. Kesalahan input data adalah tanggung jawab pembeli. Setelah pengisian data selesai nanti akan muncul pop-up pengecekan. Klik Tidak jika ada yang salah ketik, klik Ya jika semua sudah benar. Semua produk digital yang sudah sukses diproses tidak bisa dibatalkan atau dikembalikan uangnya.",
};

const kebijakanPrivasi = {
  title: "🔒 Kebijakan Privasi Data Pengguna",
  content:
    "ElangShop berkomitmen penuh untuk menjaga keamanan privasi data diri Pembeli, Informasi transaksi seperti Nomor HP, ID Game, dan data riwayat pembelian Anda hanya digunakan secara internal untuk pelacakan terhadap status pemesanan serta riwayat kami tidak akan pernah membagikan data kepada pihak ketiga.",
};

const tentangKami = {
  title: "🚀 Tentang Kami — Profil Korporasi & Keunggulan ElangShop",
};

const socials = [
  { name: "ig", link: "https://instagram.com/elang.shopku" },
  { name: "fb", link: "https://facebook.com/alif.fnk393" },
  { name: "tt", link: "https://tiktok.com/@alif.fnk" },
  { name: "ytb", link: "https://youtube.com/@alif.fatkhurahmannk" },
];

const payments = [
  "qrisz",
  "bca",
  "mandiri",
  "bni",
  "dana",
  "ovo",
  "gopay",
  "shoppepay",
];

export default function FaqAndFooter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSyarat, setOpenSyarat] = useState(false);
  const [openPrivasi, setOpenPrivasi] = useState(false);
  const [openTentang, setOpenTentang] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleScrollToElement = (idElement: string, action?: () => void) => {
    if (idElement === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (action) action();

    setTimeout(() => {
      const element = document.getElementById(idElement);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
  };

  const handleProductMenuClick = (tabName: string) => {
    const event = new CustomEvent("changeTabFromNavbar", { detail: tabName });
    window.dispatchEvent(event);

    const formElement = document.getElementById("transaction-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="faq-section"
      className="px-6 pt-10 pb-6 bg-[#050B18] border-t border-white/10 scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* GRID PERTAMA: FAQ UTAMA DAN BANNER WHATSAPP */}
        <div className="grid xl:grid-cols-[2fr_1fr] gap-6 items-stretch">
          {/* BOX FAQ UTAMA (KIRI) */}
          <div className="bg-[#091426] border border-[#17304F] rounded-[24px] p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-[28px] font-black mb-6 text-white">
                Pertanyaan yang Sering Diajukan
              </h2>
              <div className="space-y-3">
                {faqs.map((item, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-[#0B172B] border border-white/10 rounded-[16px] overflow-hidden transition-all duration-300"
                    >
                      <div
                        onClick={() => toggleFaq(index)}
                        className={`px-5 h-[60px] flex items-center justify-between cursor-pointer select-none transition-colors ${
                          isOpen ? "bg-white/5" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <span
                          className={`text-[14px] font-medium transition-colors ${isOpen ? "text-yellow-400" : "text-gray-200"}`}
                        >
                          {item}
                        </span>
                        <span
                          className={`text-gray-400 text-xl font-bold transform transition-transform duration-300 ${isOpen ? "rotate-180 text-yellow-400" : ""}`}
                        >
                          ⌄
                        </span>
                      </div>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen
                            ? "max-h-[200px] border-t border-white/5"
                            : "max-h-0"
                        }`}
                      >
                        <div className="px-5 py-4 text-[13px] text-gray-400 leading-relaxed">
                          {faqAnswers[index]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BANNER WHATSAPP (KANAN) */}
          <div className="relative overflow-hidden rounded-[28px] border border-yellow-400/30 bg-gradient-to-br from-[#061530] via-[#0B1322] to-[#1B1B1B] p-7 flex flex-col justify-between h-full min-h-[290px]">
            <div className="absolute right-[-60px] top-[-50px] w-[280px] h-[280px] rounded-full bg-yellow-400/20 blur-[120px]" />
            <div className="absolute right-0 top-0 h-full w-[45%] bg-gradient-to-l from-yellow-400/10 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full w-full gap-4">
              <div className="max-w-[320px] flex flex-col justify-between h-full py-1">
                <div>
                  <h3 className="flex flex-col leading-[1.08] font-bold">
                    <span className="text-[56px] text-yellow-400 tracking-[-0.5px]">
                      Butuh Bantuan?
                    </span>
                    <span className="mt-2 text-[26px] text-yellow-400 tracking-[-0.5px]">
                      Hubungi CS Kami
                    </span>
                  </h3>
                  <p className="mt-4 max-w-[300px] text-[16px] leading-[1.6] text-gray-400">
                    Kami siap membantu 24/7 kapanpun kamu butuh.
                  </p>
                </div>
                <div>
                  <a
                    href="https://wa.me/6281931194133?text=Halo%20MinEls%2C%20saya%20butuh%20bantuan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex h-[50px] w-[210px] items-center justify-center gap-3 rounded-2xl border border-yellow-400/40 bg-[#0B1528]/80 backdrop-blur-xl font-semibold transition-all duration-300 hover:bg-yellow-400 hover:text-black active:scale-95 inline-flex text-white"
                  >
                    <img
                      src="/waa.png"
                      alt="wa"
                      className="h-7 w-7 object-contain"
                    />{" "}
                    Chat WhatsApp
                  </a>
                </div>
              </div>
              <div className="relative flex items-center justify-center pr-2 self-center md:self-end">
                <img
                  src="/cal.png"
                  alt="cs"
                  className="w-[190px] object-contain mix-blend-screen brightness-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ACCORDION STRIP LIST */}
        <div className="mt-6 space-y-4 w-full">
          {/* TABEL FULL BARIS: SYARAT & KETENTUAN */}
          <div
            id="tabel-syarat"
            className="w-full bg-[#091426] border border-[#17304F] rounded-[24px] p-1 overflow-hidden transition-all duration-300"
          >
            <div
              onClick={() => setOpenSyarat(!openSyarat)}
              className={`px-5 h-[64px] flex items-center justify-between cursor-pointer select-none transition-colors rounded-[20px] ${
                openSyarat ? "bg-white/5" : "hover:bg-white/[0.02]"
              }`}
            >
              <span
                className={`text-[14px] font-bold transition-colors ${openSyarat ? "text-yellow-400" : "text-gray-200"}`}
              >
                {syaratKetentuan.title}
              </span>
              <span
                className={`text-gray-400 text-xl font-bold transform transition-transform duration-300 ${openSyarat ? "rotate-180 text-yellow-400" : ""}`}
              >
                ⌄
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openSyarat ? "max-h-[250px] border-t border-white/5" : "max-h-0"
              }`}
            >
              <div className="px-6 py-5 text-[13px] text-gray-400 leading-relaxed bg-[#0B172B]">
                {syaratKetentuan.content}
              </div>
            </div>
          </div>

          {/* TABEL FULL BARIS: KEBIJAKAN PRIVASI */}
          <div
            id="tabel-privasi"
            className="w-full bg-[#091426] border border-[#17304F] rounded-[24px] p-1 overflow-hidden transition-all duration-300"
          >
            <div
              onClick={() => setOpenPrivasi(!openPrivasi)}
              className={`px-5 h-[64px] flex items-center justify-between cursor-pointer select-none transition-colors rounded-[20px] ${
                openPrivasi ? "bg-white/5" : "hover:bg-white/[0.02]"
              }`}
            >
              <span
                className={`text-[14px] font-bold transition-colors ${openPrivasi ? "text-yellow-400" : "text-gray-200"}`}
              >
                {kebijakanPrivasi.title}
              </span>
              <span
                className={`text-gray-400 text-xl font-bold transform transition-transform duration-300 ${openPrivasi ? "rotate-180 text-yellow-400" : ""}`}
              >
                ⌄
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openPrivasi ? "max-h-[250px] border-t border-white/5" : "max-h-0"
              }`}
            >
              <div className="px-6 py-5 text-[13px] text-gray-400 leading-relaxed bg-[#0B172B]">
                {kebijakanPrivasi.content}
              </div>
            </div>
          </div>

          {/* =========================================================================
              TABEL FULL BARIS BARU: TENTANG KAMI (MANTAP, PRESTISIUS & SANGAT MEYAKINKAN)
              ========================================================================= */}
          <div
            id="tabel-tentang"
            className="w-full bg-[#091426] border border-[#17304F] rounded-[24px] p-1 overflow-hidden transition-all duration-300 shadow-xl shadow-black/30"
          >
            <div
              onClick={() => setOpenTentang(!openTentang)}
              className={`px-5 h-[64px] flex items-center justify-between cursor-pointer select-none transition-colors rounded-[20px] ${
                openTentang ? "bg-white/5" : "hover:bg-white/[0.02]"
              }`}
            >
              <span
                className={`text-[14px] font-bold tracking-wide transition-colors ${openTentang ? "text-yellow-400" : "text-gray-200"}`}
              >
                {tentangKami.title}
              </span>
              <span
                className={`text-gray-400 text-xl font-bold transform transition-transform duration-300 ${openTentang ? "rotate-180 text-yellow-400" : ""}`}
              >
                ⌄
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openTentang ? "max-h-[1000px] border-t border-white/5" : "max-h-0"
              }`}
            >
              <div className="px-6 py-6 bg-[#0B172B] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <tbody>
                    <tr className="flex flex-col md:table-row border-b border-white/5 last:border-none py-4">
                      <td className="w-full md:w-1/4 text-yellow-400 font-extrabold text-[13px] uppercase tracking-wider pb-2 md:pb-0 md:pr-6 align-top">
                        Profil Perusahaan
                      </td>
                      <td className="w-full md:w-3/4 text-gray-300 text-[13px] leading-relaxed font-medium align-top">
                        <span className="text-white font-bold">ELANGSHOP</span> adalah platform penyedia layanan top up game, voucher digital, token PLN, e-wallet, paket data, serta lisensi aplikasi premium terdepan di Indonesia yang dikelola secara legal dan profesional. Didirikan dengan misi merevolusi industri transaksi virtual, kami hadir sebagai solusi mutakhir satu pintu (*one-stop solution*) yang menyajikan ekosistem transaksi instan, tanpa birokrasi manual, dan aman secara menyeluruh demi memenuhi ekspektasi jutaan gamers dan pengguna digital tanah air.
                      </td>
                    </tr>
                    <tr className="flex flex-col md:table-row border-b border-white/5 last:border-none py-4">
                      <td className="w-full md:w-1/4 text-yellow-400 font-extrabold text-[13px] uppercase tracking-wider pb-2 md:pb-0 md:pr-6 align-top">
                        Sejarah & Visi Pendirian
                      </td>
                      <td className="w-full md:w-3/4 text-gray-300 text-[13px] leading-relaxed font-medium align-top">
                        Didirikan di <span className="text-white font-bold">Sleman, Yogyakarta pada tanggal 17 Oktober 2020 oleh Lifskur</span>, platform ini lahir dari sebuah visi besar untuk menciptakan infrastruktur layanan top up yang ramah pengguna, berkecepatan tinggi, dan terjangkau secara finansial. Berawal dari keinginan kuat sang founder untuk mempermudah aksesibilitas produk digital yang bernilai guna tinggi, ELANGSHOP secara khusus dirancang untuk mendampingi kebutuhan para anak-anak, kalangan mahasiswa, pelaku industri kreatif, hingga masyarakat umum. Kami berkomitmen untuk terus fleksibel, tangguh beradaptasi, dan siap bersaing di garda terdepan industri layanan modern masa kini.
                      </td>
                    </tr>
                    <tr className="flex flex-col md:table-row border-b border-white/5 last:border-none py-4">
                      <td className="w-full md:w-1/4 text-yellow-400 font-extrabold text-[13px] uppercase tracking-wider pb-2 md:pb-0 md:pr-6 align-top">
                        Infrastruktur & Sistem
                      </td>
                      <td className="w-full md:w-3/4 text-gray-300 text-[13px] leading-relaxed font-medium align-top">
                        Seluruh alur pemesanan di platform kami digerakkan oleh <span className="text-white font-bold">Sistem Otomatisasi API Berkecepatan Tinggi (Instan 24/7)</span>. Kami menjamin saldo, voucher, ataupun layanan yang Anda beli langsung masuk dan terproses secara *real-time* dalam hitungan detik setelah pembayaran divalidasi, tanpa perlu menunggu persetujuan admin toko, sekalipun transaksi dilakukan pada jam dini hari.
                      </td>
                    </tr>
                    <tr className="flex flex-col md:table-row border-b border-white/5 last:border-none py-4">
                      <td className="w-full md:w-1/4 text-yellow-400 font-extrabold text-[13px] uppercase tracking-wider pb-2 md:pb-0 md:pr-6 align-top">
                        Komitmen Keamanan
                      </td>
                      <td className="w-full md:w-3/4 text-gray-300 text-[13px] leading-relaxed font-medium align-top">
                        Kami sangat menjunjung tinggi integritas akun para pelanggan. ELANGSHOP hanya menggunakan <span className="text-white font-bold">Jalur Supply Resmi (100% Legal & Kredibel)</span> langsung dari penerbit game dan distributor utama. Transaksi dijamin aman dari risiko *ban*, pembekuan akun, ataupun penipuan. Kepercayaan Anda merupakan aset paling berharga yang selalu kami proteksi secara ketat.
                      </td>
                    </tr>
                    <tr className="flex flex-col md:table-row border-b border-white/5 last:border-none py-4">
                      <td className="w-full md:w-1/4 text-yellow-400 font-extrabold text-[13px] uppercase tracking-wider pb-2 md:pb-0 md:pr-6 align-top">
                        Skalabilitas Harga
                      </td>
                      <td className="w-full md:w-3/4 text-gray-300 text-[13px] leading-relaxed font-medium align-top">
                        Melalui jaringan kemitraan strategis, kami berhasil memangkas margin biaya distribusi konvensional. Dampaknya, ELANGSHOP mampu menyuguhkan <span className="text-yellow-400 font-bold">Harga Kompetitif Termurah di Pasar</span> dengan struktur biaya admin yang sangat transparan dan ramah di kantong, memberikan efisiensi pengeluaran optimal bagi para pelanggan setia kami.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER AREA */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleScrollToElement("top")}
              >
                <img src="/logo.png" alt="logo" className="w-8" />
                <h1 className="text-[16px] font-black leading-none">
                  <span className="text-white">ELANG</span>
                  <span className="text-yellow-400">SHOP</span>
                </h1>
              </div>
              <p className="text-gray-400 text-[11px] leading-[2] mt-4 max-w-[190px]">
                Platform top up game, pulsa, e-wallet, data, dan aplikasi
                premium cepat, aman, dan terpercaya.
              </p>
              <div className="mt-4">
                <h3 className="text-white font-bold text-[15px] mb-2">
                  Ikuti Kami
                </h3>
                <div className="flex flex-wrap justify-start gap-x-4 gap-y-3 items-center">
                  {socials.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block transition hover:opacity-80 active:scale-95"
                    >
                      <img
                        src={`/${item.name}.png`}
                        alt={item.name}
                        className="h-6 object-contain brightness-110"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* SEKTOR PRODUK */}
            <div>
              <h3 className="text-white font-bold text-[13px] mb-4">Produk</h3>
              <div className="space-y-3 text-gray-400 text-[11px]">
                <p
                  onClick={() => handleProductMenuClick("Top Up Game")}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Top Up Game
                </p>
                <p
                  onClick={() => handleProductMenuClick("Pulsa")}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Pulsa & Data
                </p>
                <p
                  onClick={() => handleProductMenuClick("E-Wallet")}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  E-Wallet
                </p>
                <p
                  onClick={() => handleProductMenuClick("Premium")}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Aplikasi Premium
                </p>
                <p
                  onClick={() => handleProductMenuClick("PLN")}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Listrik PLN
                </p>
              </div>
            </div>

            {/* SEKTOR INFORMASI */}
            <div>
              <h3 className="text-white font-bold text-[13px] mb-4">
                Informasi
              </h3>
              <div className="space-y-3 text-gray-400 text-[11px]">
                {/* Scroll lancar menuju tabel Tentang Kami profesional dan membuka dropdown otomatis */}
                <p
                  onClick={() =>
                    handleScrollToElement("tabel-tentang", () =>
                      setOpenTentang(true),
                    )
                  }
                  className="hover:text-yellow-400 transition cursor-pointer font-semibold text-gray-200"
                >
                  Tentang Kami
                </p>
                <p
                  onClick={() => handleScrollToElement("how-to-topup")}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Cara Top Up
                </p>
                <p
                  onClick={() =>
                    handleScrollToElement("tabel-syarat", () =>
                      setOpenSyarat(true),
                    )
                  }
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Syarat & Ketentuan
                </p>
                <p
                  onClick={() =>
                    handleScrollToElement("tabel-privasi", () =>
                      setOpenPrivasi(true),
                    )
                  }
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  Kebijakan Privasi
                </p>
              </div>
            </div>

            {/* SEKTOR BANTUAN */}
            <div>
              <h3 className="text-white font-bold text-[13px] mb-4">Bantuan</h3>
              <div className="space-y-3 text-gray-400 text-[11px]">
                <p
                  onClick={() => handleScrollToElement("faq-section")}
                  className="hover:text-yellow-400 transition cursor-pointer"
                >
                  FAQ
                </p>
                <a
                  href="https://wa.me/6281931194133?text=Halo%20MinEls%2C%20saya%20butuh%20bantuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-yellow-400 transition"
                >
                  Hubungi Kami
                </a>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    alert(
                      "❌ Akses Ditolak: Fitur Cek Transaksi masih tahap pengembangan!",
                    );
                  }}
                  className="text-gray-500 opacity-50 cursor-not-allowed select-none transition hover:text-red-500"
                >
                  Cek Transaksi
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-[15px] mb-2 -ml-3">
                Metode Pembayaran
              </h3>
              <div className="flex flex-wrap justify-start gap-x-2 gap-y-5 items-center -ml-5">
                {payments.map((item, index) => (
                  <img
                    key={index}
                    src={`/${item}.png`}
                    alt={item}
                    className="h-5 object-contain brightness-110"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-500">
              © 2020 ElangShop. All rights reserved. Created By Lifskur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}