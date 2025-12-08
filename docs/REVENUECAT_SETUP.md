# RevenueCat Integration Setup Guide

This guide will help you set up RevenueCat for the Noor Pray Tracker app to enable in-app subscriptions.

## 📋 Prerequisites

- RevenueCat account (sign up at https://app.revenuecat.com/)
- Apple Developer account (for iOS)
- Google Play Console account (for Android)

## 🚀 Setup Steps

### 1. RevenueCat Dashboard Setup

#### Create a New Project

1. Go to https://app.revenuecat.com/
2. Click "Create New Project"
3. Name it "Noor Pray Tracker"

#### Add Your Apps

1. In your project, go to **Project Settings** → **Apps**
2. Click **Add App**

**For iOS:**

- App Name: Noor Pray Tracker iOS
- Bundle ID: Your iOS bundle ID (e.g., `com.noor.praytracker`)
- Platform: iOS
- Get your **iOS API Key** and save it

**For Android:**

- App Name: Noor Pray Tracker Android
- Package Name: Your Android package name (e.g., `com.noor.praytracker`)
- Platform: Android
- Get your **Android API Key** and save it

### 2. Create Products in App Store Connect / Google Play Console

#### iOS - App Store Connect

1. Go to https://appstoreconnect.apple.com/
2. Select your app
3. Go to **Features** → **In-App Purchases**
4. Create two **Auto-Renewable Subscriptions**:

**Monthly Subscription:**

- Product ID: `noor_monthly_premium`
- Reference Name: Noor Premium Monthly
- Subscription Group: Premium
- Price: $4.99/month

**Yearly Subscription:**

- Product ID: `noor_annual_premium`
- Reference Name: Noor Premium Yearly
- Subscription Group: Premium
- Price: $54.99/year

#### Android - Google Play Console

1. Go to https://play.google.com/console/
2. Select your app
3. Go to **Monetize** → **Subscriptions**
4. Create two subscriptions:

**Monthly Subscription:**

- Product ID: `noor_monthly_premium`
- Name: Noor Premium Monthly
- Price: $4.99/month

**Yearly Subscription:**

- Product ID: `noor_annual_premium`
- Name: Noor Premium Yearly
- Price: $54.99/year

### 3. Configure Products in RevenueCat

1. In RevenueCat dashboard, go to **Products**
2. Click **Add Product**
3. Add both products:
   - `noor_monthly_premium` (iOS & Android)
   - `noor_annual_premium` (iOS & Android)

### 4. Create Entitlements

1. Go to **Entitlements** in RevenueCat
2. Click **Create Entitlement**
3. Create an entitlement called `premium`
4. Attach both products to this entitlement

### 5. Create Offerings

1. Go to **Offerings** in RevenueCat
2. Click **Create Offering**
3. Create a "default" offering
4. Add both packages:
   - Monthly package → `noor_monthly_premium`
   - Yearly package → `noor_annual_premium`
5. Make this the **Current Offering**

### 6. Configure Webhook (Backend Integration)

1. In RevenueCat dashboard, go to **Integrations** → **Webhooks**
2. Click **Add Webhook**
3. Configure:
   - URL: `https://your-backend-url.com/subscriptions/webhook`
   - Authorization Header: Create a strong secret and save it
   - Events: Select all events (or at minimum: INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION)

### 7. Update Environment Variables

#### Mobile App (.env)

Create or update `apps/mobile/.env`:

```bash
EXPO_PUBLIC_API_URL=https://your-backend-url.com
EXPO_PUBLIC_REVENUECAT_IOS_KEY=your_ios_api_key_from_step_1
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=your_android_api_key_from_step_1
```

#### Backend (.env)

Update `apps/backend/.env`:

```bash
REVENUECAT_WEBHOOK_SECRET=your_webhook_secret_from_step_6
```

### 8. Run Database Migration

```bash
cd apps/backend
npx prisma migrate dev --name add_subscriptions
npx prisma generate
```

### 9. Initialize RevenueCat in Your App

The initialization is already set up in the codebase. When a user logs in, RevenueCat will automatically be initialized with their user ID.

## 🧪 Testing

### Test with Sandbox Accounts

#### iOS

1. Create a sandbox tester in App Store Connect
2. Sign out of your Apple ID on the device
3. When prompted during purchase, sign in with sandbox account

#### Android

1. Add test accounts in Google Play Console
2. Install the app via internal testing track
3. Make test purchases

### Test Webhook Locally

Use a tool like ngrok to expose your local backend:

```bash
ngrok http 4000
```

Then update the webhook URL in RevenueCat to your ngrok URL.

## 📱 Usage in Code

### Check Premium Status

```typescript
import { useSubscription } from '@/hooks/subscriptions/useSubscription';
import { useAuthStore } from '@/store/auth/auth-session';

function MyComponent() {
  const { user } = useAuthStore();
  const { data: subscription } = useSubscription(user?.id);

  if (subscription?.isPremium) {
    // Show premium content
  } else {
    // Show upgrade prompt
  }
}
```

### Use Premium Guard

```typescript
import { PremiumGuard } from '@/components/shared/premium-guard';

function PremiumFeature() {
  return (
    <PremiumGuard>
      {/* Your premium content here */}
    </PremiumGuard>
  );
}
```

### Navigate to Paywall

```typescript
import { useRouter } from 'expo-router';

function MyComponent() {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push('/subscription/paywall');
  };
}
```

## 🔐 Security Notes

1. **Never commit API keys** - Keep them in `.env` files (already in `.gitignore`)
2. **Webhook Secret** - Use a strong, random secret for webhook authentication
3. **Server-Side Validation** - Always validate subscriptions on the backend
4. **User ID Mapping** - RevenueCat uses your user IDs to track subscriptions

## 📊 Monitoring

1. **RevenueCat Dashboard** - Monitor subscriptions, revenue, and churn
2. **Backend Logs** - Check subscription service logs for webhook events
3. **Database** - Query the `subscription` table for user subscription status

## 🐛 Troubleshooting

### Offerings Not Loading

- Check API keys are correct
- Verify offerings are set as "Current" in RevenueCat
- Check network connectivity

### Webhook Not Receiving Events

- Verify webhook URL is publicly accessible
- Check authorization header matches your secret
- Review RevenueCat webhook logs

### Purchase Not Reflecting in App

- Check webhook is configured correctly
- Verify database migration ran successfully
- Check backend logs for errors

## 📚 Resources

- [RevenueCat Documentation](https://docs.revenuecat.com/)
- [React Native Purchases SDK](https://github.com/RevenueCat/react-native-purchases)
- [App Store Connect](https://appstoreconnect.apple.com/)
- [Google Play Console](https://play.google.com/console/)

## 💰 Subscription Plans

- **Monthly**: $4.99/month
- **Yearly**: $54.99/year (Save $5 - equivalent to 2 months free!)

## ✨ Premium Features

- Unlimited Friends
- Create Friend Groups
- Detailed Prayer Statistics
- Advanced Prayer Reminders
- Custom Themes
- Ad-Free Experience
- Priority Support

---

**Need Help?** Contact the development team or refer to the RevenueCat documentation.
