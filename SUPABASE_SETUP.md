# Supabase Setup Guide for PhotoBoost

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: "danielkrucay69@gmail.com's Project"
3. Click on **Settings** (gear icon) in the left sidebar
4. Click on **API** in the settings menu
5. You'll see:
   - **Project URL** - Copy this
   - **anon public** key - Copy this (under "Project API keys")

## Step 2: Create Environment Variables File

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Replace `your_project_url_here` and `your_anon_key_here` with your actual values from Step 1.

## Step 3: Set Up Database Schema

1. In Supabase Dashboard, click on **SQL Editor** (in left sidebar)
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL Editor
5. Click **Run** (or press Cmd+Enter)
6. You should see "Success. No rows returned"

This will create:

- `profiles` table
- `photos` table
- `credit_transactions` table
- `subscriptions` table
- Security policies (RLS)
- Triggers for automatic profile creation and credit deduction

## Step 4: Set Up Storage Buckets

1. In Supabase Dashboard, click on **Storage** (folder icon in left sidebar)
2. Click **New bucket**
3. Create bucket named: `photos`
   - Make it **Public**
   - Enable **File size limit** (optional, e.g., 10MB)
   - Click **Create bucket**
4. Create another bucket named: `enhanced-photos`
   - Make it **Public**
   - Enable **File size limit** (optional)
   - Click **Create bucket**

### Set Storage Policies

For each bucket (`photos` and `enhanced-photos`):

1. Click on the bucket name
2. Go to **Policies** tab
3. Click **New Policy**
4. Select **For full customization**
5. Add this policy:

**Policy Name:** Allow authenticated uploads
**Policy Definition:**

```sql
( bucket_id = 'photos'::text AND auth.role() = 'authenticated'::text )
```

**Allowed Operations:** SELECT, INSERT, UPDATE, DELETE

6. Click **Review** then **Save policy**

## Step 5: Verify Connection

1. Make sure your `.env.local` file is created with correct values
2. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```
3. Try signing up at: http://localhost:3000/auth/signup
4. Check Supabase Dashboard > **Auth** > **Users** - you should see your new user
5. Check Supabase Dashboard > **Database** > **Tables** > **profiles** - you should see your profile

## Step 6: Test the Connection

After setup, test these features:

1. **Sign Up** - Create a new account
2. **Login** - Sign in with your account
3. **Dashboard** - View your dashboard (should show 5 free credits)
4. **Database** - Check Supabase to see your profile was created

## Troubleshooting

### Error: "Invalid API key"

- Double-check your `.env.local` file
- Make sure you copied the **anon public** key (not the service_role key)
- Restart your dev server after changing `.env.local`

### Error: "relation does not exist"

- Make sure you ran the SQL schema in Step 3
- Check that all tables were created in Database > Tables

### Error: "permission denied"

- Check that RLS policies were created
- Verify storage bucket policies are set up

### Photos not uploading

- Check storage bucket exists and is public
- Verify storage policies allow authenticated uploads
- Check file size limits

## Next Steps

After setup is complete:

1. ✅ Test authentication (signup/login)
2. ✅ Connect AI enhancement API
3. ✅ Implement photo upload
4. ✅ Build photo gallery

---

**Need Help?** Check the Supabase documentation: https://supabase.com/docs
