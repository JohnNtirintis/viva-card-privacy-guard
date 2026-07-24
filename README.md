# 🛡️ Viva Card Privacy Guard

A tiny, zero-permission browser extension that automatically **unchecks the "Remember this card" box** (which Viva has set to checked by default) on Viva Wallet / Viva.com payment pages. so your card is never saved unless *you* explicitly choose to save it.

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Manifest V3](https://img.shields.io/badge/manifest-v3-green.svg)
![Permissions](https://img.shields.io/badge/permissions-none-brightgreen.svg)
![Browsers](https://img.shields.io/badge/browsers-Chrome%20%7C%20Edge%20%7C%20Brave%20%7C%20Firefox-orange.svg)

## Why

Viva Wallet's checkout pre-selects (or makes it easy to miss) a "Remember this card" checkbox on the payment form. Plenty of people click through checkout on autopilot and end up with a saved card they never meant to store, and I don't think this is cool. This extension watches for that checkbox on Viva payment pages and switches it off for you the moment it appears, so saving a card is always something you opt into, not something that happens by default.

## Features

- **Automatic** — detects the checkbox as soon as it renders, including on pages that build the form dynamically after load.
- **Reliable** — uses both a short polling loop and a `MutationObserver`, so it still works if Viva changes exactly when/how the checkbox appears.
- **Zero permissions** — the manifest requests nothing beyond running on Viva's own payment domains. No `tabs`, no `storage`, no host access anywhere else.
- **No network calls, no analytics, no data collection** — it's a content script that clicks a checkbox. That's the whole app.
- **Lightweight popup** — click the toolbar icon to confirm the extension is active.

## How it works

`content.js` is injected only on Viva Wallet payment domains. It looks for the "remember card" checkbox using a few selector fallbacks (Viva's markup has changed over time), and if it's checked, it clicks the label rather than just flipping `checked = false` — the checkout form is built with Vuetify/Vue, so a direct property change wouldn't be picked up by the framework's internal state. Detection runs on a short interval and via a `MutationObserver` for up to 15 seconds per page load, then stops.

## Supported domains

- `pay.vivapayments.com`
- `demo.vivapayments.com`
- `*.vivapayments.com`
- `*.vfrm.me`
- `*.vivawallet.com`

## Installation

Not yet published to a web store — install from source for now:

### Chrome / Edge / Brave (Chromium)
1. Download or clone this repository.
2. Go to `chrome://extensions` (or `edge://extensions`).
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.

### Firefox
1. Download or clone this repository.
2. Go to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...** and select `manifest.json`.
4. Note: temporary add-ons are removed when Firefox restarts. For a permanent install, the extension needs to be signed via [addons.mozilla.org](https://addons.mozilla.org).

## Privacy

This extension does not collect, store, or transmit any data. It has no permissions beyond running its script on Viva Wallet's own payment pages, and it makes no network requests of its own.

## Disclaimer

This is an independent, community project and is **not affiliated with, endorsed by, or maintained by Viva Wallet / Viva.com**. "Viva Wallet" and "Viva.com" are trademarks of their respective owners, referenced here only to describe compatibility.

## Contributing

Issues and pull requests are welcome — especially if Viva changes their checkout markup and a selector needs updating. See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

[MIT](LICENSE) © 2026 John Ntirintis
