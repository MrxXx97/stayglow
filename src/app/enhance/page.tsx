"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Sparkles,
  Download,
  Sun,
  Palette,
  Image as ImageIcon,
  Wand2,
  X,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const enhancementOptions = [
  { id: "brighten", label: "Brighten", icon: Sun },
  { id: "color", label: "Enhance Colors", icon: Palette },
  { id: "upscale", label: "Upscale", icon: ImageIcon },
  { id: "auto", label: "Auto Enhance", icon: Wand2 },
];

export default function EnhancePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: false,
  });

  const handleEnhance = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setEnhancedImage(uploadedImage); // In real app, this would be the enhanced version
      setIsProcessing(false);
    }, 2000);
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1d3e] pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Enhance Your Photos
              </h1>
              <p className="text-xl text-gray-300">
                Upload your property photos and let AI transform them instantly
              </p>
            </div>

            {!uploadedImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-slate-600 hover:border-emerald-500"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-xl font-semibold mb-2">
                    {isDragActive
                      ? "Drop your photo here"
                      : "Drag & drop your photo here"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    or click to select a file
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Supports PNG, JPG, JPEG, WEBP
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Before</h3>
                      <button
                        onClick={() => {
                          setUploadedImage(null);
                          setEnhancedImage(null);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <Image
                      src={uploadedImage}
                      alt="Original"
                      width={800}
                      height={600}
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">After</h3>
                      {enhancedImage && (
                        <button className="text-blue-600 hover:text-blue-700">
                          <Download className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      {isProcessing ? (
                        <div className="text-center">
                          <Sparkles className="w-12 h-12 mx-auto mb-2 text-emerald-500 animate-pulse" />
                          <p className="text-gray-300">Enhancing...</p>
                        </div>
                      ) : enhancedImage ? (
                        <Image
                          src={enhancedImage}
                          alt="Enhanced"
                          width={800}
                          height={600}
                          className="w-full rounded-lg"
                        />
                      ) : (
                        <p className="text-gray-400">
                          Enhanced image will appear here
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {uploadedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-lg"
              >
                <h3 className="font-semibold mb-4">Enhancement Options</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {enhancementOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedOptions.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleOption(option.id)}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500/20"
                            : "border-slate-600 hover:border-emerald-500/50"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 mx-auto mb-2 ${
                            isSelected ? "text-emerald-400" : "text-gray-400"
                          }`}
                        />
                        <p
                          className={`text-sm ${
                            isSelected
                              ? "text-emerald-400 font-semibold"
                              : "text-gray-300"
                          }`}
                        >
                          {option.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnhance}
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Enhance Photo"}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
