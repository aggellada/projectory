import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Footer from "@/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Project Management App",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030711] w-full text-white flex`}
      >
        {children}
      </body>
    </html>
  );
}
