# Storage Buckets Setup Guide

## Step 1: Create Storage Buckets

1. In Supabase Dashboard, click **Storage** (📁 folder icon) in the left sidebar
2. Click the green **"New bucket"** button
3. **First Bucket:**
   - **Name:** `photos`
   - **Public bucket:** ✅ Check this box (IMPORTANT!)
   - **File size limit:** Optional (e.g., 10MB)
   - Click **"Create bucket"**
4. **Second Bucket:**
   - Click **"New bucket"** again
   - **Name:** `enhanced-photos`
   - **Public bucket:** ✅ Check this box (IMPORTANT!)
   - **File size limit:** Optional
   - Click **"Create bucket"**

## Step 2: Set Storage Policies

For each bucket (`photos` and `enhanced-photos`):

1. Click on the bucket name to open it
2. Click on the **"Policies"** tab
3. Click **"New Policy"**
4. Select **"For full customization"**
5. **Policy Name:** `Allow authenticated uploads`
6. **Policy Definition:** Paste this SQL:

```sql
(bucket_id = 'photos'::text AND auth.role() = 'authenticated'::text)
```

**Note:** Change `'photos'` to `'enhanced-photos'` for the second bucket.

7. **Allowed Operations:** Select all:
   - ✅ SELECT
   - ✅ INSERT
   - ✅ UPDATE
   - ✅ DELETE

8. Click **"Review"** then **"Save policy"**

## Step 3: Verify Setup

After creating both buckets, you should see:

- `photos` bucket (public)
- `enhanced-photos` bucket (public)

Both should have policies allowing authenticated users to upload/download.

---

**That's it!** Your storage is ready for photo uploads! 🎉
