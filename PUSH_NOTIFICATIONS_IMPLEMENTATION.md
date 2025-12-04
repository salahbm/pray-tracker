# Push Notifications Implementation

## 🎯 Overview

Implemented a complete push notification system for friend-related activities using Expo Push Notifications and a custom NestJS backend service.

---

## 📱 Mobile App (React Native/Expo)

### **1. Push Token Registration**

**Files Created:**

- `hooks/user/useRegisterPushToken.ts` - Hook to register Expo push token with backend
- `hooks/user/useSavePushToken.ts` - Mutation hook to save token via API
- `providers/push-token.tsx` - Provider component that registers token on app start

**How It Works:**

1. When user logs in, `PushTokenProvider` activates
2. Checks if notification permissions are granted
3. Gets Expo push token from device
4. Saves token to backend via `POST /users/me/push-token`
5. Token is stored in User table's `pushToken` field

### **2. Notification Navigation**

**File Updated:**

- `providers/notification-nav.tsx`

**Supported Notification Types:**

- `FRIEND_REQUEST` → Navigate to Friends tab
- `FRIEND_REQUEST_ACCEPTED` → Navigate to Friends tab
- `ADDED_TO_GROUP` → Navigate to Friends tab
- `prayer_reminder` → Navigate to Qibla/Prayer Times tab

**Features:**

- Handles cold start notifications (app closed)
- Handles foreground/background notifications (app open/backgrounded)
- Deep linking support

### **3. Integration**

Updated `providers/root.tsx`:

```tsx
<PushTokenProvider>
  <NotificationNavProvider>{children}</NotificationNavProvider>
</PushTokenProvider>
```

---

## 🔧 Backend (NestJS)

### **1. Database Schema**

**Migration:** `20251204084630_add_push_token_to_user`

Added to User model:

```prisma
model User {
  // ... existing fields
  pushToken String? // Expo push notification token
}
```

### **2. Notifications Service**

**File:** `src/modules/notifications/notifications.service.ts`

**Dependencies:** `expo-server-sdk`

**Methods:**

- `sendPushNotification(userId, title, body, data)` - Core method to send push notifications
- `sendFriendRequestNotification(recipientId, senderName, senderEmail, locale)`
- `sendFriendRequestAcceptedNotification(recipientId, accepterName, locale)`
- `sendAddedToGroupNotification(recipientId, groupName, adderName, locale)`

**Features:**

- Validates Expo push tokens
- Handles notification chunking (Expo requirement)
- Logs errors and successes
- Supports high-priority notifications

### **3. i18n Translations**

**File:** `src/common/i18n/notification-messages.ts`

**Supported Languages:** English, Arabic, Uzbek

**Translation Keys:**

```typescript
FRIEND_REQUEST_TITLE;
FRIEND_REQUEST_BODY; // "{{senderName}} ({{senderEmail}}) sent you a friend request"
FRIEND_REQUEST_ACCEPTED_TITLE;
FRIEND_REQUEST_ACCEPTED_BODY; // "{{accepterName}} accepted your friend request"
ADDED_TO_GROUP_TITLE;
ADDED_TO_GROUP_BODY; // "{{adderName}} added you to {{groupName}}"
```

**Helper Function:**

```typescript
getLocalizedNotification(key, locale, params);
```

### **4. Friends Service Integration**

**File:** `src/modules/friends/friends.service.ts`

**Notifications Triggered:**

1. **Send Friend Request** (`sendFriendRequest`)
   - Sends `FRIEND_REQUEST` notification to recipient
   - Includes sender's name and email

2. **Accept Friend Request** (`acceptFriendRequest`)
   - Sends `FRIEND_REQUEST_ACCEPTED` notification to requester
   - Includes accepter's name

3. **Add Member to Group** (`addMemberToGroup`)
   - Sends `ADDED_TO_GROUP` notification to added member
   - Includes group name and adder's name

### **5. Users API**

**New Endpoint:** `POST /users/me/push-token`

**Request Body:**

```json
{
  "pushToken": "ExponentPushToken[xxxxxxxxxxxxxx]"
}
```

**Response:**

```json
{
  "message": "Push token saved successfully",
  "success": true
}
```

**Controller:** `src/modules/users/user.controller.ts`
**Service Method:** `UsersService.savePushToken(userId, pushToken)`

---

## 🔄 Flow Diagram

### Friend Request Flow:

