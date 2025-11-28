
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Providers from "./Components/Provider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zahra",
  description: "Your Online Store",
};

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>



        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>

        <Footer />



      </body>
    </html>
  );
}
