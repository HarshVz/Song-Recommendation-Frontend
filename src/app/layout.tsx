import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { AnimatePresence } from "motion/react";
import "./globals.css";
import Navbar from "@/Components/Navbar";
const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
    title: {
      default: 'Soundwave – AI Song Recommendations',
      template: '%s | Soundwave',
    },
    description: 'Soundwave recommends songs using AI based on your taste and mood.',
    keywords: ['AI music', 'song recommendations', 'music discovery', 'Soundwave'],
    authors: [{ name: 'Soundwave Team' }],
    themeColor: '#0f172a', // Optional: Tailwind bg-zinc-800
    openGraph: {
      title: 'Soundwave – AI Song Recommendations',
      description: 'AI-powered song recommendations just for you.',
      url: 'https://yourdomain.com', // Replace this
      siteName: 'Soundwave',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Soundwave – AI Song Recommendations',
      description: 'Discover music you’ll love, powered by AI.',
      creator: '@harshdev_', // optional
    },
    metadataBase: new URL('https://yourdomain.com'),
  };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AnimatePresence>
                <body
                    className={`${sora.className} antialiased min-h-screen mx-auto h-full w-full dark:bg-neutral-950 dark:text-white bg-white  text-black tracking-tight`}
                >
                    <header >
                        <Navbar />
                    </header>
                    <div className=" px-5 md:px-10 pb-10 mx-auto flex justify-center items-center h-full w-full">
                        {children}
                    </div>
                </body>
            </AnimatePresence>
        </html>
    );
}
