# Cloudflare R2 CORS Configuration

## Issue
Image uploads are failing with "Failed to upload image" error because the R2 bucket doesn't have CORS (Cross-Origin Resource Sharing) configured. This prevents the mobile app from uploading files directly to R2 using presigned URLs.

## Solution
You need to configure CORS on your R2 bucket to allow uploads from your application.

## Steps to Configure CORS

### 1. Access Cloudflare Dashboard
1. Log in to your Cloudflare account
2. Navigate to **R2** in the sidebar
3. Click on your bucket (e.g., `noon-prayer-tracker`)

### 2. Configure CORS Rules
1. Click on the **Settings** tab
2. Scroll down to **CORS Policy**
3. Click **Edit CORS Policy**
4. Add the following CORS configuration:

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

### 3. Save Configuration
Click **Save** to apply the CORS policy.

## Alternative: More Restrictive CORS (Recommended for Production)

For production, you should restrict the allowed origins to your specific domains:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:8081",
      "http://192.168.0.141:8081",
      "exp://192.168.0.141:8081",
      "https://your-production-domain.com"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "HEAD"
    ],
    "AllowedHeaders": [
      "Content-Type",
      "Content-Length"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

## Verification

After configuring CORS:

1. Restart your mobile app
2. Try uploading an image again
3. Check the console logs for detailed error messages if it still fails

## Common Issues

### Issue: Still getting CORS errors
- **Solution**: Make sure you saved the CORS policy and it's active
- **Solution**: Clear your app cache and restart
- **Solution**: Check that the bucket name in your environment variables matches the bucket with CORS configured

### Issue: Uploads work but images don't display
- **Solution**: This is a different issue - make sure your R2 bucket has public access enabled or you're using presigned URLs for viewing (which we are)

## Additional Notes

- The presigned URLs for **uploading** expire in 5 minutes (300 seconds)
- The presigned URLs for **viewing** expire in 7 days (604,800 seconds)
- If users don't update their profile picture often, the 7-day expiration should be sufficient
- Consider implementing a background job to refresh presigned URLs for images that are about to expire

## Testing

To test if CORS is working:

1. Open the mobile app
2. Go to Edit Profile
3. Try to upload a new profile picture
4. Check the console logs - you should see detailed error information if it fails
5. If successful, the image should upload and display immediately
