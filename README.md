# 📷 React Native Barcode Scanner App

A simple React Native application that allows users to scan barcodes or QR codes using their device camera. The app saves the scan history and navigates to a detail screen with the scanned information.

---

## 🚀 Features

- 📸 Real-time barcode and QR code scanning
- 🔒 Camera permission handling (Android & iOS)
- 📚 Scan history storage using AsyncStorage
- 🧭 Navigation to detail screen after successful scan
- 🧠 Focus-aware reactivation of scanner

---

## 🛠️ Tech Stack

- React Native
- React Navigation
- React Native Camera Kit
- AsyncStorage

---

## 📷 Screens

- **Scan Screen**: Live camera view to scan barcodes.
- **History Screen**: View list of previously scanned codes.
- **Detail Screen**: Displays details for the scanned ID.

---

## 🧪 Setup & Installation
### 1. Clone the repository

```bash
git clone https://github.com/your-username/react-native-barcode-scanner.git
cd react-native-barcode-scanner
```
### 2. Install Dependencies
   ```bash
   npm install
    # or
    yarn install
   
   ```
### 3. For Android:
   Start Metro (in one terminal):```bash npx react-native start```
   Build and run on Android (in another terminal):```npx react-native run-android```

   
### 4. For iOS (macOS only)
   Install CocoaPods (if not already installed):```sudo gem install cocoapods```
   Install iOS dependencies:```cd ios && pod install && cd ..```
  Start Metro:```npx react-native start```
  Build and run on iOS simulator:```npx react-native run-ios```
📌 Make sure you have Xcode installed and an iOS simulator running.


