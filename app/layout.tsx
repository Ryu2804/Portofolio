import type { Metadata } from "next";
import { Bungee, Space_Mono } from "next/font/google";
import "./globals.css";

const bungee = Bungee({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Only the Hanzi actually rendered on the page, so the CJK font stays tiny.
// Add new characters here when you add them to a component.
const HANZI = "馬福隆檔案卡帶聯絡";

export const metadata: Metadata = {
  title: "Benedictus Ryu Gunawan",
  description:
    "Arcade CRT portfolio: brand identity, packaging, poster art, and retro-futurist interfaces. Press start to explore the cartridge archives.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bungee.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Material Symbols icon font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap&text=${encodeURIComponent(HANZI)}`}
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-inverse-surface font-body text-on-surface">
        {children}
      </body>
    </html>
  );
}
