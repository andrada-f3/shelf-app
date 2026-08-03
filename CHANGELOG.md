# Changelog

## v1.9
- **New: Activity log.** A 🕐 icon in the header shows the most recent 200 actions across both accounts — added, edited, used (+/− taps), restocked, stock removed, deleted, and thrown out — each with who did it and when.
- Logging is best-effort: if it ever fails, it never blocks or breaks the actual action it's describing.
- **Requires a Firestore rules update** — see setup notes (new `activity` collection).

## v1.8
- Renamed for clarity: Revive → **Restock**, Pause → **Remove stock**, Delete → **Delete item**, Waste → **Throw out** (buttons, swipe labels, and toasts all updated).
- Log Waste: quantity field now selects its prefilled value on focus (type to replace, like elsewhere in the app).
- Log Waste: unit is now an editable dropdown, not fixed to the item's — e.g. log "2 pcs" thrown out even if the item is tracked in kg.
- If the logged unit matches the item's unit, inventory is reduced automatically and you're told the new quantity. If it doesn't match, inventory is left untouched and you get a clear warning — the log entry still saves either way.
- Waste log entries are no longer one-tap-delete. Tapping an entry now opens it for editing (quantity, unit, reason, date) — deleting is still possible but tucked inside that edit screen, not a stray ✕ on the row.
- No Firestore rules changes needed for this version — all changes are UI/logic only, no new fields.

## v1.7
- **New: waste tracking.** Open any item and tap **Waste** to log how much you're throwing out and why (Expired/spoiled, Made too much, Didn't like it, Bought too much, Other — customizable like categories). The item's quantity reduces automatically.
- **New: Waste log** — a 🗑 icon in the header opens a running history of everything logged, with a quick monthly summary (count + most-wasted category). Individual entries can be removed if logged by mistake.
- Waste reasons are manageable from ⚙ Manage Lists, same add/delete pattern as categories/shops/locations.
- Internal: refactored the "add new value" system (categories/shops/locations/subcategories/waste reasons) onto one explicit, robust mechanism instead of fragile name-guessing — reduces the chance of ID-mismatch bugs like the one fixed in v1.6.
- **Requires a Firestore rules update** — see setup notes (new `waste` collection + `wasteReasons` field).

## v1.6.1
- Pausing an item (via the Pause button or swipe) now clears its quantity to 0 and clears expiry/bought dates, but keeps the unit — so Revive naturally prompts for fresh numbers instead of showing stale ones. Undo restores the exact previous values.
- Diagnosed the "missing or insufficient permission" error on adding a new location: it's a Firestore rules deployment gap, not an app bug — see chat for the fix.

## v1.6
- Sticky footer buttons simplified to single words: Save, Pause/Resume, Duplicate, Delete.
- Pause is now an immediate action from the edit sheet: tap it and the item saves, closes, and moves straight to the Paused section — no separate Save click needed.
- Fixed a real bug where adding a brand-new location (or category, in the Manage Lists screen specifically) could silently fail to actually get selected/saved, caused by a fragile timing assumption and, for Manage Lists categories, a mismatched element ID. Both add-new flows now update instantly and reliably.
- Added an optional **Sub-category** field per item (e.g. Food → Spices, Dairy, Meat, Sweets, Fruit, Veggies), with the same add-your-own/manage/delete support as Location and Shop.
- **Requires a Firestore rules update** — see setup notes.

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
