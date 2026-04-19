import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Suisse Int'l isn't on Google Fonts — Inter is the closest freely available substitute
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xebia Studio",
  description: "Visual preview system for Xebia Remotion compositions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0015] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
