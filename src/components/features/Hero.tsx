"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0c1d3e] pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/30"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Photo Enhancement
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Boost Your Property Photos with Pro AI in a Flash
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Transform your Airbnb and real estate photos instantly. Get
              professional-quality results that increase bookings by 32% and
              boost rental value by 40%.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/enhance"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Enhance Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-emerald-500/50 hover:border-emerald-500 text-white rounded-lg font-semibold transition-colors"
                >
                  See Pricing
                </Link>
              </motion.div>
            </div>

            <p className="text-sm text-gray-400">
              *No credit card required | #1 AI Real Estate Photo App
            </p>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    32%
                  </span>
                </div>
                <p className="text-sm text-gray-300">Faster Bookings</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">25%</span>
                </div>
                <p className="text-sm text-gray-300">Higher Rates</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">Instant</span>
                </div>
                <p className="text-sm text-gray-300">Results</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
              <div className="aspect-square bg-slate-800/50 p-8">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-slate-700/50 rounded-lg p-4 shadow-lg border border-slate-600/50">
                    <div className="aspect-square bg-slate-600 rounded mb-2"></div>
                    <div className="text-xs text-gray-400">Before</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4 shadow-lg border border-emerald-500/30">
                    <div className="aspect-square bg-emerald-500/20 rounded mb-2 border border-emerald-500/30"></div>
                    <div className="text-xs text-emerald-400 font-semibold">
                      After
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
