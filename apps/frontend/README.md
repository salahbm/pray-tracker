# 🕌 Pray Tracker

<div align="center">

![Version](https://img.shields.io/badge/version-1.1.0--alpha.1-blue)
![Platform - Android](https://img.shields.io/badge/platform-Android-green)
![Platform - iOS](https://img.shields.io/badge/platform-iOS-black)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive mobile application designed to help Muslims track and maintain their daily prayers with smart features and beautiful UI.

</div>

## ✨ Features

### 🕌 Core Prayer Features

- **Prayer Time Tracking**: Accurate prayer times based on your location
- **Qibla Direction**: Built-in Qibla compass
- **Prayer Logging**: Track your daily prayers with ease
- **Streak System**: Maintain and track your prayer consistency

### 📱 Smart Notifications

- Customizable prayer time reminders
- Streak maintenance alerts
- Local notifications with quick actions
- Offline-first experience

### 🌍 Location Services

- Automatic prayer time adjustments
- Location-based Qibla direction
- Smart timezone handling

### 🌐 Pro Features

- Enhanced statistics and analytics
- Advanced prayer tracking features
- Customizable themes and UI options
- Ad-free experience

### 🔤 Internationalization

- Multi-language support
- RTL layout support
- Localized content and prayer times

## 🛠 Tech Stack

### Core Technologies

- **Framework**: React Native with Expo (v52)
- **Language**: TypeScript
- **Routing**: Expo Router (file-based)
- **Styling**: TailwindCSS (NativeWind v4)
- **Storage**: AsyncStorage for local data persistence

### State Management

- Zustand (Global State)
- React Query (Cache Management)

### Key Libraries

- `adhan`: Prayer time calculations
- `@react-navigation`: Navigation system
- `react-native-purchases`: In-app purchases
- `@gorhom/bottom-sheet`: Interactive bottom sheets
- `react-native-reanimated`: Smooth animations
- `@react-native-async-storage/async-storage`: Local data storage

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm package manager
- iOS/Android development environment

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/pray-tracker.git
cd pray-tracker
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server

```bash
npm start
```

## 📱 Development

### Available Scripts

- `npm start`: Start the Expo development server
- `npm run ios`: Start iOS simulator
- `npm run android`: Start Android emulator
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run test`: Run tests
- `npm run commit`: Create a formatted commit message

### Project Structure

```
pray-tracker/
├── app/                 # Main application code
├── components/          # Reusable UI components
├── constants/          # App configurations
├── hooks/              # Custom React hooks
├── lib/               # Core integrations
├── locales/           # i18n files
├── providers/         # Context providers
├── store/            # State management
├── styles/           # Global styles
└── utils/            # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes using conventional commits (`npm run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Adhan.js](https://github.com/batoulapps/adhan-js) for prayer time calculations
- [Expo](https://expo.dev) for the amazing development platform

---

<div align="center">
Made with ❤️ for the Muslim community
</div>
