import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://linkpreview.kartikk.tech";

export const metadata: Metadata = {
  title: "Link Preview - Test Your Links Across Platforms",
  description: "Preview how your links appear on Telegram, Discord, Slack, X, Facebook, LinkedIn, and WhatsApp. Check metadata quality and image dimensions.",
  keywords: ["link preview", "open graph", "twitter cards", "meta tags", "social media preview"],
  authors: [{ name: "Kartik Labhshetwar" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Link Preview - Test Your Links Across Platforms",
    description: "Preview how your links appear on Telegram, Discord, Slack, X, Facebook, LinkedIn, and WhatsApp.",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Link Preview - Test Your Links Across Platforms",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} dark`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
