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
// Night theme from dusk (18:00) to dawn (06:00) on the visitor's clock.
// Runs inline before paint so there is no day-to-night flash; rechecks every 5 min.
// Preview either theme with ?time=night or ?time=day.
const TIME_THEME = `(function(){var f=new URLSearchParams(location.search).get("time");function s(){var h=new Date().getHours();document.documentElement.dataset.time=f==="night"||f==="day"?f:h>=18||h<6?"night":"day"}s();setInterval(s,300000)})()`;

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
      suppressHydrationWarning // data-time is set by the inline script before hydration
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: TIME_THEME }} />
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
