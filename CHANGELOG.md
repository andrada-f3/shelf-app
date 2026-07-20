# Changelog

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
