"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out our service",
    features: [
      "5 free enhancements",
      "Basic AI features",
      "Standard quality",
      "Watermark on downloads",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro Pass",
    price: "$19",
    period: "per month",
    description: "For regular property hosts",
    features: [
      "100 enhancements/month",
      "All AI features",
      "High quality downloads",
      "No watermark",
      "Batch processing",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For agencies and large portfolios",
    features: [
      "Unlimited enhancements",
      "All AI features",
      "Highest quality",
      "API access",
      "Custom integrations",
      "Dedicated support",
      "Custom pricing",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1d3e] pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include our
              powerful AI enhancement features.
            </p>
          </motion.div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
              <span className="text-sm text-gray-300">Monthly</span>
              <span className="text-sm font-semibold text-emerald-400">
                Yearly (40% off)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-emerald-500 text-white shadow-2xl scale-105"
                    : "bg-slate-800/50 border-2 border-slate-700/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span
                        className={`text-lg ml-2 ${
                          plan.popular
                            ? "text-blue-100"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      plan.popular
                        ? "text-blue-100"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.popular ? "text-white" : "text-blue-600"
                        }`}
                      />
                      <span
                        className={
                          plan.popular
                            ? "text-blue-50"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={
                      plan.name === "Enterprise" ? "/contact" : "/auth/signup"
                    }
                    className={`block w-full text-center py-4 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? "bg-white text-emerald-600 hover:shadow-xl"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How does the photo enhancement process work?",
                  a: "Simply upload your photos, select enhancement options, and our AI processes them in seconds. You'll get professional-quality results instantly.",
                },
                {
                  q: "Will the enhanced photos look fake or over-edited?",
                  a: "No! Our AI is trained to create natural, professional enhancements that look authentic and appealing without being overdone.",
                },
                {
                  q: "How long does it take to enhance my photos?",
                  a: "Most photos are enhanced in just a few seconds. Batch processing multiple photos may take a bit longer, but still under a minute.",
                },
                {
                  q: "Can I use the enhanced photos on platforms other than Airbnb?",
                  a: "Absolutely! Your enhanced photos can be used on any platform - Booking.com, VRBO, your own website, social media, and more.",
                },
                {
                  q: "Is there a limit to how many photos I can enhance?",
                  a: "Free plans include 5 enhancements. Pro Pass includes 100 per month. Enterprise plans offer unlimited enhancements.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-lg"
                >
                  <h3 className="font-semibold text-lg mb-2 text-white">
                    {faq.q}
                  </h3>
                  <p className="text-gray-300">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
