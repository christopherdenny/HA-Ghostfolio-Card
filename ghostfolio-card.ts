import { LitElement, html, css, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

interface GhostfolioConfig extends LovelaceCardConfig {
  type: string;
  show_performance: boolean;
  show_investment: boolean;
  show_currency: boolean;
  title?: string;
  currency_format?: string;
  decimal_places?: number;
}

interface GhostfolioSensors {
  current_value: string | null;
  net_performance: string | null;
  net_performance_percentage: string | null;
  total_investment: string | null;
}

class GhostfolioCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() _config!: GhostfolioConfig;
  @state() _sensors: GhostfolioSensors = {
    current_value: null,
    net_performance: null,
    net_performance_percentage: null,
    total_investment: null,
  };

  static get styles() {
    return css`
      :host {
        --ghostfolio-accent-color: var(--primary-color, #3b82f6);
        --ghostfolio-positive-color: #10b981;
        --ghostfolio-negative-color: #ef4444;
        --ghostfolio-bg-primary: var(--card-background-color, #ffffff);
        --ghostfolio-bg-secondary: var(--secondary-background-color, #f3f4f6);
        --ghostfolio-text-primary: var(--primary-text-color, #1f2937);
        --ghostfolio-text-secondary: var(--secondary-text-color, #6b7280);
        --ghostfolio-border-color: var(--divider-color, #e5e7eb);
      }

      .card {
        background-color: var(--ghostfolio-bg-primary);
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }

      .header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--ghostfolio-border-color);
      }

      .header-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--ghostfolio-text-primary);
        margin: 0;
        flex: 1;
      }

      .header-icon {
        width: 28px;
        height: 28px;
        color: var(--ghostfolio-accent-color);
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 16px;
      }

      .metric {
        padding: 12px;
        background-color: var(--ghostfolio-bg-secondary);
        border-radius: 8px;
        border-left: 3px solid var(--ghostfolio-accent-color);
      }

      .metric-label {
        font-size: 12px;
        color: var(--ghostfolio-text-secondary);
        margin-bottom: 6px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .metric-value {
        font-size: 20px;
        font-weight: 700;
        color: var(--ghostfolio-text-primary);
      }

      .metric-subtext {
        font-size: 12px;
        color: var(--ghostfolio-text-secondary);
        margin-top: 4px;
      }

      .performance-positive {
        color: var(--ghostfolio-positive-color);
      }

      .performance-negative {
        color: var(--ghostfolio-negative-color);
      }

      .loading {
        color: var(--ghostfolio-text-secondary);
        font-size: 14px;
        padding: 20px;
        text-align: center;
      }

      .error {
        color: var(--ghostfolio-negative-color);
        font-size: 14px;
        padding: 20px;
        text-align: center;
      }

      .icon-prefix {
        display: inline-block;
        margin-right: 4px;
      }
    `;
  }

  setConfig(config: GhostfolioConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    this._config = {
      show_performance: true,
      show_investment: true,
      show_currency: true,
      currency_format: "USD",
      decimal_places: 2,
      ...config,
    };
  }

  protected updated(): void {
    // Update sensor states from Home Assistant
    this._updateSensorStates();
  }

  private _updateSensorStates(): void {
    if (!this.hass) return;

    // Map sensor entity IDs — adjust these based on your ha_ghostfolio integration setup
    const sensorMap = {
      current_value: "sensor.ghostfolio_current_value",
      net_performance: "sensor.ghostfolio_net_performance",
      net_performance_percentage: "sensor.ghostfolio_net_performance_percentage",
      total_investment: "sensor.ghostfolio_total_investment",
    };

    const newSensors: GhostfolioSensors = {
      current_value: null,
      net_performance: null,
      net_performance_percentage: null,
      total_investment: null,
    };

    Object.entries(sensorMap).forEach(([key, entityId]) => {
      const state = this.hass.states[entityId];
      if (state) {
        newSensors[key as keyof GhostfolioSensors] = state.state;
      }
    });

    this._sensors = newSensors;
  }

  protected render(): TemplateResult | void {
    if (!this._config) {
      return html`<div class="error">Card not configured</div>`;
    }

    if (!this.hass) {
      return html`<div class="loading">Loading...</div>`;
    }

    const title = this._config.title || "Portfolio";
    const currentValue = this._sensors.current_value || "—";
    const netPerformance = this._sensors.net_performance || "—";
    const netPercentage = this._sensors.net_performance_percentage || "—";
    const totalInvestment = this._sensors.total_investment || "—";

    // Determine performance color
    const performanceNum =
      typeof this._sensors.net_performance === "string"
        ? parseFloat(this._sensors.net_performance)
        : null;
    const isPositive = performanceNum !== null && performanceNum >= 0;
    const performanceClass = isPositive
      ? "performance-positive"
      : "performance-negative";

    return html`
      <div class="card">
        <div class="header">
          <h2 class="header-title">${title}</h2>
          <svg class="header-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
            />
          </svg>
        </div>

        ${!this._sensors.current_value
          ? html`<div class="loading">Waiting for sensor data...</div>`
          : html`
              <div class="metrics">
                <div class="metric">
                  <div class="metric-label">
                    <span class="icon-prefix">💰</span>Current Value
                  </div>
                  <div class="metric-value">${this._formatCurrency(currentValue)}</div>
                </div>

                ${this._config.show_performance
                  ? html`
                      <div class="metric">
                        <div class="metric-label">
                          <span class="icon-prefix">📈</span>Net Performance
                        </div>
                        <div class="metric-value ${performanceClass}">
                          ${this._formatPerformance(netPerformance)}
                        </div>
                        <div class="metric-subtext ${performanceClass}">
                          ${this._formatPercentage(netPercentage)}
                        </div>
                      </div>
                    `
                  : ""}

                ${this._config.show_investment
                  ? html`
                      <div class="metric">
                        <div class="metric-label">
                          <span class="icon-prefix">📊</span>Total Invested
                        </div>
                        <div class="metric-value">
                          ${this._formatCurrency(totalInvestment)}
                        </div>
                      </div>
                    `
                  : ""}
              </div>
            `}
      </div>
    `;
  }

  private _formatCurrency(value: string): string {
    if (value === "—" || !value) return "—";
    try {
      const num = parseFloat(value);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this._config.currency_format || "USD",
        minimumFractionDigits: this._config.decimal_places || 2,
        maximumFractionDigits: this._config.decimal_places || 2,
      }).format(num);
    } catch {
      return value;
    }
  }

  private _formatPerformance(value: string): string {
    if (value === "—" || !value) return "—";
    try {
      const num = parseFloat(value);
      const sign = num >= 0 ? "+" : "";
      return sign + this._formatCurrency(value);
    } catch {
      return value;
    }
  }

  private _formatPercentage(value: string): string {
    if (value === "—" || !value) return "—";
    try {
      const num = parseFloat(value);
      const sign = num >= 0 ? "+" : "";
      return sign + num.toFixed(this._config.decimal_places || 2) + "%";
    } catch {
      return value;
    }
  }

  static getConfigElement(): any {
    return document.createElement("ghostfolio-card-editor");
  }

  static getStubConfig(): Record<string, any> {
    return {
      type: "custom:ghostfolio-card",
      title: "Portfolio",
      show_performance: true,
      show_investment: true,
      show_currency: true,
      currency_format: "USD",
      decimal_places: 2,
    };
  }
}

customElements.define("ghostfolio-card", GhostfolioCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ghostfolio-card",
  name: "Ghostfolio Portfolio Card",
  description: "Display your Ghostfolio portfolio performance",
  preview: true,
  documentationURL: "https://github.com/yourusername/ghostfolio-card",
});
