# Changelog

All notable changes to this project are documented in this file.

## [1.0.0] - 2026-07-24

### Added
- Initial public release.
- Content script that detects and unchecks the "Remember this card" checkbox on Viva Wallet payment pages (`pay.vivapayments.com`, `*.vivapayments.com`, `*.vfrm.me`, `*.vivawallet.com`).
- Dual detection strategy: polling on page load plus a `MutationObserver` for checkboxes that render late.
- Toolbar popup showing the extension's active status.
- Manifest V3 packaging, no permissions requested.
