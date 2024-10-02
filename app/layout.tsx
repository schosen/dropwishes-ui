import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../styles/globals.css";
// import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import "node_modules/react-modal-video/css/modal-video.css";
// import "../styles/index.css";

// const inter = Inter({ subsets: ["latin"] });
// ${inter.className}

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
    <html lang="en">
      <body className={`bg-[#FCFCFC] dark:bg-black `}>
        <Providers>
          <Header />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
