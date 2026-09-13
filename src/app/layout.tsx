import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/data";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import BackToTop from "@/components/layout/BackToTop";
import QuickView from "@/components/shop/QuickView";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const heading = Playfair_Display({ variable: "--font-heading", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${brand.name} | ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: "Handcrafted clothing, footwear and home decor from the artisans of Multan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickView />
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
