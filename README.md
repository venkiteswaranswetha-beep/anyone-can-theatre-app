# 🎭 Anyone Can Theatre (ACT) App

> **Democratizing theatre through AI-powered scene generation, community sharing, and interactive coaching**

A revolutionary mobile app that makes theatre accessible to everyone, regardless of experience level. Built with React Native, powered by OpenAI GPT-4, and designed for creative expression.

## ✨ Features

### 🎬 Core Functionality
- **AI Scene Generator**: Custom scenes based on theme, emotion, and character count
- **Multi-Mode Performance**: Solo, duo, and group scene options
- **Voice & Emotion Coaching**: Interactive exercises for skill development
- **Community Stage**: Share performances and participate in daily challenges
- **AI Co-Actor Mode**: Practice with AI partners (Premium feature)

### 🎯 Key Highlights
- **Beginner-Friendly**: No theatre experience required
- **AI-Powered**: Personalized scene generation using GPT-4
- **Community-Driven**: Daily challenges and social features
- **Professional Coaching**: Voice exercises and acting tips
- **Cross-Platform**: iOS and Android support

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Studio

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/venkiteswaranswetha-beep/anyone-can-theatre-app.git
   cd anyone-can-theatre-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **Redux Toolkit** - State management
- **Expo Camera** - Video recording functionality

### Backend & AI
- **OpenAI GPT-4** - AI scene generation
- **Firebase** - Backend services (Auth, Firestore, Storage)
- **ElevenLabs** - Text-to-speech for AI co-actor (planned)

### Development Tools
- **TypeScript** - Type safety
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   ├── ModeSelector.js
│   ├── SceneCard.js
│   ├── RecordingControls.js
│   └── CountdownTimer.js
├── screens/            # Main app screens
│   ├── PlayScreen.js
│   ├── CreateScreen.js
│   ├── CoachScreen.js
│   ├── CommunityScreen.js
│   └── ProfileScreen.js
├── services/           # API and business logic
│   ├── SceneGenerator.js
│   ├── RecordingService.js
│   └── FirebaseService.js
├── store/              # Redux state management
│   ├── store.js
│   └── slices/
├── theme/              # Design system
│   └── theme.js
└── utils/              # Helper functions
```

## 🎭 How It Works

### Scene Generation
1. **Choose Mode**: Solo, duo, or group performance
2. **AI Generation**: GPT-4 creates personalized scenes based on preferences
3. **Customization**: Add themes, emotions, or custom prompts
4. **Performance**: Record your interpretation of the scene

### Community Features
- **Daily Challenges**: Themed prompts with hashtags
- **Performance Gallery**: Share and discover community content
- **Social Interaction**: Like, comment, and remix performances
- **Leaderboards**: Track participation and achievements

### Voice Coaching
- **Emotion Exercises**: Practice expressing different emotions
- **Volume Control**: Learn projection and whisper techniques
- **Character Voices**: Develop distinct character personalities
- **Progress Tracking**: Monitor improvement over time

## 💰 Monetization

### Free Tier
- 3 scenes per day
- Basic voice exercises
- Community viewing
- Standard recording quality

### Premium ($9.99/month)
- Unlimited scene generation
- AI Co-Actor mode
- Advanced voice coaching
- HD recording with effects
- Priority community features

### Creator Tools ($19.99/month)
- Scene pack creation
- Workshop hosting
- Revenue sharing
- Advanced analytics

## 🔧 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
# iOS
npx expo build:ios

# Android
npx expo build:android
```

### Code Style
```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🌟 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: [Wiki](https://github.com/venkiteswaranswetha-beep/anyone-can-theatre-app/wiki)
- **Issues**: [GitHub Issues](https://github.com/venkiteswaranswetha-beep/anyone-can-theatre-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/venkiteswaranswetha-beep/anyone-can-theatre-app/discussions)

## 🎯 Roadmap

### Phase 1 - MVP (Current)
- [x] Basic scene generation
- [x] Recording functionality
- [x] User interface
- [ ] User authentication
- [ ] Basic community features

### Phase 2 - Community
- [ ] Daily challenges
- [ ] Social features (like, comment, share)
- [ ] Performance gallery
- [ ] Achievement system

### Phase 3 - AI Enhancement
- [ ] AI Co-Actor integration
- [ ] Advanced voice coaching
- [ ] Personalized recommendations
- [ ] Real-time scene adaptation

### Phase 4 - Monetization
- [ ] Premium subscription system
- [ ] Creator tools marketplace
- [ ] Advanced analytics
- [ ] Revenue sharing platform

## 🏆 Achievements

- 🎭 **First-of-its-kind** accessible theatre app
- 🤖 **AI-powered** personalized content generation
- 👥 **Community-focused** social features
- 📱 **Cross-platform** mobile experience

## 📊 Stats

- **Target Users**: 10,000 DAU in Year 1
- **Scene Generation**: Unlimited with AI
- **Community**: Daily challenges and social sharing
- **Monetization**: Freemium model with 5% conversion target

---

**Built with ❤️ by the Bhindi team**

*Making theatre accessible to everyone, one scene at a time.*