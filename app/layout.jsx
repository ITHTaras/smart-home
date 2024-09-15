import { Mulish } from "next/font/google";
import "./globals.css";

const inter = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Mein Zuhause",
  description: "Entwickelt von Taras Hornik",
};

import Navbar from "./components/Navbar";
import HomeState from "./components/HomeState";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>
        <div className="w-full h-screen max-h-screen flex px-3 pt-3 gap-10">
          <Navbar />
          <HomeState>{children}</HomeState>
        </div>
      </body>
    </html>
  );
}