```
User A sends friend request to User B
    ↓
Backend creates friendship record
    ↓
Backend gets User B's locale and push token
    ↓
NotificationsService sends localized push notification
    ↓
User B receives notification: "🤝 New Friend Request"
    ↓
User B taps notification
    ↓
App navigates to Friends tab
```

### Accept Friend Request Flow:

```
User B accepts friend request
    ↓
Backend updates friendship status to ACCEPTED
    ↓
Backend gets User A's locale and push token
    ↓
NotificationsService sends localized push notification
    ↓
User A receives notification: "✅ Friend Request Accepted"
    ↓
User A taps notification
    ↓
App navigates to Friends tab
```

### Add to Group Flow:

```
User A adds User B to group "Prayer Circle"
    ↓
Backend creates group membership
    ↓
Backend gets User B's locale and push token
    ↓
NotificationsService sends localized push notification
    ↓
User B receives notification: "👥 Added to Group"
    ↓
User B taps notification
    ↓
App navigates to Friends tab
```

---

## 🧪 Testing

### **Mobile Testing:**

1. **Test Token Registration:**
   - Log in to the app
   - Check console for: `✅ Push token registered: ExponentPushToken[...]`
   - Verify token is saved in database

2. **Test Notifications:**
   - Send a friend request from another account
   - Check if notification appears on device
   - Tap notification and verify navigation

3. **Test Localization:**
   - Change app language to Arabic or Uzbek
   - Send friend request
   - Verify notification is in correct language

### **Backend Testing:**

1. **Check Token Storage:**

```sql
SELECT id, name, email, pushToken FROM "user" WHERE pushToken IS NOT NULL;
```

2. **Test Notification Service:**

```typescript
// In a controller or test file
await notificationsService.sendFriendRequestNotification(
  'user-id',
  'John Doe',
  'john@example.com',
  'en'
);
```

3. **Check Logs:**

```
✅ Push notification sent to user {userId}
⚠️ No push token found for user {userId}
⚠️ Invalid Expo push token for user {userId}
```

---

## 📦 Dependencies

### **Backend:**

- `expo-server-sdk` - Expo push notification server SDK

### **Mobile:**

- `expo-notifications` - Already installed
- Uses existing notification permission system

---

## 🔐 Security Considerations

1. **Token Validation:**
   - Backend validates Expo push tokens before sending
   - Invalid tokens are logged but don't crash the app

2. **User Privacy:**
   - Push tokens are only stored for authenticated users
   - Tokens are cleared when user logs out (implement in logout hook)

3. **Locale Safety:**
   - Type-safe locale casting: `(locale as 'en' | 'ar' | 'uz') || 'en'`
   - Fallback to English if locale is invalid

---

## 🚀 Future Enhancements

1. **Token Cleanup:**
   - Clear push token on logout
   - Implement token refresh mechanism

2. **Notification Preferences:**
   - Allow users to disable specific notification types
   - Quiet hours support

3. **Rich Notifications:**
   - Add images/avatars to notifications
   - Action buttons (Accept/Reject directly from notification)

4. **Analytics:**
   - Track notification delivery rates
   - Monitor notification engagement

5. **Additional Notification Types:**
   - Prayer streak reminders
   - Leaderboard updates
   - Group activity notifications

---

## 📝 Notes

- Notifications use the user's preferred locale from their profile
- All notification text is centralized in `notification-messages.ts` for easy future migration to NestJS i18n
- Expo push tokens are device-specific and may change
- The system gracefully handles missing push tokens (users who haven't granted permissions)

---

## ✅ Checklist

- [x] Database schema updated with pushToken field
- [x] Migration created and applied
- [x] Notifications service created with i18n support
- [x] Friends service integrated with notifications
- [x] Users API endpoint for saving push tokens
- [x] Mobile hook for registering push tokens
- [x] Mobile provider for automatic registration
- [x] Notification navigation handler updated
- [x] Translation messages for all notification types
- [x] Support for 3 languages (en, ar, uz)
- [x] Graceful error handling
- [x] Logging for debugging

---

## 🐛 Troubleshooting

### Notifications not received:

1. Check if user has granted notification permissions
2. Verify push token is saved in database
3. Check backend logs for errors
4. Ensure Expo push token is valid format

### Wrong language in notifications:

1. Check user's locale in database
2. Verify translation keys exist in `notification-messages.ts`
3. Check locale fallback logic

### Navigation not working:

1. Verify notification data includes correct `type` field
2. Check `notification-nav.tsx` switch cases
3. Ensure router is properly initialized

---

**Implementation Date:** December 4, 2024
**Status:** ✅ Complete and Ready for Testing
