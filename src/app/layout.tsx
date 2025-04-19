import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { authOptions } from "./utils/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import BottomMenu from "@/components/BottomMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wander Campground Booking",
  description: "Find Your Perfect Spot Under the Stars",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
        <TopMenu/>
          <div className="mt-[50px] mb-[100px]">
            {children}
          </div>
        <div className="fixed w-[100%] bottom-0">
          <BottomMenu/>
        </div>
        
        </NextAuthProvider>
      </body>
    </html>
  );
}
