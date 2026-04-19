import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xebia Studio",
  description: "Visual preview system for Xebia Remotion compositions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0015] text-white antialiased">{children}</body>
    </html>
  );
}
