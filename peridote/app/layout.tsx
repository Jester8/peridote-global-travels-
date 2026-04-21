import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-context";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peridote Global Travels",
  description:
    "Peridote Global Travels is an innovative online travel agency designed to simplify and enhance how individuals and organizations plan, book, and manage travel experiences globally. Our mission is to make travel smarter, faster, and more personalized through technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`} style={{ fontFamily: 'var(--font-manrope)' }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}