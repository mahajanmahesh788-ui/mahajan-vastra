# Firebase Festival Popup Setup Guide

This guide explains how to set up Firebase Firestore for real-time festival popup control on your static GitHub Pages site.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** (or use existing)
3. Name it (e.g. `mahajan-vastra`)
4. Complete the setup wizard

## 2. Enable Firestore

1. In Firebase Console → **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (or production with rules below)
4. Select a region (e.g. `asia-south1` for India)

## 3. Add Web App & Get Config

1. Project Overview → **</>** (Web) icon
2. Register app name (e.g. `mahajan-vastra-web`)
3. Copy the `firebaseConfig` object
4. Open `js/firebase-popup.js` and replace the placeholder config:

```javascript
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

## 4. Firestore Structure

Create this structure in Firestore:

| Collection | Document | Fields |
|------------|----------|--------|
| `popup` | `festival` | `showPopup`, `title`, `description`, `image` |

### How to create

1. Firestore → **Start collection**
2. Collection ID: `popup`
3. Document ID: `festival`
4. Add fields:

| Field       | Type    | Example Value |
|-------------|---------|---------------|
| `showPopup` | boolean | `true`        |
| `title`     | string  | `🪔 Happy Diwali` |
| `description` | string | `Wishing you and your family a blessed Diwali. Get special vastra for your deities this festival.` |
| `image`     | string  | `https://example.com/diwali.jpg` |

## 5. Example Data

### Diwali

```json
{
  "showPopup": true,
  "title": "🪔 Happy Diwali",
  "description": "Wishing you and your family a blessed Diwali. Get special vastra for your deities this festival. Visit us for divine clothing!",
  "image": "https://images.unsplash.com/photo/1605649487212-47bdab064df7?w=600"
}
```

### Shivratri

```json
{
  "showPopup": true,
  "title": "🕉️ Happy Maha Shivratri",
  "description": "Har Har Mahadev! May Lord Shiva bless you. Special vastra stitching for Shiva and Parvati idols available.",
  "image": "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600"
}
```

### Holi

```json
{
  "showPopup": true,
  "title": "🎨 Happy Holi",
  "description": "Wishing you a colorful Holi! Bright and beautiful vastra for Radha-Krishna idols. Book now!",
  "image": "https://images.unsplash.com/photo-1581397862775-7ca5c1266f01?w=600"
}
```

### Hide popup

```json
{
  "showPopup": false,
  "title": "",
  "description": "",
  "image": ""
}
```

## 6. Firestore Security Rules

For **production**, use rules like this (read-only for popup):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /popup/festival {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

For **test mode** (quick setup), rules allow read/write temporarily.

## 7. Image URLs

- Use **absolute URLs** for `image` (e.g. `https://...`)
- You can host images in:
  - Firebase Storage
  - Your repo (`images/diwali.jpg` → `https://username.github.io/repo/images/diwali.jpg`)
  - Unsplash, Imgur, etc.

## 8. Control Popup from Firebase Console

1. Firebase Console → Firestore → `popup` → `festival`
2. Edit document
3. Set `showPopup` to `true` or `false`
4. Change `title`, `description`, `image` as needed
5. Save — the website updates in **real time** (no deploy needed)

## 9. File Overview

| File | Purpose |
|------|---------|
| `index.html` | Popup markup + Firebase CDN |
| `css/firebase-popup.css` | Popup styles (modal, overlay, responsive) |
| `js/firebase-popup.js` | Firebase init + Firestore listener + popup logic |

## Troubleshooting

- **Popup doesn't show**: Check `showPopup` is `true` and config in `firebase-popup.js` is correct.
- **CORS / Network errors**: Ensure your domain is added in Firebase Console → Project Settings → Authorized domains (GitHub Pages URL).
- **No Firebase config yet**: Popup won't run until you add your `firebaseConfig` in `firebase-popup.js`.
