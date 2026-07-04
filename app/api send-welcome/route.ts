import { NextResponse } from "next/server";
import { Resend } from "resend";

// Masukkan API Key Resend kamu yang tadi sudah berhasil dipakai
const resend = new Resend("re_PsmQppTx_J7TnJKa4qmV81RJ2qS9H53z2");

export async function POST(request: Request) {
  try {
    const { email, confirmLink } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "ELANGSHOP <onboarding@resend.dev>",
      to: [email],
      subject: "Selamat Datang di ELANGSHOP! 🛒 Verifikasi Akun Anda",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f172a;">Selamat Datang di ELANGSHOP!</h2>
          <p>Halo,</p>
          <p>Terima kasih telah mendaftar di <strong>ELANGSHOP</strong>. Satu langkah lagi sebelum Anda dapat mulai berbelanja, silakan verifikasi akun Anda.</p>
          <p>Klik tombol di bawah ini untuk mengonfirmasi email Anda:</p>
          <p style="margin: 24px 0;">
            <a href="${confirmLink}" style="background-color: #FACC15; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
              KONFIRMASI AKUN SAYA
            </a>
          </p>
          <p style="font-size: 12px; color: #64748b;">Jika Anda tidak merasa mendaftar di web kami, abaikan saja email ini.</p>
          <br>
          <p>Salam hangat,<br><strong>Tim ELANGSHOP</strong></p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}