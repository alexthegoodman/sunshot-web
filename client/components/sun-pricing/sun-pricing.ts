import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import styles from './sun-pricing.scss?inline';

@customElement('sun-pricing')
export class SunPricing extends LitElement {
  static override styles = unsafeCSS(styles);

  @state()
  _modalOpen = false;

  override render() {
    return html`
      <section class="pricing">
        <div class="pricingInner">
          <div class="headline">
            <h5>One simple price</h5>
          </div>
          <div class="info">
            <div class="content">
              <span>$19</span>
              <p>Lifetime Access</p>
            </div>
            <div class="ctrls">
              <button class="btn" @click=${this._openModal}>
                Buy License Now
              </button>
            </div>
          </div>
        </div>
        ${this._modalOpen
          ? html`
              <section class="modal">
                <div class="modalInner">
                  <h6>Where should you recieve your license key?</h6>
                  <p>
                    We'll send your license key to the email address you provide
                    below.
                  </p>
                  <sun-license-form></sun-license-form>
                </div>
              </section>
              <div class="modalCover"></div>
            `
          : null}
      </section>
    `;
  }

  _openModal() {
    this._modalOpen = true;
  }
}
