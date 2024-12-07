"use client";

import { Moon, Sun, X, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Universechain", href: "/blockchain" },
  { title: "Tokens", href: "/tokens" },
  { title: "NFTs", href: "/nfts" },
  { title: "Resources", href: "/resources" },
  { title: "Developers", href: "/developers" },
]

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

      {/* Mobile Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/images/Vector.png"
                  alt="UCCASH"
                  width={24}
                  height={24}
                />
                <span className="font-bold text-xl">UCCASH</span>
              </Link>
              {/* <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button> */}
            </div>

            <div className="flex-1 overflow-auto py-2">
              {navigationItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="flex items-center justify-between gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/sign-in">Log in</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-8 w-8"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}