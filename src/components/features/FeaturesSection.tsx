"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Image as ImageIcon,
  Sun,
  Wand2,
  Layers,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Enhancement",
    description:
      "Transform your photos in seconds with our lightning-fast AI technology.",
  },
  {
    icon: Sun,
    title: "Perfect Lighting",
    description:
      "Automatically adjust lighting to highlight the best features of any space.",
  },
  {
    icon: ImageIcon,
    title: "Professional Quality",
    description:
      "Achieve professional-grade photography results without expensive equipment.",
  },
  {
    icon: Wand2,
    title: "Smart Corrections",
    description:
      "Fix distortion, straighten horizons, and correct perspective automatically.",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description:
      "Enhance multiple property photos at once to save time and effort.",
  },
  {
    icon: Clock,
    title: "Time-Saving",
    description:
      "Reduce post-processing time from hours to minutes with automated enhancements.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-[#0c1d3e]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Results in Seconds
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our powerful AI enhances every aspect of your real estate photos to
            create stunning, professional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 transition-colors"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
