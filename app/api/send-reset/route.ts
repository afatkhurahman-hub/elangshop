import { NextResponse } from "next/server";
import { Resend } from "resend";

// ⚠️ GANTI teks di bawah ini dengan API Key asli kamu yang ada di gambar image_e7fc5c.png (yang diawali re_...)
const resend = new Resend("re_PsmQppTx_J7TnJKa4qmV81RJ2qS9H53z2");

export async function POST(request: Request) {
  try {
    const { email, resetLink } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "ELANGSHOP <onboarding@resend.dev>",
      to: [email],
      subject: "[ELANGSHOP] Permintaan Reset Password Akun Anda 🔑",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f172a;">Permintaan Reset Password ELANGSHOP</h2>
          <p>Halo,</p>
          <p>Kami menerima permintaan untuk mengatur ulang password akun <strong>ELANGSHOP</strong> Anda.</p>
          <p>Silakan klik tombol di bawah ini untuk membuat password baru:</p>
          <p style="margin: 24px 0;">
            <a href="${resetLink}" style="background-color: #FACC15; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
              RESET PASSWORD SAYA
            </a>
          </p>
          <p style="font-size: 12px; color: #64748b;">Jika Anda tidak meminta ini, abaikan saja email ini.</p>
          <br>
          <p>Salam hangat,<br><strong>Tim Keamanan ELANGSHOP</strong></p>
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
