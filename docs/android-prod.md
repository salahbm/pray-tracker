````md
# Android local release signing + rebuild (safe)

## 1. Move keystore out of android

```bash
mv android/noor.keystore from root
```
````

## 2. android/gradle.properties

```properties
MYAPP_UPLOAD_STORE_FILE=noor.keystore
MYAPP_UPLOAD_KEY_ALIAS=noor
MYAPP_UPLOAD_STORE_PASSWORD=YOUR_PASSWORD
MYAPP_UPLOAD_KEY_PASSWORD=YOUR_PASSWORD
```

## 3. android/app/build.gradle

```gradle
android {
  signingConfigs {
    release {
      if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
      }
    }
  }

  buildTypes {
    release {
      signingConfig signingConfigs.release
    }
  }
}
```

## 4. Remove ACTIVITY_RECOGNITION

android/app/src/main/AndroidManifest.xml

```xml
<uses-permission
  android:name="android.permission.ACTIVITY_RECOGNITION"
  tools:node="remove"/>
```

## Add these in android/app/src/main/res/values/strings.xml

```xml
<resources>
  <string name="app_name">Noor</string>

  <string name="home">Home</string>
  <string name="auth">Auth</string>
  <string name="profile">Profile</string>
  <string name="friends">Friends</string>
  <string name="leaderboard">Leaderboard</string>
  <string name="qibla">Qibla</string>
  <string name="common">Common</string>
  <string name="subscription">Subscription</string>
  <string name="location">Location</string>
  <string name="ramadan">Ramadan</string>
  <string name="onboardingFlow">OnboardingFlow</string>

  <string name="expo_system_ui_user_interface_style" translatable="false">automatic</string>
  <string name="expo_splash_screen_resize_mode" translatable="false">cover</string>
  <string name="expo_splash_screen_status_bar_translucent" translatable="false">false</string>
</resources>
```

## 5. Build

```bash
cd android
./gradlew clean
./gradlew app:bundleRelease
```

## 6. Verify

```bash
grep ACTIVITY app/build/intermediates/merged_manifest/release/processReleaseMainManifest/AndroidManifest.xml
```

## 7. Output

```
android/app/build/outputs/bundle/release/app-release.aab
```

```

```
