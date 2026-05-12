# Installation Guide

Complete step-by-step instructions for installing HA-Ghostfolio-Card in your Home Assistant instance.

## Prerequisites

Before you begin, ensure you have:

- ✅ Home Assistant 2024.5 or later
- ✅ Access to Ghostfolio instance (self-hosted or cloud)
- ✅ Ghostfolio API access token
- ✅ Home Assistant with `configuration.yaml` access or dashboard editing enabled
- ✅ Working network connection between Home Assistant and Ghostfolio

## Step 1: Get Your Ghostfolio Security Token

1. **Log in to Ghostfolio**
   - Navigate to your Ghostfolio instance
   - Go to **Settings** (gear icon or ⚙️)

2. **Find the Security Token**
   - Look for **Account**, **API**, or **Security** section
   - Find the field labeled **"Security Token"** or **"API Token"**
   - **Do NOT confuse with "Access Token"** if both exist
   - Copy the **Security Token** (it's a long string)

3. **Keep it Private**
   - This token gives full portfolio access
   - Never share it publicly
   - Only use in your private Home Assistant instance
   - You can regenerate it anytime from Ghostfolio settings

### What This Token Does

Your Security Token is exchanged for an Authorization Token:
- **You provide:** Security Token (stable, long-lived)
- **Card exchanges it for:** Authorization Token (temporary, single-request use)
- **Security benefit:** If Authorization token is compromised, regenerate Security Token from Ghostfolio

## Step 2: Download the Card File

### Option A: Download from GitHub Releases

```bash
cd /config/www/
curl -L https://github.com/christopherdenny/HA-Ghostfolio-Card/releases/download/v1.0.0/HA-Ghostfolio-Card.js -o HA-Ghostfolio-Card.js
```

### Option B: Manual Download

1. Visit the [GitHub releases page](https://github.com/christopherdenny/HA-Ghostfolio-Card/releases)
2. Download `HA-Ghostfolio-Card.js`
3. Upload to Home Assistant: **Settings** → **Developer Tools** → **File Editor**
4. Navigate to `/config/www/` and create the file
5. Paste the contents

### Option C: Clone Repository

```bash
cd /config/www/
git clone https://github.com/christopherdenny/HA-Ghostfolio-Card.git
```

## Step 3: Register the Card in Home Assistant

### Method A: Via Dashboard (Easiest)

1. **Edit Your Dashboard**
   - Go to your Home Assistant dashboard
   - Click **⋮ (menu)** → **Edit Dashboard**

2. **Create Custom Card**
   - Click the **+ (plus)** button to add a card
   - Click **Create custom card**
   - Select **Manual YAML editor**

3. **Paste Configuration**
   ```yaml
   type: custom:ghostfolio-card
   title: My Portfolio
   ghostfolio_url: https://ghostfolio.example.com
   access_token: YOUR_ACCESS_TOKEN_HERE
   show_performance: true
   show_investment: true
   show_accounts: true
   show_holdings: true
   currency_format: USD
   decimal_places: 2
   ```

4. **Replace these values:**
   - `https://ghostfolio.example.com` → Your actual Ghostfolio URL
   - `YOUR_ACCESS_TOKEN_HERE` → Your Ghostfolio access token (from Step 1)

5. **Click "Save"**

### Method B: Via configuration.yaml

If you prefer YAML configuration:

1. **Edit `configuration.yaml`**
   ```yaml
   # No YAML configuration needed—cards are configured via dashboard UI
   # Just ensure the file exists in /config/www/HA-Ghostfolio-Card.js
   ```

2. **Dashboard YAML**
   Add this to your dashboard view YAML:
   ```yaml
   cards:
     - type: custom:ghostfolio-card
       title: My Portfolio
       ghostfolio_url: https://ghostfolio.example.com
       access_token: YOUR_ACCESS_TOKEN_HERE
       show_performance: true
       show_investment: true
       show_accounts: true
       show_holdings: true
       currency_format: USD
       decimal_places: 2
   ```

## Step 4: Clear Cache & Refresh

### Desktop Browser
- **Chrome/Firefox**: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- **Safari**: Empty cache or use Develop menu

### Mobile (Home Assistant Companion App)
1. Open Companion App
2. Go to **Settings** → **Companion App** → **Debugging**
3. Tap **Reset frontend cache**
4. Close and reopen the app

### Home Assistant Backend
If changes don't appear:
1. Go to **Settings** → **Developer Tools** → **Template**
2. Click **Reload** (or just refresh the page)

## Step 5: Verify Installation

1. **Card Should Load**
   - You should see "My Portfolio" card on your dashboard
   - Green/gray market status dot appears in header
   - Tabs visible: Overview, Holdings, Charts, Summary

2. **Check for Errors**
   - Open browser console (`F12` → **Console** tab)
   - Look for red error messages
   - Green checkmark in console = good!

3. **Data Should Populate**
   - Overview tab shows your portfolio value
   - Holdings tab lists your positions
   - Charts tab shows allocation donut charts
   - Summary tab shows detailed metrics

## Troubleshooting Installation

### "Configuration error" Message

**Solution 1: Check Configuration**
```yaml
# ✗ WRONG - missing field
type: custom:ghostfolio-card
access_token: abc123

# ✓ CORRECT - all required fields
type: custom:ghostfolio-card
title: My Portfolio
ghostfolio_url: https://ghostfolio.example.com
access_token: abc123
show_holdings: true  # THIS IS REQUIRED
```

**Solution 2: Verify Ghostfolio URL**
- Test URL in browser: Does it load?
- Check for typos (http vs https, trailing slash, etc.)
- Ensure Home Assistant can reach it on your network

**Solution 3: Verify Access Token**
- Get a fresh token from Ghostfolio settings
- Make sure you're copying the entire token
- Token should be a long string of characters

**Solution 4: Clear Cache Aggressively**
1. Desktop: `Ctrl+Shift+Delete` (open cache clearing)
2. Select "Cached files and images"
3. Click "Clear"
4. Hard refresh: `Ctrl+Shift+R`

### Card File Not Loading

**Check 1: File Location**
```bash
# SSH into Home Assistant
ls -la /config/www/HA-Ghostfolio-Card.js
# Should show the file with proper permissions (644)
```

**Check 2: CORS Issues**
If you see CORS errors in console:
- Verify Ghostfolio has CORS enabled
- Check firewall between HA and Ghostfolio
- Ensure both use HTTPS or both use HTTP (not mixed)

**Check 3: Browser DevTools**
1. Open browser console (`F12`)
2. Look for network errors
3. Check **Network** tab for failed requests
4. Share errors in GitHub issues

### "Waiting for sensor data..." Message

This is normal on first load. The card is fetching data from Ghostfolio.

**If it doesn't resolve after 10 seconds:**
1. Check Ghostfolio is accessible
2. Verify access token is correct
3. Check Home Assistant logs: **Settings** → **System** → **Logs**
4. Look for errors mentioning "ghostfolio"

## Configuration Options Reference

| Option | Type | Default | Required | Description |
|--------|------|---------|----------|-------------|
| `type` | string | - | ✅ | Must be `custom:ghostfolio-card` |
| `ghostfolio_url` | string | - | ✅ | Full URL to Ghostfolio instance |
| `access_token` | string | - | ✅ | Your Ghostfolio **Security Token** (not Access Token) |
| `title` | string | "Portfolio" | ❌ | Card title |
| `show_performance` | boolean | `true` | ❌ | Show performance metrics |
| `show_investment` | boolean | `true` | ❌ | Show investment details |
| `show_accounts` | boolean | `true` | ❌ | Show account breakdown |
| `show_holdings` | boolean | `true` | ✅ | Show holdings list |
| `currency_format` | string | "USD" | ❌ | Currency code (USD, EUR, GBP, etc.) |
| `decimal_places` | number | `2` | ❌ | Decimal places in currency display |

## Multiple Portfolio Cards

You can add multiple cards for different views:

```yaml
# Card 1: Main Portfolio
- type: custom:ghostfolio-card
  title: Main Portfolio
  ghostfolio_url: https://ghostfolio.example.com
  access_token: token_1
  show_holdings: true

# Card 2: Summary Only (hide holdings)
- type: custom:ghostfolio-card
  title: Portfolio Summary
  ghostfolio_url: https://ghostfolio.example.com
  access_token: token_1
  show_holdings: false
```

## Updating the Card

To update to a new version:

1. **Download latest release**
   ```bash
   cd /config/www/
   curl -L https://github.com/christopherdenny/HA-Ghostfolio-Card/releases/download/vX.X.X/HA-Ghostfolio-Card.js -o HA-Ghostfolio-Card.js
   ```

2. **Increment cache version** (in dashboard card URL)
   - Change `?v=1` → `?v=2` (or any increment)

3. **Hard refresh browser**
   - `Ctrl+Shift+R` (desktop) or reset app cache (mobile)

## Getting Help

- **Common Issues**: See [TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md)
- **Known Limitations**: See [KNOWN_LIMITATIONS.md](../docs/KNOWN_LIMITATIONS.md)
- **GitHub Issues**: [Report a bug](https://github.com/christopherdenny/HA-Ghostfolio-Card/issues)

## Success!

Your card is installed and ready. Start exploring your portfolio! 🎉

---

**Next Steps:**
- Explore the [Features](./README.md#features-in-detail)
- Check [Configuration](./README.md#configuration) for advanced setup
- Review [CHANGELOG.md](./CHANGELOG.md) for version updates
