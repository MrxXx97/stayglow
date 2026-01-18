-- PhotoBoost Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  credits INTEGER DEFAULT 5,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  original_url TEXT NOT NULL,
  enhanced_url TEXT,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  enhancement_options JSONB DEFAULT '{}',
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  credits_used INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credits transactions table (for tracking credit usage)
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  photo_id UUID REFERENCES public.photos(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL, -- positive for credits added, negative for credits used
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'usage', 'refund', 'bonus')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('pro', 'enterprise')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'unpaid')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Photos Policies
CREATE POLICY "Users can view own photos"
  ON public.photos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own photos"
  ON public.photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own photos"
  ON public.photos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own photos"
  ON public.photos FOR DELETE
  USING (auth.uid() = user_id);

-- Credit Transactions Policies
CREATE POLICY "Users can view own transactions"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Subscriptions Policies
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update credits when photo is created
CREATE OR REPLACE FUNCTION public.deduct_credits()
RETURNS TRIGGER AS $$
BEGIN
  -- Deduct credits from user profile
  UPDATE public.profiles
  SET credits = credits - NEW.credits_used
  WHERE id = NEW.user_id AND credits >= NEW.credits_used;
  
  -- Create credit transaction record
  INSERT INTO public.credit_transactions (user_id, photo_id, amount, transaction_type, description)
  VALUES (
    NEW.user_id,
    NEW.id,
    -NEW.credits_used,
    'usage',
    'Photo enhancement'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to deduct credits on photo creation
DROP TRIGGER IF EXISTS on_photo_created ON public.photos;
CREATE TRIGGER on_photo_created
  AFTER INSERT ON public.photos
  FOR EACH ROW EXECUTE FUNCTION public.deduct_credits();

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS photos_user_id_idx ON public.photos(user_id);
CREATE INDEX IF NOT EXISTS photos_status_idx ON public.photos(status);
CREATE INDEX IF NOT EXISTS photos_created_at_idx ON public.photos(created_at DESC);
CREATE INDEX IF NOT EXISTS credit_transactions_user_id_idx ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions(user_id);

-- Storage buckets setup (run these in Supabase Dashboard > Storage)
-- Bucket: 'photos' (public, authenticated upload)
-- Bucket: 'enhanced-photos' (public, authenticated upload)
