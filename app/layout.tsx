import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const outfit = localFont({
  src : "./fonts/Outfit-VariableFont_wght.ttf",
  variable : '--font-outfit',
  weight : '100 900'
})


export const metadata: Metadata = {
  title: "Louise Uncharted",
  description: "A travel blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased ` }
      >
                      {children}
      </body>
    </html>
  );
}
