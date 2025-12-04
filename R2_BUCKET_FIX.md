# R2 Bucket Configuration Fix

## Error
```
ERROR Upload failed: {
  "error": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <Error>
      <Code>NoSuchBucket</Code>
      <Message>The specified bucket does not exist.</Message>
    </Error>",
  "status": 404,
  "statusText": ""
}
```

## Root Cause
The R2 bucket name in your `.env` file (`noor-prayer-tracker`) doesn't match an existing bucket in your Cloudflare R2 account.

## Solution

### Option 1: Create the Bucket (Recommended)
1. Log in to your Cloudflare Dashboard
2. Navigate to **R2 Object Storage**
3. Click **Create bucket**
4. Enter the bucket name: `noor-prayer-tracker`
5. Choose your location (closest to your users)
6. Click **Create bucket**

### Option 2: Update Environment Variable
If you already have a bucket with a different name:

1. Find your existing bucket name in Cloudflare R2
2. Update `/apps/backend/.env`:
   ```env
   R2_BUCKET=your-actual-bucket-name
   ```
3. Restart your backend server

## After Creating/Updating the Bucket

### Step 1: Configure CORS (Required)
The bucket needs CORS configuration to allow uploads from your mobile app:

1. In Cloudflare Dashboard, go to your R2 bucket
2. Click on **Settings** tab
3. Scroll to **CORS Policy**
4. Click **Edit CORS Policy**
5. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "*"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

6. Click **Save**

### Step 2: Verify Environment Variables
Make sure all R2-related environment variables are set in `/apps/backend/.env`:

```env
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET=noor-prayer-tracker
```

### Step 3: Restart Backend
```bash
cd apps/backend
npm run start:dev
```

### Step 4: Test Upload
1. Open your mobile app
2. Go to Profile → Edit Profile
3. Try uploading a profile picture
4. Check the console for any errors

## Expected Behavior After Fix

### Successful Upload Flow:
1. **Request presigned URL**: `POST /files/avatar/presign`
   - Returns: `uploadUrl`, `fileKey`, `publicUrl`
2. **Upload to R2**: `PUT` to the presigned URL
   - Should return: `200 OK`
3. **Confirm upload**: `POST /files/avatar/confirm`
   - Updates user record with new image URL
   - Deletes old image if exists
   - Returns: `{ image: string, user: User }`

### Console Logs (Success):
```
LOG LOGGING AGENT 🤖 http://192.168.0.141:4000/files/avatar/presign uz {
  "fileName": "avatar-1764827344554.jpg",
  "contentType": "image/jpeg"
}
✓ Upload successful
✓ Image updated
```

## Troubleshooting

### Issue: Still getting 404 after creating bucket
- **Solution**: Double-check the bucket name matches exactly (case-sensitive)
- **Solution**: Restart your backend server
- **Solution**: Clear any caching in your app

### Issue: Upload succeeds but image doesn't display
- **Solution**: This is expected - presigned URLs expire in 7 days
- **Solution**: Images are refreshed when the user edits their profile
- **Solution**: Consider implementing a background job to refresh URLs

### Issue: CORS errors
- **Solution**: Make sure CORS policy is saved and active
- **Solution**: Try using `"*"` for AllowedOrigins during development
- **Solution**: Check browser/app console for specific CORS error messages

## Security Notes

### Production CORS Configuration
For production, restrict the allowed origins:

```json
{
  "AllowedOrigins": [
    "https://your-production-domain.com",
    "https://api.your-domain.com"
  ],
  "AllowedMethods": ["GET", "PUT", "HEAD"],
  "AllowedHeaders": ["Content-Type", "Content-Length"],
  "ExposeHeaders": ["ETag"],
  "MaxAgeSeconds": 3600
}
```

### Access Keys
- Never commit access keys to version control
- Use environment variables for all sensitive data
- Rotate keys periodically
- Use separate keys for development and production

## Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [R2 CORS Configuration](https://developers.cloudflare.com/r2/api/s3/api/#cors)
- [Presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)
