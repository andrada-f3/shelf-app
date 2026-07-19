# Setting up Shelf

Two parts, both free, both done through websites (no command line):
**A) Create the shared database (Firebase)** — about 15 min
**B) Publish the app (GitHub Pages)** — about 15 min

Do A first, since you need one value from it before B.

---

## A) Firebase (the shared database)

1. Go to https://console.firebase.google.com and sign in with any Google account.
2. Click **"Create a project"**. Name it anything (e.g. "shelf-app"). You can disable Google Analytics when asked — you don't need it.
3. Once the project opens, in the left sidebar click **Build → Firestore Database**. Click **Create database**. Choose a location close to you, and start in **Production mode** (we'll set rules manually below).
4. Still in the left sidebar, click **Build → Authentication**. Click **Get started**. Under "Sign-in method", enable **Anonymous**. This lets your and your fiancée's phones use the shared list without needing passwords.
5. In Firestore, go to the **Rules** tab and replace the contents with this, then click **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

   This means: only someone signed in through your app (even anonymously) can read or write — random strangers on the internet can't.

6. Click the **gear icon (⚙) → Project settings** in the top left. Scroll to "Your apps", click the **</> (web)** icon to register a new web app. Name it "Shelf", skip Firebase Hosting.
7. Firebase will show you a `firebaseConfig` object with values like `apiKey`, `authDomain`, `projectId`, etc. **Keep this tab open** — you'll paste these into the app next.

## Edit the app with your config

1. Open **index.html** in any text editor (Notepad, TextEdit, or directly on GitHub — see below).
2. Find this block near the bottom (search for `REPLACE_ME`):

   ```javascript
   const firebaseConfig = {
     apiKey: "REPLACE_ME",
     authDomain: "REPLACE_ME.firebaseapp.com",
     ...
   };
   ```

3. Replace each `REPLACE_ME` with the matching value from your Firebase project settings page. Save the file.

---

## B) Publish with GitHub Pages

1. On https://github.com, click **New repository**. Name it e.g. `shelf-app`. Set it to **Public** (GitHub Pages' free tier requires this — it's fine, no one will find it without the link, and there's nothing sensitive in the code itself since your data lives in Firebase, not on GitHub). Click **Create repository**.
2. On the new repo's page, click **"uploading an existing file"** (or **Add file → Upload files**).
3. Drag in all 4 files: `index.html`, `manifest.json`, `sw.js`, `icon.svg` (with your edited config already in index.html). Click **Commit changes**.
4. Go to the repo's **Settings → Pages** (left sidebar).
5. Under "Build and deployment" → Source, choose **Deploy from a branch**. Under Branch, choose **main** and folder **/ (root)**. Click **Save**.
6. Wait 1–2 minutes, then refresh the page — you'll see a green box with your live URL, something like:
   `https://yourusername.github.io/shelf-app/`

That URL is your app. Open it on both phones.

## Install it on your phones

1. Open the URL in **Chrome** on the Samsung S24 and the Nokia.
2. Tap the **⋮ menu → Add to Home screen** (wording may vary slightly). It'll appear as a normal app icon.
3. Do this on both phones — they'll share the same live data automatically.

## If something doesn't sync or load

- Double check every `REPLACE_ME` value in `index.html` was replaced exactly (no extra quotes or spaces).
- Make sure Anonymous auth is switched **on** in Firebase Authentication.
- Make sure the Firestore rules were **published** (there's a Publish button — just pasting isn't enough).
- The very first load needs internet. After that, the app shell (the interface) loads offline, but adding/syncing items still needs a connection.

## Later: adding more people

Anyone with the app's URL who installs it will share the same inventory (that's the point — no invite system needed). Only share the link with people you trust with edit access, since anyone with it can add, edit, or delete items.
