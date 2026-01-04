# Google OAuth Setup Guide for These Streets

Google OAuth is currently **not configured** and will be blocked until you complete the setup in your Supabase dashboard.

## Step-by-Step Setup Instructions

### 1. Configure Google OAuth in Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **supabase-orange-mountain** (jbkyezkphraajkqmtjsm)
3. Navigate to **Authentication** → **Providers** in the left sidebar
4. Find **Google** in the list of providers
5. Toggle **Enable Google** to ON

### 2. Get Google OAuth Credentials

You need to create OAuth credentials in Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the consent screen if prompted
6. For Application Type, select **Web application**
7. Add authorized redirect URIs:
   - `https://jbkyezkphraajkqmtjsm.supabase.co/auth/v1/callback`
   - For local development: `http://localhost:3000/auth/callback`

### 3. Add Credentials to Supabase

1. Copy the **Client ID** and **Client Secret** from Google Cloud Console
2. Go back to Supabase Dashboard → Authentication → Providers → Google
3. Paste the credentials into the respective fields
4. Click **Save**

### 4. Test the Integration

1. Restart your Next.js app if it's running
2. Go to the `/auth` page
3. Click the "Google" button
4. You should be redirected to Google's login page
5. After successful login, you'll be redirected back to your app

## Alternative: Use Email/Password Only

If you don't want to set up Google OAuth right now, you can:
- Remove the Google button from the auth page
- Use only email/password authentication (already working)

## Troubleshooting

**Error: "Google sign-in failed"**
- Make sure you've enabled Google provider in Supabase
- Verify your redirect URIs match exactly
- Check that your Google OAuth credentials are correct

**Error: "redirect_uri_mismatch"**
- The redirect URI in Google Cloud Console must match your Supabase callback URL exactly
- Make sure there are no extra spaces or trailing slashes

**Still not working?**
- Check Supabase logs: Dashboard → Logs → Auth Logs
- Verify your environment variables are set correctly
- Make sure your Supabase project is not paused
