import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import "@/styles/scss/index.scss";
import IndexStyles from "../styles/Index.module.css";
// import Footer from "@/components/Footer";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dropwishes",
  description: "Drop your wishes today",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Providers>
          <div>
          <Header />
          {children}
          {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
