# HA-Ghostfolio-Card

A comprehensive Home Assistant custom card for tracking your [Ghostfolio](https://ghostfolio.io/) portfolio in real-time.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.5%2B-blue)

## Overview

HA-Ghostfolio-Card brings your investment portfolio directly into Home Assistant with beautiful visualizations, detailed metrics, and real-time market status. Track performance, monitor accounts, analyze holdings, and gain insights into your asset allocation—all from your HA dashboard.

### Key Features

✨ **Real-Time Portfolio Tracking**
- Live portfolio value updates
- Net performance in dollars and percentage
- Compound Annual Growth Rate (CAGR) with tooltip
- Detailed return on investment metrics

📊 **Visual Analytics**
- Interactive donut charts for sector allocation
- Account-based allocation breakdown
- Holdings ranked by value
- Expandable position details (price, cost, dividends)

💼 **Account Management**
- Multi-account support with color-coded visualization
- Allocation percentage bars per account
- Account-level holdings expansion
- Platform and currency tracking

🎯 **Investment Insights**
- Holdings list with rank, name, symbol, and allocation %
- Expandable details: current price, unrealized gain/loss, cost basis
- Sector classification and dividend tracking
- Asset class categorization

🟢 **Market Status**
- US Market open/closed indicator (green dot = open, gray = closed)
- Live market status in card header
- Always visible market context

💰 **Portfolio Metrics**
- Investable cash (emergency fund) balance
- Total invested capital
- Liabilities tracking (mortgage, loans)
- Net worth calculation (assets - liabilities)
- Dividend income summary

🎨 **Design & UX**
- Dark and light theme support (auto-detects HA settings)
- Responsive layout for mobile and desktop
- Smooth transitions and animations
- Clean, modern card design
- Tab-based navigation (Overview, Holdings, Charts, Summary)

## Getting Started

### Prerequisites

- Home Assistant 2024.5 or later
- [Ghostfolio](https://ghostfolio.io/) instance with API access
- Ghostfolio API access token
- Working internet connection to reach Ghostfolio

### Installation

1. **Download the card file** to your Home Assistant config directory:
   ```bash
   mkdir -p /config/www/community/
   cd /config/www/
   curl -L https://github.com/christopherdenny/HA-Ghostfolio-Card/releases/download/v1.0.0/HA-Ghostfolio-Card.js -o HA-Ghostfolio-Card.js
   ```

2. **Add to your dashboard** via the UI:
   - Edit your dashboard
   - Click "Create custom card"
   - Select "Manual YAML"
   - Add the following:
   ```yaml
   type: custom:ghostfolio-card
   title: My Portfolio
   ghostfolio_url: https://your-ghostfolio-instance.com
   access_token: YOUR_GHOSTFOLIO_ACCESS_TOKEN
   show_performance: true
   show_investment: true
   show_accounts: true
   show_holdings: true
   currency_format: USD
   decimal_places: 2
   ```

3. **Cache bust** (clear frontend cache for the card to load):
   - Desktop: Press `Ctrl+Shift+R` (Chrome/Firefox) or `Cmd+Shift+R` (Mac)
   - Mobile: Settings → Companion App → Debugging → Reset frontend cache

For detailed setup instructions, see [INSTALLATION.md](./INSTALLATION.md).

## Configuration

### Required Fields
- **ghostfolio_url**: Full URL to your Ghostfolio instance (e.g., `https://ghostfolio.example.com`)
- **access_token**: Your Ghostfolio **Security Token** (NOT Access Token)
  - This is your **Security Token** from Ghostfolio Settings
  - The card automatically exchanges it for an Authorization token
  - See [Token Explanation](#-security-token-vs-authorization-token) below

### Optional Fields
- **title**: Card title (default: "Portfolio")
- **show_performance**: Display performance metrics (default: `true`)
- **show_investment**: Display investment details (default: `true`)
- **show_accounts**: Display account breakdown (default: `true`)
- **show_holdings**: Display holdings list (default: `true`)
- **currency_format**: Currency code for formatting (default: "USD")
- **decimal_places**: Number of decimal places in currency (default: `2`)

### Example Configurations

**Minimal Setup:**
```yaml
type: custom:ghostfolio-card
ghostfolio_url: https://ghostfolio.example.com
access_token: abc123xyz789
```

**Full-Featured Setup:**
```yaml
type: custom:ghostfolio-card
title: Investment Portfolio
ghostfolio_url: https://ghostfolio.example.com
access_token: abc123xyz789
show_performance: true
show_investment: true
show_accounts: true
show_holdings: true
currency_format: EUR
decimal_places: 2
```

## Tabs Explained

### 📈 Overview
Your portfolio snapshot—current value, net performance, return on investment, and expense overview. Best for at-a-glance status.

### 📋 Holdings
Ranked list of all positions. Click any holding to expand and see details like current price, unrealized gains, cost basis, sector, and dividends received.

### 📊 Charts
Visual breakdowns:
- **Sector Allocation**: Pie chart showing portfolio distribution by sector (tech, healthcare, financials, etc.)
- **Account Allocation**: Pie chart showing which accounts hold what percentage of your portfolio

### 📑 Summary
Detailed performance metrics and portfolio composition:
- **Performance**: Net gain/loss, ROI percentage, CAGR
- **Portfolio**: Total value, total invested, available cash, dividends, liabilities, net worth

## Features in Detail

### 🟢 Market Status Indicator
The green/gray dot in the card header shows US market status:
- 🟢 **Green**: US Stock Market is OPEN (trading hours)
- ⚫ **Gray**: US Stock Market is CLOSED (after hours/weekends)

Hover over the dot for a tooltip. Requires `binary_sensor.ghostfolio_portfolio_us_market` sensor in Home Assistant.

### 💰 Investable Cash
Shows liquid funds available from your Emergency Fund feature in Ghostfolio. This is your "dry powder" for new investments.

### 🔗 Liabilities Tracking
If you've configured liabilities in Ghostfolio (mortgage, loans), they appear in the Summary tab in red text. Net Worth is automatically adjusted: `Total Assets - Liabilities`.

### 📊 Charts and Visualizations
- **Donut charts** show allocation percentages
- **Color-coded** for easy visual comparison
- **Clickable legend** entries for identification
- **Responsive** sizing for all screen sizes

## API Data Structure

The card pulls from Ghostfolio's REST API:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/auth/anonymous` | POST | Get authorization token |
| `/api/v1/account` | GET | List all accounts |
| `/api/v1/portfolio/holdings` | GET | Get holdings and positions |
| `/api/v2/portfolio/performance` | GET | Get performance metrics |
| `/api/v1/portfolio/details` | GET | Get portfolio summary |

## Troubleshooting

### Card Shows "Configuration error"
1. Check your `ghostfolio_url` is correct and reachable
2. Verify your `access_token` is valid (get a new one from Ghostfolio if needed)
3. Ensure `show_holdings: true` is set in your configuration
4. Hard refresh your browser (`Ctrl+Shift+R`)

### Card Not Loading
1. Check browser console for errors (F12 → Console)
2. Verify Home Assistant can reach your Ghostfolio instance
3. Clear your browser cache
4. Mobile app: Reset frontend cache in Companion App settings

### Market Status Dot Not Showing
The card gracefully handles missing sensors. Ensure you have a `binary_sensor.ghostfolio_portfolio_us_market` sensor configured.

### Inaccurate Numbers
1. Verify your Ghostfolio instance is up-to-date
2. Check that holdings are correctly configured in Ghostfolio
3. Ensure your Ghostfolio access token has read permissions

See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for more help.

## Known Limitations

- **YTD Performance**: Ghostfolio API provides lifetime returns, not year-to-date. The card shows lifetime return from inception.
- **Historical Chart**: Portfolio value history is not currently displayed; the card shows current metrics only.
- **Asset Class Breakdown**: Currently grouped by sector; detailed asset class (equity vs. bond vs. alternative) breakdown planned for future release.
- **Benchmark Comparison**: No built-in S&P 500 or market benchmark comparison.
- **Mobile Rendering**: Charts may be smaller on very small screens but remain readable.

See [KNOWN_LIMITATIONS.md](./docs/KNOWN_LIMITATIONS.md) for details.

## 🔐 Security Token vs Authorization Token

This is an important distinction for understanding how the card authenticates with Ghostfolio:

### What You Provide (in HA config)
```yaml
type: custom:ghostfolio-card
access_token: YOUR_GHOSTFOLIO_SECURITY_TOKEN  ← This is a SECURITY TOKEN
ghostfolio_url: https://ghostfolio.example.com
```

### What Happens Behind the Scenes

**Step 1: Provide Security Token**
- You copy your Security Token from Ghostfolio Settings
- Paste it in Home Assistant config as `access_token`

**Step 2: Card Exchanges Security Token for Authorization Token**
- Card sends: `POST /api/v1/auth/anonymous`
  ```json
  {
    "accessToken": "YOUR_SECURITY_TOKEN"
  }
  ```
- Ghostfolio responds with:
  ```json
  {
    "authToken": "jwt_token_here"
  }
  ```

**Step 3: Card Uses Authorization Token for API Calls**
- All subsequent API requests include:
  ```
  Authorization: Bearer jwt_token_here
  ```
- The token is cached to avoid repeated exchanges
- Token automatically refreshes when needed

### Why Two Tokens?

- **Security Token**: Long-lived, stable credential from your Ghostfolio account
- **Authorization Token**: Short-lived JWT token created from Security Token
- This separation follows OAuth-style security patterns for better protection

### Finding Your Security Token

1. Log in to Ghostfolio
2. Go to **Settings** (gear icon)
3. Navigate to **Account** or **API** section
4. Copy your **Security Token** (NOT "Access Token" if both are shown)
5. Paste into Home Assistant config

### Security Notes

✅ **Safe to store in HA config:**
- Home Assistant keeps your configuration private
- Security Token only visible in your HA instance

🔒 **Why this design:**
- Authorization tokens are short-lived
- If compromised, Security Token can be regenerated
- Adds layer of security through token exchange

---

### v1.0.0 (Current)
- ✅ Overview, Holdings, Charts, and Summary tabs
- ✅ Real-time portfolio tracking
- ✅ US Market status indicator
- ✅ Investable cash and liabilities tracking
- ✅ Sector and account allocation charts
- ✅ Dark/light theme support
- ✅ Mobile responsive design

See [CHANGELOG.md](./CHANGELOG.md) for full version history.

## Contributing

This project is open source. Contributions welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) file for details.

## Support

For issues, feature requests, or questions:
1. Check [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
2. Review [KNOWN_LIMITATIONS.md](./docs/KNOWN_LIMITATIONS.md)
3. Open an issue on GitHub

## Credits

Built for the Home Assistant community with ❤️

- Built with [Lit Element](https://lit.dev/) for web components
- Designed for seamless Home Assistant integration
- Icons and inspiration from the Home Assistant design system

---

**Happy tracking!** 📈
