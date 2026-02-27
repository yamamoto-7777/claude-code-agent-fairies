import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Code Agent Team",
  description:
    "妖精エージェントチームと一緒に、音声フィードバック付きでコード開発を楽しむ",
  openGraph: {
    title: "Claude Code Agent Team",
    description:
      "妖精エージェントチームと一緒に、音声フィードバック付きでコード開発を楽しむ",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Agent Team",
    description:
      "妖精エージェントチームと一緒に、音声フィードバック付きでコード開発を楽しむ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Light particle decoration layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30"
        >
          <div
            className="absolute left-[10%] top-[20%] h-1.5 w-1.5 rounded-full bg-blue-300/40 shadow-[0_0_8px_2px_rgba(147,197,253,0.3)]"
            style={{ animation: "fairy-float 4s ease-in-out infinite" }}
          />
          <div
            className="absolute left-[25%] top-[50%] h-1 w-1 rounded-full bg-cyan-200/30 shadow-[0_0_6px_2px_rgba(103,232,249,0.25)]"
            style={{
              animation: "fairy-float 5s ease-in-out 1s infinite",
            }}
          />
          <div
            className="absolute left-[70%] top-[15%] h-2 w-2 rounded-full bg-sky-200/30 shadow-[0_0_10px_3px_rgba(186,230,253,0.3)]"
            style={{
              animation: "fairy-float 6s ease-in-out 0.5s infinite",
            }}
          />
          <div
            className="absolute left-[55%] top-[65%] h-1 w-1 rounded-full bg-indigo-300/25 shadow-[0_0_6px_2px_rgba(165,180,252,0.2)]"
            style={{
              animation: "fairy-float 4.5s ease-in-out 2s infinite",
            }}
          />
          <div
            className="absolute left-[85%] top-[40%] h-1.5 w-1.5 rounded-full bg-blue-200/35 shadow-[0_0_8px_2px_rgba(191,219,254,0.25)]"
            style={{
              animation: "fairy-float 5.5s ease-in-out 1.5s infinite",
            }}
          />
          <div
            className="absolute left-[40%] top-[80%] h-1 w-1 rounded-full bg-cyan-300/20 shadow-[0_0_6px_2px_rgba(103,232,249,0.2)]"
            style={{ animation: "fairy-glow 3s ease-in-out infinite" }}
          />
          <div
            className="absolute left-[15%] top-[90%] h-1.5 w-1.5 rounded-full bg-emerald-300/20 shadow-[0_0_6px_2px_rgba(110,231,183,0.2)]"
            style={{
              animation: "fairy-float 5s ease-in-out 2.5s infinite",
            }}
          />
          <div
            className="absolute left-[92%] top-[70%] h-1 w-1 rounded-full bg-rose-300/20 shadow-[0_0_6px_2px_rgba(253,164,175,0.2)]"
            style={{ animation: "fairy-glow 3s ease-in-out 1s infinite" }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
