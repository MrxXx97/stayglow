"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0c1d3e]/95 backdrop-blur-md border-b border-slate-700/50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-500" />
          <span className="text-xl font-bold text-white">PhotoBoost</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-gray-300 hover:text-emerald-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-gray-300 hover:text-emerald-400 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-gray-300 hover:text-emerald-400 transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-gray-300 hover:text-emerald-400 transition-colors"
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
