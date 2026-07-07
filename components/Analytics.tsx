"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      // Mengirimkan sinyal halaman baru ke Google Analytics setiap kali URL berubah
      const url = pathname + searchParams.toString();
      (window as any).gtag("config", "G-6FDGZLK65H", {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null; // Komponen ini tidak memunculkan tampilan apa-apa (hanya bekerja di balik layar)
}