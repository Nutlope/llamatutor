import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import PlausibleProvider from "next-plausible";
import "./globals.css";

const inter = Lexend({ subsets: ["latin"] });

let title = "Turbo Seek – AI Search Engine";
let description =
  "Search smarter and faster with our open source AI search engine";
let url = "https://turboseek.io/";
let ogimage = "https://turboseek.io/og-image.png";
let sitename = "TurboSeek.io";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="turboseek.io" />
      </head>
      <body
        className={`${inter.className} flex min-h-screen flex-col justify-between`}
      >
        {children}
      </body>
    </html>
  );
}
