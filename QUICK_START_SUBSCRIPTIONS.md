# 🚀 Quick Start: RevenueCat Subscriptions

## ✅ What's Already Done

All code is implemented and ready! Here's what you have:

### Backend ✅
- ✅ Database schema with Subscription model
- ✅ Migration completed and applied
- ✅ Subscription service with webhook handling
- ✅ API endpoints for status checking
- ✅ Module integrated into app

### Mobile ✅
- ✅ RevenueCat SDK installed (`react-native-purchases`)
- ✅ Beautiful paywall screen with animations
- ✅ Premium guard component
- ✅ Subscription hooks and utilities
- ✅ All translations added
- ✅ Freemium component updated

## 🎯 What You Need to Do

### 1. Get RevenueCat API Keys (15 minutes)

1. Sign up at https://app.revenuecat.com/
2. Create project "Noor Pray Tracker"
3. Add iOS app → Get iOS API Key
4. Add Android app → Get Android API Key
5. Save both keys

### 2. Configure Environment Variables (2 minutes)

**Mobile** (`apps/mobile/.env`):
```bash
EXPO_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_xxxxxxxxxxxxx
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_xxxxxxxxxxxxx
```

**Backend** (`apps/backend/.env`):
```bash
REVENUECAT_WEBHOOK_SECRET=your_strong_secret_here
```

### 3. Create Products in App Stores (30 minutes)

#### iOS - App Store Connect
1. Go to https://appstoreconnect.apple.com/
2. Create auto-renewable subscriptions:
   - `noor_monthly_4.99` → $4.99/month
   - `noor_yearly_54.99` → $54.99/year

#### Android - Google Play Console
1. Go to https://play.google.com/console/
2. Create subscriptions:
   - `noor_monthly_4.99` → $4.99/month
   - `noor_yearly_54.99` → $54.99/year

### 4. Configure RevenueCat Dashboard (10 minutes)

1. **Products**: Add both product IDs
2. **Entitlements**: Create "premium" entitlement
3. **Offerings**: Create "default" offering with both packages
4. **Webhook**: Add webhook URL: `https://your-api.com/subscriptions/webhook`

### 5. Initialize RevenueCat in App (5 minutes)

Add to your app's root layout or App.tsx:

```typescript
import { useEffect } from 'react';
import { initializeRevenueCat, setRevenueCatUserId } from '@/lib/revenuecat';
import { useAuthStore } from '@/store/auth/auth-session';

export default function RootLayout() {
  const { user } = useAuthStore();

  // Initialize on app start
  useEffect(() => {
    initializeRevenueCat();
  }, []);

  // Set user ID after login
  useEffect(() => {
    if (user?.id) {
      setRevenueCatUserId(user.id);
    }
  }, [user?.id]);

  // ... rest of your layout
}
```

### 6. Test! (10 minutes)

1. Run your app: `pnpm dev` (in mobile folder)
2. Navigate to a premium feature
3. Tap "Upgrade to Premium"
4. See the beautiful paywall! 🎉

## 📱 How to Use in Your Code

### Check if User is Premium

```typescript
import { useSubscription } from '@/hooks/subscriptions/useSubscription';
import { useAuthStore } from '@/store/auth/auth-session';

function MyComponent() {
  const { user } = useAuthStore();
  const { data: subscription } = useSubscription(user?.id);

  if (subscription?.isPremium) {
    return <PremiumContent />;
  }
  
  return <FreeContent />;
}
```

### Protect Premium Features

```typescript
import { PremiumGuard } from '@/components/shared/premium-guard';

function FriendGroupsScreen() {
  return (
    <PremiumGuard>
      <YourPremiumFeature />
    </PremiumGuard>
  );
}
```

### Show Paywall

```typescript
import { useRouter } from 'expo-router';

function MyComponent() {
  const router = useRouter();
  
  const handleUpgrade = () => {
    router.push('/subscription/paywall');
  };
}
```

## 🎨 UI Components Available

1. **Paywall Screen**: `/subscription/paywall`
   - Plan selection (monthly/yearly)
   - Feature list
   - Purchase & restore buttons
   - Beautiful animations

2. **Premium Guard**: `<PremiumGuard>`
   - Wraps premium content
   - Shows upgrade prompt for free users

3. **Premium Badge**: `<PremiumBadge size="sm|md|lg" />`
   - Shows "Premium" badge with crown icon

## 💰 Pricing

- **Monthly**: $4.99/month
- **Yearly**: $54.99/year (Save $5!)

## 📚 Full Documentation

- **Setup Guide**: `REVENUECAT_SETUP.md` (detailed RevenueCat configuration)
- **Implementation**: `SUBSCRIPTION_IMPLEMENTATION.md` (technical details)

## 🆘 Quick Troubleshooting

**Offerings not loading?**
- Check API keys in `.env`
- Verify offerings are "Current" in RevenueCat

**Webhook not working?**
- Use ngrok for local testing: `ngrok http 4000`
- Update webhook URL in RevenueCat

**Purchase not reflecting?**
- Check backend logs
- Verify webhook secret matches

## ✨ Premium Features

Your users get:
- ✅ Unlimited Friends
- ✅ Friend Groups
- ✅ Detailed Statistics
- ✅ Advanced Reminders
- ✅ Custom Themes
- ✅ Ad-Free Experience
- ✅ Priority Support

---

**That's it!** Follow steps 1-6 above and you're ready to accept subscriptions! 🎉

For detailed setup instructions, see `REVENUECAT_SETUP.md`.
