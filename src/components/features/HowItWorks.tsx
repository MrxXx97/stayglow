"use client";

import { motion } from "framer-motion";
import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Photos",
    description: "Drag and drop or select your property photos to get started.",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    description:
      "Our AI automatically enhances lighting, colors, and details in seconds.",
  },
  {
    icon: Download,
    title: "Download & Use",
    description:
      "Download your enhanced photos and use them on Airbnb, booking sites, or anywhere.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three simple steps to transform your property photos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-500 transform -translate-y-1/2" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
