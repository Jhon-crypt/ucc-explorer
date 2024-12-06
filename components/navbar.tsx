"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <nav className="border-b bg-card dark:bg-slate-900 lg:text-[16px] md:text-xs text-xs ">
      <div className="flex h-16 items-center justify-between px-4 gap-1 container mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 gap-2">
          <div className="flex items-center space-x-1">
            <Image
              src="/images/Vector.png"
              alt="UCCASH"
              width={24}
              height={24}
            />
            <span className="font-bold text-xl">UCCASH</span>
          </div>
          <div className="hidden  lg:block py-2 px-3 rounded-md bg-[#F8F8F8]">
            <span className="lg:text-[10px] md:text-xs text-xs  text-muted-foreground">
              UCC Price: $583.93{" "}
              <span className="text-uccash-green">(+0.38%)</span>{" "}
              <span className="opacity-50">|</span> Gas: 1 GWei
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
          <Link href="/" className="lg:text-[16px] md:text-[10px] text-xs  font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/#" className="lg:text-[16px] md:text-[10px] text-xs  font-medium hover:text-primary">
            Universechain
          </Link>
          <Link href="/#" className="lg:text-[16px] md:text-[10px] text-xs  font-medium hover:text-primary">
            Tokens
          </Link>
          <Link href="#" className="lg:text-[16px] md:text-[10px] text-xs  font-medium hover:text-primary">
            NFTs
          </Link>
          <Link href="#" className="lg:text-[16px] md:text-[10px] text-xs  font-medium hover:text-primary">
            Resources
          </Link>
          <Link href="/#" className="lg:text-[16px] md:text-[10px] text-xs  font-medium hover:text-primary">
            Developers
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 p-2 text-gray-700 dark:text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-2">
            <div
              className={`w-8 h-0.5 bg-current transform transition-transform duration-500 ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <div
              className={`w-8 h-0.5 bg-current transition-opacity duration-500 ${isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
            />
            <div
              className={`w-8 h-0.5 bg-current transform transition-transform duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </div>
        </button>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-6">
        <Link
            href="/sign-up">
            <Button variant="destructive" size="sm">
              Sign up
            </Button>
          </Link>
          <Link
            href="/sign-in">
            <Button variant="destructive" size="sm">Log in</Button>
          </Link>


          <div
            onClick={toggleTheme}
            className="relative flex items-center w-16 h-8 bg-yellow-500 dark:bg-gray-700 rounded-full cursor-pointer p-1"
          >
            {/* Circle */}
            <div
              className={`absolute w-6 h-6 bg-card rounded-full shadow-md transition-transform transform duration-300 ${theme === "dark" ? "translate-x-8" : "translate-x-0"
                }`}
            ></div>

            {/* Icons */}
            <Sun
              className={`absolute left-2 w-4 h-4 text-white transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"
                }`}
            />
            <Moon
              className={`absolute right-2 w-4 h-4 text-white transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"
                }`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Sliding Effect */}
      <div
        className={`fixed inset-0 z-40 transform bg-card dark:bg-slate-900 transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
      >
        <div className="p-4">
          <Link
            href="/"
            className="block py-2 px-4 lg:text-[16px] md:text-xs text-xs  font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/transactions"
            className="block py-2 px-4 lg:text-[16px] md:text-xs text-xs  font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Universechain
          </Link>
          <Link
            href="/#"
            className="block py-2 px-4 lg:text-[16px] md:text-xs text-xs  font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Tokens
          </Link>
          <Link
            href="/#"
            className="block py-2 px-4 lg:text-[16px] md:text-xs text-xs  font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            NFTs
          </Link>
          <Link
            href="/#"
            className="block py-2 px-4 lg:text-[16px] md:text-xs text-xs  font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
          <Link
            href="/#"
            className="block py-2 px-4 lg:text-[16px] md:text-xs text-xs  font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Developers
          </Link>
        </div>
        <div className="flex p-6 bg-black md:flex items-center space-x-6">
          <Link
            href="/sign-up">
            <Button variant="outline" size="sm">
              Sign up
            </Button>
          </Link>
          <Link
            href="/sign-in">
            <Button size="sm">Log in</Button>
          </Link>

          <div
            onClick={toggleTheme}
            className="relative flex items-center w-16 h-8 bg-yellow-500 dark:bg-gray-700 rounded-full cursor-pointer p-1"
          >
            {/* Circle */}
            <div
              className={`absolute w-6 h-6 bg-card rounded-full shadow-md transition-transform transform duration-300 ${theme === "dark" ? "translate-x-8" : "translate-x-0"
                }`}
            ></div>

            {/* Icons */}
            <Sun
              className={`absolute left-2 w-4 h-4 text-white transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"
                }`}
            />
            <Moon
              className={`absolute right-2 w-4 h-4 text-white transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"
                }`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}