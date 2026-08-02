# Changelog

## v1.5.1
- Fixed a rendering bug where paused items' muted styling made the swipe-action layer bleed through and garble button text (now only the text is muted, not the whole card).
- Moved "Pause" out of a checkbox buried in the form into a proper toggle button in the sticky footer, next to Save/Duplicate/Delete.

## v1.5
- Save/Duplicate/Delete buttons in the add/edit sheet are now pinned to the bottom, always visible without scrolling.
- Swipe left on an item in the main list to pause it; swipe left on a paused item to delete it. Both show a few seconds of "Undo" in a toast before the action is final.

## v1.4
- Replaced open anonymous sign-in with a real login screen (email + password). No public sign-up anywhere in the app — the only way in is an account you create yourself in the Firebase console, so no credentials or emails ever appear in the code or GitHub repo.
- Added a "Sign out" button (bottom of Manage Lists).
- **Requires Firebase console changes** — see setup notes: disable Anonymous sign-in, enable Email/Password, manually add the two accounts.

## v1.3
- "Duplicate as new item" button when editing an item — for products bought with multiple expiry dates at once (e.g. several yogurts), add it once, then duplicate and adjust quantity/expiry per batch.
- New "Paused" state per item: hides its low-stock alert and moves it to a quiet "Paused" section at the bottom of the list, without deleting it. One-tap "↻ Revive" brings it back into normal tracking and opens it for editing so you can set the new quantity right away.
- **Requires a Firestore rules update** — see setup notes.

## v1.2
- Android back button now closes the open sheet (add/edit item, export, manage lists) instead of exiting the app.
- Sort "by quantity" replaced with sort "by closest to running out": items with a low-stock threshold set are ranked by how close current quantity is to that threshold; items without one sort after, falling back to raw quantity.

## v1.1
- Dark theme by default, with a toggle (☀/☾ icon in the header) to switch to light. Preference is remembered per device.
- Quantity and low-stock number fields now select their current value on focus, so typing a new number replaces it instead of appending.
- New items now default to shop "Other" and no location, instead of picking the first item in each list — you set these only when relevant.
- Firestore rules tightened to validate the shape/size of any data written, closing off a way malformed or malicious data could have been written directly to the database (see security discussion in chat).

## v1.0
- Initial release: shared, live-synced inventory with categories, shops, locations, quantity/unit, expiry + bought dates, low-stock threshold, notes.
- Search, filter by category, sort by expiry/name/quantity.
- Color-coded expiry and low-stock flags.
- Export screen with category/shop filters and copy-to-clipboard.
- Manage Lists screen to add/delete categories, shops, locations (deleting clears the field on affected items after confirmation).
- Installable as a PWA; offline app shell + Firestore offline cache.
