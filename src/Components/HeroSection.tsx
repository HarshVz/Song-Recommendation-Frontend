
"use client";

import { Music, Play, Headphones, Clock, Search, ArrowRight } from 'lucide-react';
import { motion } from "motion/react";
import Link from 'next/link';
import customVarients from '@/utils/initialAnimation';
import { useRouter } from 'next/navigation'

export default function HeroSection() {
    const router = useRouter()
    return (
        <motion.main
        variants={customVarients}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{
            duration: 0.4,
            ease: "easeInOut"
        }}
        className="flex flex-col items-center justify-center px-6 pt-12 pb-20">

        {/* Feature Badge */}
        <div className="mb-12">
          <div className="dark:bg-green-950 bg-neutral-100 border dark:border-green-500 border-neutral-300 rounded-full px-4 py-1 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full dark:bg-green-500 bg-orange-700 flex items-center justify-center">
              <span className="text-xs text-white dark:text-black">✓</span>
            </div>
            <span className="text-sm dark:text-green-500 text-orange-700 capitalize">Explore music that suits your taste!</span>
          </div>
        </div>

        {/* Hero Titles */}
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-3">Never Miss</h1>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-600 dark:text-gray-400 mb-10">Another Great Song</h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Your music taste is unique. SoundWave isn't. Save songs, discover new artists, and find perfect recommendations instantly across devices — never lose track again.
          </p>
  {/* Features Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
    {[
      {
        Icon: Search,
        title: "1. Search Song",
        subtitle: "discover",
        link: "search"
      },
      {
        Icon: Music,
        title: "2. Press & Play",
        subtitle: "suggestions",
        link: "recommendations"
      },
      {
        Icon: Clock,
        title: "Access Anytime",
        subtitle: "24x7",
        link: "/"
      },
    ].map(({ Icon, title, subtitle, link }, i) => (
      <Link
      href={`/${link}`}
        key={i}
        className="flex items-center gap-4 p-4 rounded-xl
                   bg-neutral-100 dark:bg-neutral-900
                   shadow-md dark:shadow-none transition-colors"
      >
        {/* Icon Container */}
        <div className="p-2 rounded-lg
                        bg-neutral-200 dark:bg-neutral-800
                        transition-colors">
          <Icon className="w-6 h-6 text-orange-500" />
        </div>

        {/* Text Content */}
        <div className="text-left">
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{title}</p>
          <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
            {subtitle && <span>{subtitle}</span>}
            <span>→</span>
          </div>
        </div>
      </Link>
    ))}
  </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* <button className="px-6 py-3 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => router.push("/video")}>
              <Play className="w-5 h-5" />
              <span>Watch Demo Video</span>
            </button>
            <button className="px-6 py-3 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center border-4 border-neutral-800 outline-2 outline-neutral-100 cursor-pointer"
            onClick={() => router.push("/search")}>
              <span>Start Discovering Smarter</span>
              <span className="ml-2">→</span>
            </button> */}
          </div>
        </div>
        <video src="./preview-1.mp4" autoPlay loop muted className='rounded-xl border-4 border-neutral-800 drop-shadow-2xl lg:max-w-4xl md:max-w-3xl xl:max-w-6xl 2xl:max-w-7xl drop-shadow-neutral-800/50'></video>
      </motion.main>
    )
}
