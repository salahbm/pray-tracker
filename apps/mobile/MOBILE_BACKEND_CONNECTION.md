# Mobile App - Backend Connection Guide

## Issues Fixed

### 1. ✅ Wrong API Endpoint
**Problem**: The mobile app was calling `/api/auth/signup` but Better Auth uses `/api/auth/sign-up/email`

**Fixed in**: `hooks/auth/useSignUp.ts`
```typescript
// Before
agent.post('/api/auth/signup', params)

// After  
agent.post('/api/auth/sign-up/email', params)
```

### 2. ✅ Incorrect IP Address
**Problem**: The `app.json` had an old IP address (`172.30.1.86`) that doesn't match your current network

**Fixed in**: `app.json`
```json
{
  "extra": {
    "apiUrl": "http://192.168.200.144:4000"
  }
}
```

## How to Connect Mobile App to Backend

### Step 1: Find Your Computer's IP Address

```bash
# On macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# On Windows
ipconfig | findstr IPv4
```

Your current IP: `192.168.200.144`

### Step 2: Update app.json

Update the `apiUrl` in `apps/mobile/app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://YOUR_IP_ADDRESS:4000"
    }
  }
}
```

### Step 3: Start the Backend

```bash
cd apps/backend
npm run dev
```

The backend should be running on `http://localhost:4000`

### Step 4: Restart Expo

After changing `app.json`, you MUST restart the Expo development server:

```bash
# Stop the current Expo server (Ctrl+C)
# Then restart
cd apps/mobile
npx expo start --clear
```

### Step 5: Test the Connection

You can test if the backend is reachable from your mobile device:

```bash
# From your computer
curl http://192.168.200.144:4000/api/auth/session

# Should return something like:
# {"message":"Unauthorized"} or similar
```

## Common Issues & Solutions

### Issue 1: "Network request failed"

**Causes**:
1. Backend not running
2. Wrong IP address in `app.json`
3. Firewall blocking connections
4. Mobile device on different network

**Solutions**:
1. Make sure backend is running: `cd apps/backend && npm run dev`
2. Verify IP address matches your computer's current IP
3. Check firewall settings (allow port 4000)
4. Ensure mobile device and computer are on the same WiFi network

### Issue 2: "Connection refused"

**Causes**:
1. Backend not running on port 4000
2. Port 4000 is blocked

**Solutions**:
1. Check backend logs for the port it's running on
2. Try accessing `http://YOUR_IP:4000` from your mobile browser
3. Check if another app is using port 4000

### Issue 3: "Timeout"

**Causes**:
1. Firewall blocking connections
2. Different network (mobile data vs WiFi)

**Solutions**:
1. Temporarily disable firewall to test
2. Make sure both devices are on the same WiFi
3. Try using your computer's hostname instead of IP

### Issue 4: Changes not reflecting

**Cause**: Expo cache

**Solution**:
```bash
# Clear Expo cache and restart
npx expo start --clear
```

## Network Configuration

### For Development (Same WiFi)

Use your computer's local IP address:
```json
"apiUrl": "http://192.168.200.144:4000"
```

### For iOS Simulator

You can use localhost:
```json
"apiUrl": "http://localhost:4000"
```

### For Android Emulator

Use the special Android emulator IP:
```json
"apiUrl": "http://10.0.2.2:4000"
```

### For Production

Use your deployed backend URL:
```json
"apiUrl": "https://api.yourapp.com"
```

## Testing the Connection

### Test 1: Backend Health Check

```bash
curl http://192.168.200.144:4000/api/auth/session
```

Expected: Any response (even error) means backend is reachable

### Test 2: Sign Up Request

```bash
curl -X POST http://192.168.200.144:4000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected: User created or validation error

### Test 3: From Mobile Browser

Open your mobile browser and navigate to:
```
http://192.168.200.144:4000/api/auth/session
```

If you see any response (even an error), the connection works!

## Debugging Tips

### 1. Check Agent Logs

The agent logs the URL it's calling. Look for:
```
file: agent.ts:113 ~ url: http://192.168.200.144:4000/api/auth/sign-up/email
```

### 2. Enable Network Debugging

In your mobile app, check the console for:
- `Mutation error:` messages
- Network request logs
- API response errors

### 3. Test with Postman/Insomnia

Before testing with the mobile app, verify the backend works with Postman:
1. POST to `http://192.168.200.144:4000/api/auth/sign-up/email`
2. Body: `{ "name": "Test", "email": "test@test.com", "password": "password123" }`
3. Should return user data or validation error

### 4. Check Backend Logs

Watch the backend console for incoming requests:
```bash
cd apps/backend
npm run dev
```

You should see logs when requests come in.

## Environment-Specific Configuration

### Option 1: Use Environment Variables (Recommended)

Create `.env.local` in `apps/mobile/`:
```env
EXPO_PUBLIC_API_URL=http://192.168.200.144:4000
```

Then in `app.json`:
```json
"extra": {
  "apiUrl": "${EXPO_PUBLIC_API_URL}"
}
```

### Option 2: Use Different Configs per Environment

Create multiple config files:
- `app.config.dev.js` - Development
- `app.config.staging.js` - Staging
- `app.config.prod.js` - Production

## Current Configuration

✅ **Backend URL**: `http://192.168.200.144:4000`
✅ **Sign Up Endpoint**: `/api/auth/sign-up/email`
✅ **Sign In Endpoint**: `/api/auth/sign-in/email`
✅ **Backend Port**: `4000`
✅ **Your IP**: `192.168.200.144`

## Next Steps

1. **Restart Expo** after the changes:
   ```bash
   npx expo start --clear
   ```

2. **Make sure backend is running**:
   ```bash
   cd apps/backend
   npm run dev
   ```

3. **Test sign up** from the mobile app

4. **Check logs** in both Expo and backend consoles

## Quick Checklist

Before testing, verify:

- [ ] Backend is running (`npm run dev` in apps/backend)
- [ ] Backend is accessible at `http://192.168.200.144:4000`
- [ ] `app.json` has correct IP address
- [ ] Expo server restarted with `--clear` flag
- [ ] Mobile device and computer on same WiFi
- [ ] No firewall blocking port 4000
- [ ] Correct endpoint: `/api/auth/sign-up/email`

## Support

If you still have issues:

1. Check backend logs for incoming requests
2. Check mobile console for network errors
3. Try accessing backend from mobile browser
4. Verify IP address hasn't changed
5. Test with curl from terminal first

---

**Last Updated**: 2025-10-18
**Your IP**: 192.168.200.144
**Backend Port**: 4000
