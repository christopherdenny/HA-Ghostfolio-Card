import { LitElement, html, css, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

interface EditorConfig {
  type?: string;
  title?: string;
  show_performance?: boolean;
  show_investment?: boolean;
  show_currency?: boolean;
  currency_format?: string;
  decimal_places?: number;
}

class GhostfolioCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() _config!: EditorConfig;

  static get styles() {
    return css`
      ha-form {
        width: 100%;
      }

      .error {
        color: var(--error-color);
        margin-bottom: 16px;
      }

      ha-switch {
        margin-bottom: 12px;
      }

      .help-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
    `;
  }

  setConfig(config: EditorConfig): void {
    this._config = {
      type: "custom:ghostfolio-card",
      title: "Portfolio",
      show_performance: true,
      show_investment: true,
      show_currency: true,
      currency_format: "USD",
      decimal_places: 2,
      ...config,
    };
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html`<div class="error">Home Assistant not available</div>`;
    }

    return html`
      <div>
        <ha-textfield
          label="Card Title"
          .value=${this._config.title || "Portfolio"}
          @input=${this._valueChanged}
          data-config-key="title"
        ></ha-textfield>

        <div style="margin-top: 16px;">
          <ha-switch
            .checked=${this._config.show_performance !== false}
            @change=${this._toggleChanged}
            data-config-key="show_performance"
          ></ha-switch>
          <label>Show Performance Metrics</label>
        </div>

        <div style="margin-top: 12px;">
          <ha-switch
            .checked=${this._config.show_investment !== false}
            @change=${this._toggleChanged}
            data-config-key="show_investment"
          ></ha-switch>
          <label>Show Total Investment</label>
        </div>

        <div style="margin-top: 12px;">
          <ha-switch
            .checked=${this._config.show_currency !== false}
            @change=${this._toggleChanged}
            data-config-key="show_currency"
          ></ha-switch>
          <label>Format as Currency</label>
        </div>

        <ha-textfield
          label="Currency (USD, EUR, etc)"
          .value=${this._config.currency_format || "USD"}
          @input=${this._valueChanged}
          data-config-key="currency_format"
          style="margin-top: 16px;"
        ></ha-textfield>

        <ha-textfield
          label="Decimal Places"
          .value=${String(this._config.decimal_places || 2)}
          type="number"
          min="0"
          max="4"
          @input=${this._valueChanged}
          data-config-key="decimal_places"
          style="margin-top: 12px;"
        ></ha-textfield>

        <div class="help-text">
          <strong>Note:</strong> Ensure the ha_ghostfolio integration is
          installed and the following sensors exist:
          <ul>
            <li>sensor.ghostfolio_current_value</li>
            <li>sensor.ghostfolio_net_performance</li>
            <li>sensor.ghostfolio_net_performance_percentage</li>
            <li>sensor.ghostfolio_total_investment</li>
          </ul>
        </div>
      </div>
    `;
  }

  private _valueChanged(ev: Event): void {
    const target = ev.target as any;
    const key = target.getAttribute("data-config-key");
    let value: any = target.value;

    if (key === "decimal_places") {
      value = parseInt(value, 10);
    }

    this._config = {
      ...this._config,
      [key]: value,
    };

    this._dispatchConfigChanged();
  }

  private _toggleChanged(ev: Event): void {
    const target = ev.target as any;
    const key = target.getAttribute("data-config-key");

    this._config = {
      ...this._config,
      [key]: target.checked,
    };

    this._dispatchConfigChanged();
  }

  private _dispatchConfigChanged(): void {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      composed: true,
      bubbles: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define("ghostfolio-card-editor", GhostfolioCardEditor);
