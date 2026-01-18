# Vercel Deployment Setup Guide

## ✅ What's Done

- ✅ GitHub repository connected
- ✅ Project deployed to Vercel
- ✅ Storage buckets created in Supabase

## 🔧 Fix the 404 Error

The 404 error is happening because Vercel doesn't have your Supabase environment variables.

### Step 1: Add Environment Variables in Vercel

1. Go to your Vercel project: https://vercel.com/stayglows-projects/stayglows
2. Click on **"Settings"** in the top navigation
3. Click on **"Environment Variables"** in the left sidebar
4. Add these two variables:

   **Variable 1:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://llriavbwgnyexvxuaour.supabase.co`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** `sb_publishable_9NPR9XPYxCc8QnMJ34U_UQ_r5NQEuMH`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

### Step 2: Redeploy

After adding the environment variables:

1. Go to the **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Or simply push a new commit to trigger a new deployment

### Step 3: Verify It's Working

After redeployment:

1. Wait for the build to complete (usually 1-2 minutes)
2. Click on your deployment URL: `stayglows.vercel.app`
3. You should see your PhotoBoost landing page instead of 404!

## 🎯 Quick Checklist

- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to Vercel
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
- [ ] Redeployed the application
- [ ] Verified the site loads correctly

## 📝 Notes

- Environment variables are case-sensitive
- Make sure to select all environments (Production, Preview, Development)
- After adding variables, you MUST redeploy for them to take effect
- Your local `.env.local` file is separate from Vercel's environment variables

---

**Once you add the environment variables and redeploy, your site should work!** 🚀
