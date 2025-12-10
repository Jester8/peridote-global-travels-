import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
      <body className={`${poppins.variable} antialiased`} style={{ fontFamily: 'var(--font-poppins)' }}>
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}