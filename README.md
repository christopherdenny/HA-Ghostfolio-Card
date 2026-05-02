# Ghostfolio Card for Home Assistant

A sleek, modern Home Assistant custom card for displaying your Ghostfolio portfolio performance on your dashboards.

## Features

- 💰 Display current portfolio value
- 📈 Show net performance in dollars and percentage
- 📊 Display total investment
- 🎨 Light/dark mode support with HA theme integration
- ⚙️ Fully configurable via UI or YAML
- 🔄 Real-time updates from `ha_ghostfolio` integration sensors
- 📱 Responsive grid layout

## Prerequisites

Before using this card, you must have the **ha_ghostfolio** custom integration installed:

```
https://github.com/MichelFR/ha_ghostfolio
```

Installation: Add the repository to HACS → Integrations, install `ha_ghostfolio`, then configure it with your Ghostfolio instance details.

This card will expose the following sensors:
- `sensor.ghostfolio_current_value`
- `sensor.ghostfolio_net_performance`
- `sensor.ghostfolio_net_performance_percentage`
- `sensor.ghostfolio_total_investment`

## Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to **Frontends**
3. Click the ⋮ menu → **Custom repositories**
4. Add: `https://github.com/christopherdenny/HA-Ghostfolio-Card`
5. Select category: **Lovelace**
6. Click **Install**
7. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)

### Manual Installation

1. Download `ghostfolio-card.js` from the latest release
2. Copy it to `<your-ha-config>/www/ghostfolio-card.js`
3. Add the following to your Lovelace dashboard YAML:

```yaml
resources:
  - url: /local/ghostfolio-card.js
    type: module
```

## Configuration

### YAML Configuration

```yaml
type: custom:ghostfolio-card
title: "My Portfolio"
show_performance: true
show_investment: true
show_currency: true
currency_format: "USD"
decimal_places: 2
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | *(required)* | `custom:ghostfolio-card` |
| `title` | string | `Portfolio` | Card title displayed in header |
| `show_performance` | boolean | `true` | Show net performance metrics |
| `show_investment` | boolean | `true` | Show total investment amount |
| `show_currency` | boolean | `true` | Format values as currency |
| `currency_format` | string | `USD` | Currency code (USD, EUR, GBP, etc) |
| `decimal_places` | number | `2` | Decimal precision for currency display |

### UI Configuration

The card also supports visual configuration through the Home Assistant UI:
1. Click the ⋮ menu on any dashboard card
2. Select **Edit card**
3. Click **Show Code Editor** or use the form fields that appear

## Usage Examples

### Basic Portfolio Card

```yaml
type: custom:ghostfolio-card
```

### Multi-Currency Portfolio

```yaml
type: custom:ghostfolio-card
title: "Investments (CHF)"
currency_format: "CHF"
decimal_places: 0
```

### Performance-Only View

```yaml
type: custom:ghostfolio-card
title: "Portfolio Performance"
show_investment: false
```

## Development

### Requirements

- Node.js 16+ (use nvm or similar)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ghostfolio-card.git
cd ghostfolio-card

# Install dependencies
npm install

# Start development server (watches for changes)
npm run start

# Build for production
npm run build
```

The built files will be in the `dist/` directory.

### Project Structure

```
.
├── ghostfolio-card.ts           # Main card component
├── ghostfolio-card-editor.ts    # Visual editor component
├── rollup.config.js             # Build configuration
├── package.json
├── tsconfig.json
├── hacs.json                    # HACS metadata
└── README.md
```

### Debugging

1. Open Home Assistant in your browser
2. Press F12 to open Developer Tools → Console
3. Check for any TypeScript/JavaScript errors
4. The card logs its state updates to the console (development mode)

## Troubleshooting

### Sensors Not Found

```
Error: sensor.ghostfolio_current_value not found
```

**Solution:** Ensure `ha_ghostfolio` is properly installed and integrated:
1. Go to Settings → Devices & Services
2. Search for "Ghostfolio"
3. Verify the integration is loaded
4. Check the integration's status page for the sensors

### Card Not Rendering

**Possible causes:**
- Browser cache not cleared (hard refresh: Ctrl+F5)
- TypeScript compilation error (check browser console)
- Sensor entity IDs don't match (confirm in Developer Tools → States)

### Missing Data

If the card shows "—" for all values:
1. Verify the `ha_ghostfolio` integration has successfully connected to your Ghostfolio instance
2. Check your Ghostfolio API token is valid (integration settings)
3. Wait for the integration's next polling cycle (default: 15 minutes)

## Performance Tips

- The card polls sensor data at the integration's configured interval (default 15 minutes)
- To increase update frequency, modify the `ha_ghostfolio` integration's polling interval
- The card is optimized to only re-render when sensor values actually change

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or feature requests, please open an issue on GitHub:
https://github.com/yourusername/ghostfolio-card/issues

For Ghostfolio-related questions:
https://github.com/ghostfolio/ghostfolio

For ha_ghostfolio integration questions:
https://github.com/MichelFR/ha_ghostfolio

## Changelog

### v1.0.0 (2025-05-01)
- Initial release
- Core metrics display (value, performance, investment)
- Light/dark theme support
- YAML and UI configuration
- HACS support

---

Made with ❤️ for the Home Assistant community
