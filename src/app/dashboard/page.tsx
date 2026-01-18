"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Upload,
  Image as ImageIcon,
  CreditCard,
  Zap,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Profile {
  credits: number;
  subscription_tier: string;
  email: string;
  full_name: string;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0c1d3e] pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center text-white">Loading...</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c1d3e] pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}
                !
              </h1>
              <p className="text-gray-400">
                Manage your photos and enhance your property listings
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {profile?.credits || 0}
                </h3>
                <p className="text-gray-400 text-sm">Available Credits</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">0</h3>
                <p className="text-gray-400 text-sm">Photos Enhanced</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {profile?.subscription_tier || "Free"}
                </h3>
                <p className="text-gray-400 text-sm">Subscription Tier</p>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/enhance"
                  className="block bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <Upload className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        Enhance Photos
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Upload and enhance your property photos
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/pricing"
                  className="block bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <CreditCard className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        Upgrade Plan
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Get more credits and features
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Recent Photos Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Photos</h2>
                <Link
                  href="/dashboard/photos"
                  className="text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  View all
                </Link>
              </div>
              <div className="text-center py-12 text-gray-400">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No photos yet</p>
                <Link
                  href="/enhance"
                  className="text-emerald-400 hover:text-emerald-300 mt-2 inline-block"
                >
                  Enhance your first photo
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
