# Ghostfolio Card - Quick Start Guide

## 📋 What You Have

You now have a complete boilerplate for a Home Assistant custom card that displays Ghostfolio portfolio data. The structure follows industry best practices using **Lit 3**, **TypeScript 5**, and **Rollup 4**.

## 🚀 Next Steps

### 1. **Customize Sensor Names** (IMPORTANT)

The card assumes specific sensor entity IDs from `ha_ghostfolio`. Verify your actual sensor names:

```bash
# SSH into your Home Assistant instance and run:
curl -s http://localhost:8123/api/states | jq '.[] | select(.entity_id | startswith("sensor.ghostfolio"))'
```

Or check in Home Assistant UI:
- Developer Tools → States
- Search for `ghostfolio`
- Note the exact entity IDs

Update these lines in `ghostfolio-card.ts` (line ~70) with your actual sensor IDs:

```typescript
const sensorMap = {
  current_value: "sensor.ghostfolio_current_value",        // ← Verify this
  net_performance: "sensor.ghostfolio_net_performance",    // ← Verify this
  net_performance_percentage: "sensor.ghostfolio_net_performance_percentage",
  total_investment: "sensor.ghostfolio_total_investment",
};
```

### 2. **Build the Card**

```bash
cd /home/claude
npm install
npm run build
```

This generates `dist/ghostfolio-card.js` (bundled and minified).

### 3. **Test Locally on Your HA Instance**

Copy the built file to your Home Assistant `www` folder:

```bash
# Via SSH or scp from your machine:
scp /home/claude/dist/ghostfolio-card.js your-ha-host:/home/path/to/ha/config/www/
```

Or if you're on the HA machine:
```bash
cp /home/claude/dist/ghostfolio-card.js /home/path/to/ha/config/www/
```

### 4. **Load the Card in Home Assistant**

Add to your dashboard YAML:

```yaml
resources:
  - url: /local/ghostfolio-card.js
    type: module

views:
  - title: Portfolio
    cards:
      - type: custom:ghostfolio-card
        title: "My Ghostfolio"
        show_performance: true
        show_investment: true
        currency_format: "USD"
        decimal_places: 2
```

Then **hard refresh** your browser: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac).

### 5. **Debug Issues**

If the card doesn't appear:

1. **Open browser Developer Tools** (F12) → Console
2. Look for errors like:
   - `ghostfolio-card is not defined` → JavaScript not loaded
   - `Cannot find sensor.ghostfolio_*` → Sensor names are wrong
   - TypeScript errors → Check tsconfig.json or re-build

3. **Check sensor state** in HA:
   - Developer Tools → States
   - Verify sensors are reporting values (not "unknown" or "unavailable")

### 6. **Styling & Customization**

The card respects Home Assistant's theme colors. To customize:

**Option A: CSS Variables** (add to your HA theme)
```yaml
ghostfolio-accent-color: "#3b82f6"
ghostfolio-positive-color: "#10b981"
ghostfolio-negative-color: "#ef4444"
```

**Option B: Inline Styles** (edit `ghostfolio-card.ts` line ~30)
```typescript
static get styles() {
  return css`
    :host {
      --ghostfolio-accent-color: #1e40af;  // ← Change here
      --ghostfolio-positive-color: #065f46;
      --ghostfolio-negative-color: #7f1d1d;
    }
  `;
}
```

Then rebuild: `npm run build`

## 📁 File Structure Reference

```
/home/claude/
├── ghostfolio-card.ts              # Main card logic & UI
├── ghostfolio-card-editor.ts       # Config editor (appears in UI)
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript settings
├── rollup.config.js                # Build configuration
├── hacs.json                       # HACS metadata
├── README.md                       # User documentation
├── .gitignore
└── dist/
    └── ghostfolio-card.js          # ← This is what HA loads
```

## 🔗 Integration Points

The card depends on these sensors from `ha_ghostfolio`:

| Sensor | Type | Example |
|--------|------|---------|
| `sensor.ghostfolio_current_value` | number | `450000.50` |
| `sensor.ghostfolio_net_performance` | number | `50000.25` |
| `sensor.ghostfolio_net_performance_percentage` | number | `12.50` |
| `sensor.ghostfolio_total_investment` | number | `400000` |

If any sensor is unavailable, the card displays "—" (dash).

## 🎨 UI Preview

The card renders as:

```
┌─────────────────────────────────────┐
│  🌐 My Ghostfolio               ⊙   │
├─────────────────────────────────────┤
│                                     │
│  💰 Current Value   📈 Performance │
│  $450,000.50        +$50,000.25    │
│                     +12.50%        │
│                                     │
│  📊 Total Invested                 │
│  $400,000.00                       │
│                                     │
└─────────────────────────────────────┘
```

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Card shows "Loading..." forever | Sensor entity IDs don't match; check Developer Tools → States |
| "Card not configured" error | Make sure YAML config is correct; hard refresh browser |
| Values show as "—" | Sensors exist but return no data; wait for next polling cycle or check ha_ghostfolio status |
| Styling looks broken | Clear browser cache (Ctrl+F5) or try Incognito mode |

## 📦 Publishing to GitHub & HACS

When ready to share:

1. **Create GitHub repo** (e.g., `ghostfolio-card`)
2. **Push your code**:
   ```bash
   cd /home/claude
   git init
   git add .
   git commit -m "Initial commit: Ghostfolio card v1.0.0"
   git remote add origin https://github.com/yourusername/ghostfolio-card.git
   git push -u origin main
   ```

3. **Create a GitHub Release**:
   - Tag: `v1.0.0`
   - Built file: upload `dist/ghostfolio-card.js`

4. **Submit to HACS**:
   - Go to https://github.com/hacs/default
   - Create issue with repo link
   - HACS maintainers review & add to store

## 📚 Learn More

- **Lit Documentation**: https://lit.dev
- **Home Assistant Card Dev**: https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/
- **Boilerplate Reference**: https://github.com/custom-cards/boilerplate-card
- **ha_ghostfolio Integration**: https://github.com/MichelFR/ha_ghostfolio

## 💡 Feature Ideas for v2.0

- 📉 Sparkline chart for 30-day trend
- 🎯 Target portfolio value
- 🔔 Performance alerts (e.g., "Alert if portfolio drops 5%")
- 📋 Holdings breakdown (top 5 holdings)
- 💱 Multi-portfolio support
- 📊 Asset allocation donut chart
- 🕐 Last update timestamp

---

**Ready to build?** Start with step 1 above, then come back with questions!
