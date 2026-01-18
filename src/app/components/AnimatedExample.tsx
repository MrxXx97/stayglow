"use client";

import { motion } from "framer-motion";

export default function AnimatedExample() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Fade in animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold"
      >
        Framer Motion is Ready! 🎉
      </motion.div>

      {/* Hover animation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold"
      >
        Hover Me!
      </motion.button>

      {/* Stagger children animation */}
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item * 0.1 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"
          />
        ))}
      </div>

      {/* Continuous animation */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
}
