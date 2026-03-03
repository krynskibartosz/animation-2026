import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import ViewCanvas from "@/components/projects/awwwards-adidas/components/ViewCanvas";
import Header from "@/components/projects/awwwards-adidas/components/Header";
import Footer from "@/components/projects/awwwards-adidas/components/Footer";

const mulish = Mulish({
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "adidas",
  description:
    "Foot Locker and adidas Originals' latest collection breaks new ground.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${mulish.className} antialiased relative awwwards-adidas-wrapper`}>
      <ViewCanvas />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
