import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c1d3e] border-t border-slate-700/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              <span className="text-xl font-bold text-white">PhotoBoost</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Transform your property photos with AI-powered enhancement. Save
              time and impress guests with stunning images.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/#features"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-emerald-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700/50 text-center text-sm text-gray-400">
          <p>© 2025 PhotoBoost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
