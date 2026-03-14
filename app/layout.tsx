import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.css";
import "./globals.css";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Find your perfect rental car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
