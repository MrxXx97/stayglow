# Quick Supabase Connection Guide

## 🔑 Step 1: Get Your API Keys

1. In your Supabase dashboard, click **Settings** (⚙️ gear icon) in the left sidebar
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** - Something like `https://xxxxx.supabase.co`
   - **anon public** key - A long string starting with `eyJ...`

## 📝 Step 2: Create Environment File

Run this command in your terminal (from the project root):

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
EOF
```

Then edit `.env.local` and replace:

- `YOUR_PROJECT_URL_HERE` with your Project URL
- `YOUR_ANON_KEY_HERE` with your anon public key

## 🗄️ Step 3: Set Up Database

1. In Supabase Dashboard, click **SQL Editor** (📝 icon)
2. Click **New Query**
3. Open the file `supabase-schema.sql` in your project
4. Copy ALL the contents
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd+Enter)
7. You should see "Success" message

## 📦 Step 4: Create Storage Buckets

1. Click **Storage** (📁 folder icon) in left sidebar
2. Click **New bucket**
3. Name: `photos` → Make it **Public** → **Create bucket**
4. Click **New bucket** again
5. Name: `enhanced-photos` → Make it **Public** → **Create bucket**

## ✅ Step 5: Test It!

1. Restart your dev server: `npm run dev`
2. Go to: http://localhost:3000/auth/signup
3. Create an account
4. Check Supabase Dashboard > **Auth** > **Users** - you should see your user!

---

**That's it!** Your app is now connected to Supabase! 🎉
