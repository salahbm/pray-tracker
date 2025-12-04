# Prayer Notifications Implementation

## ✅ Completed Features

### 1. **User-Configurable Notification Settings**

- **File**: `store/defaults/notification.ts`
- Users can set how many minutes before prayer they want to be notified (0-120 minutes)
- Settings persist to AsyncStorage
- Default: 10 minutes before prayer

### 2. **Comprehensive Notification System**

- **File**: `lib/prayer-notifications.ts`
- Consolidated all notification logic into one file
- Handles permissions, scheduling, and cancellation
- Beautiful locale-aware notifications with prayer-specific emojis
- All text comes from i18n translations (`locales/en.json`)

### 3. **Beautiful Notification Content**

- Prayer-specific emojis: 🌅 Fajr, ☀️ Sunrise, 🌞 Dhuhr, 🌤️ Asr, 🌆 Maghrib, 🌙 Isha
- Dynamic messages based on timing:
  - "It's time for Fajr prayer - 05:30" (when minutesBefore = 0)
  - "Fajr prayer in 10 minutes - 05:30" (when minutesBefore = 10)
- Fully translatable via i18n

### 4. **Settings UI**

- **File**: `components/views/qibla/pray-notifier-sheet.tsx`
- Beautiful bottom sheet with animations
- Plus/Minus buttons to adjust minutes (0-120 range)
- Real-time preview of settings
- Success/error toasts on save

### 5. **Automatic Rescheduling**

- **File**: `hooks/common/useTimeLeft.ts`
- Notifications automatically reschedule when:
  - App starts
  - User changes settings
  - Prayer times are updated
- Uses React Native's DeviceEventEmitter for cross-platform event handling

## 📱 How It Works

1. **User opens settings** → Bottom sheet appears with current minutes setting
2. **User adjusts minutes** → Counter updates with smooth animations
3. **User saves** → Settings persist + DeviceEventEmitter fires event
4. **useTimeLeft hook listens** → Cancels old notifications + schedules new ones
5. **Notifications fire** → Beautiful, localized notifications appear at the right time

## 🔑 Key Files

| File                                             | Purpose                                                |
| ------------------------------------------------ | ------------------------------------------------------ |
| `lib/prayer-notifications.ts`                    | All notification logic (permissions, scheduling, i18n) |
| `store/defaults/notification.ts`                 | Persistent settings store                              |
| `hooks/common/useTimeLeft.ts`                    | Auto-scheduling and event listening                    |
| `components/views/qibla/pray-notifier-sheet.tsx` | Settings UI                                            |
| `locales/en.json`                                | All notification translations                          |

## 🧪 Testing

### Test Notifications Manually

```typescript
import { sendTestPrayerNotification, getScheduledNotifications } from '@/lib/prayer-notifications';

// Send immediate test notification
await sendTestPrayerNotification();

// View all scheduled notifications
await getScheduledNotifications();
```

### Check Logs

Look for these console messages:

- ✅ Notification permissions granted
- 📥 Scheduling Fajr: prayer at 05:30, notification at 05:20 (10 min before)
- ✅ Scheduled 6 prayer notifications (10 min before)
- 🔔 Prayer notification settings updated, rescheduling...

## 🌍 i18n Support

All notification text is in `locales/en.json` under `common.notifications.prayer`:

- `title`: "{{emoji}} {{prayer}} Prayer Reminder"
- `bodyNow`: "It's time for {{prayer}} prayer - {{time}}"
- `bodyBefore`: "{{prayer}} prayer in {{minutes}} minute{{plural}} - {{time}}"
- `test.title`: "🕌 Prayer Notifications Test"
- `test.body`: "Your prayer notifications are working correctly! 🎉"

Emojis are also translatable under `common.notifications.emojis`.

## 🐛 Troubleshooting

### Notifications not appearing?

1. Check device notification permissions (Settings → App → Notifications)
2. Ensure notification time is in the future (check logs for "Skipping" messages)
3. On iOS Simulator, notifications won't appear (test on real device)
4. Call `getScheduledNotifications()` to verify notifications are scheduled

### Settings not saving?

1. Check console for "Error saving prayer notification settings"
2. Verify AsyncStorage is working
3. Check DeviceEventEmitter is firing (look for "🔔 Prayer notification settings updated")

## 📝 Translation Keys Added

```json
{
  "common": {
    "notifications": {
      "prayer": {
        "title": "{{emoji}} {{prayer}} Prayer Reminder",
        "bodyNow": "It's time for {{prayer}} prayer - {{time}}",
        "bodyBefore": "{{prayer}} prayer in {{minutes}} minute{{plural}} - {{time}}",
        "test": {
          "title": "🕌 Prayer Notifications Test",
          "body": "Your prayer notifications are working correctly! 🎉"
        }
      },
      "emojis": {
        "fajr": "🌅",
        "sunrise": "☀️",
        "dhuhr": "🌞",
        "asr": "🌤️",
        "maghrib": "🌆",
        "isha": "🌙",
        "default": "🕌"
      }
    }
  },
  "qibla": {
    "prayerTimes": {
      "notifier": {
        "success": {
          "message": "Prayer reminders set to {{minutes}} minutes before prayer time"
        },
        "error": {
          "message": "Failed to save prayer reminder settings. Please try again."
        }
      }
    }
  }
}
```

## ✨ Next Steps (Optional Enhancements)

- [ ] Add toggle to enable/disable notifications
- [ ] Different notification times for different prayers
- [ ] Custom notification sounds
- [ ] Notification history/logs
- [ ] Widget support for iOS/Android
