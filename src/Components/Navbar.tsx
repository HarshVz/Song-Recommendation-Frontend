"use client";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import {motion} from "motion/react"
import customVarients from "@/utils/initialAnimation";
import Link from "next/link";
import Soundwave from "@/assets/soundwave.svg"
import Image from "next/image";

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [icon, setIcon] = useState(<Sun className="w-5 h-5 text-yellow-500" />);

    const toggleTheme = () => {
        const nextMode = !isDarkMode;
        setIsDarkMode(nextMode);

        if (nextMode) {
          // Dark mode ON
          localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
          setIcon(<Moon className="w-5 h-5 text-blue-400" />);
        } else {
          // Light mode ON
          localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
          setIcon(<Sun className="w-5 h-5 text-yellow-500" />);
        }
      };


    useEffect(() => {
        const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(darkMode);
        document.documentElement.classList.toggle("dark", darkMode);
    }, []);


  return (
    <motion.nav
    variants={customVarients}
    initial="hidden"
    animate="show"
    exit="hidden"
    transition={{
        duration: 0.4,
        ease: "easeInOut"
    }}
    className="w-full px-5 md:px-10 py-5 bg-transparent transition-colors">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-neutral-900 dark:text-white flex justify-center items-center gap-3">
          <Image className="" width={32} height={32} src={Soundwave} alt="soundwave" />
          SoundWave
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-row justify-between items-center gap-5">

        <div className="hidden md:flex gap-6 items-center">
          {[
            {
            name: "Recommend",
            href: "/recommendations",
            }
          , {
            name: "Discover",
            href: "/search",
          }].map((item) => (
            <Link
              href={item.href.toLowerCase()}
              key={item.href}
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Theme Toggle Placeholder */}
        <button
          className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          aria-label="Toggle Theme"
          onClick={() => toggleTheme()}
        >
            {isDarkMode ?
                <Sun className="w-5 h-5 text-yellow-500" /> :
                <Moon className="w-5 h-5 text-blue-400" />
                }
        </button>
        </div>
      </div>
    </motion.nav>
  );
}
