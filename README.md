# Wine Cellar App

A minimal React Native Expo app for logging wines, rating them, and viewing simple community insights.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start Expo:
   ```bash
   npm start
   ```

3. Open the app in Expo Go on your device or simulator.

## Firebase

Update `src/firebase/firebaseConfig.js` with your Firestore project credentials.

## App Flow

- `HomeScreen` displays wines from Firestore.
- `AddWineScreen` lets users add a wine entry.
- `WineDetailScreen` shows wine details.
- `CommunityInsightsScreen` displays mocked community data.

## Notes

- Uses Firestore collection: `wines`
- No authentication included
- Simple, modern UI with React Navigation stack
