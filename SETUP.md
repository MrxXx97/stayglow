# PhotoBoost - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings > API
3. Add them to your `.env.local` file
4. Create the following tables in Supabase SQL Editor:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  credits INTEGER DEFAULT 5,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table
CREATE TABLE public.photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  original_url TEXT NOT NULL,
  enhanced_url TEXT,
  status TEXT DEFAULT 'pending',
  enhancement_options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own photos" ON public.photos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own photos" ON public.photos
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 4. Set Up Storage Buckets

In Supabase Dashboard > Storage:

1. Create a bucket named `photos` (public)
2. Create a bucket named `enhanced-photos` (public)
3. Set up policies to allow authenticated users to upload

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── enhance/           # Photo enhancement page
│   ├── pricing/           # Pricing page
│   ├── auth/              # Authentication pages
│   └── dashboard/         # User dashboard
├── components/
│   ├── layout/            # Header, Footer
│   ├── features/          # Hero, Features, How It Works
│   └── ui/                # Reusable UI components
└── lib/
    ├── supabase/          # Supabase client setup
    └── utils.ts           # Utility functions
```

## 🎨 Features Implemented

- ✅ Modern landing page with Hero section
- ✅ Features showcase
- ✅ How It Works section
- ✅ Photo upload and preview
- ✅ Enhancement options UI
- ✅ Before/After comparison
- ✅ Pricing page with plans
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Framer Motion animations

## 🔧 Next Steps

1. **AI Integration**: Connect to an AI image enhancement API (e.g., Replicate, Stability AI, or custom model)
2. **Authentication**: Complete Supabase auth setup
3. **Payment**: Integrate Stripe for subscriptions
4. **Dashboard**: Build user dashboard for managing photos
5. **Storage**: Set up Supabase storage for photo uploads
6. **Credit System**: Implement credit tracking and usage

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Type Safety**: TypeScript
- **Code Quality**: ESLint + Prettier

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
