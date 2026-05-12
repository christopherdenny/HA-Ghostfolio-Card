# Changelog

All notable changes to HA-Ghostfolio-Card are documented in this file.

## [1.0.0] - 2025-05-12

### ✨ Initial Release

**Major Features:**
- ✅ Real-time portfolio tracking with live value updates
- ✅ Four-tab interface: Overview, Holdings, Charts, Summary
- ✅ Account-based breakdown with color-coded allocation bars
- ✅ Detailed holdings list with expandable position metrics
- ✅ Sector allocation donut chart
- ✅ Account allocation donut chart
- ✅ Performance metrics: net performance, ROI percentage, CAGR
- ✅ Liabilities tracking (mortgage, loans)
- ✅ Investable cash (emergency fund) display
- ✅ Net worth calculation (assets - liabilities)
- ✅ Dividend income tracking
- ✅ US Market status indicator (green/gray dot)

**UI/UX:**
- ✅ Dark and light theme support (auto-detect from HA)
- ✅ Responsive mobile and desktop design
- ✅ Smooth animations and transitions
- ✅ Hover tooltips (CAGR explanation, market status)
- ✅ Expandable account holdings
- ✅ Expandable position details

**API Integration:**
- ✅ Ghostfolio REST API v1 and v2 support
- ✅ Anonymous auth token exchange
- ✅ Automatic 5-minute cache refresh
- ✅ Error handling and loading states
- ✅ Graceful fallbacks for missing data

**Configuration:**
- ✅ Simple YAML configuration
- ✅ Required: `ghostfolio_url`, `access_token`, `show_holdings`
- ✅ Optional: title, currency format, decimal places, feature toggles
- ✅ Multiple portfolio card support

**Documentation:**
- ✅ Comprehensive README with feature overview
- ✅ Step-by-step installation guide
- ✅ Configuration reference
- ✅ Troubleshooting guide
- ✅ Known limitations documented
- ✅ MIT license

### 📝 Notes

This is the first stable release of HA-Ghostfolio-Card. The card has been tested with:
- Home Assistant 2024.5+
- Ghostfolio 3.x API
- Chrome, Firefox, Safari browsers
- iOS and Android Companion Apps
- Dark and light themes

---

## Planned Features

### v1.1.0
- Portfolio value historical chart
- Asset class breakdown (Stocks vs Bonds vs Alternatives)
- Configurable chart timeframes
- Performance benchmark comparison

### Future Consideration
- Dividend yield tracking
- Tax-loss harvesting alerts
- Risk metrics and analysis
- Transaction history
- Custom alerts and notifications

---

**Support:** See [KNOWN_LIMITATIONS.md](./docs/KNOWN_LIMITATIONS.md) and [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
