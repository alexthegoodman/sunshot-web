import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-pricing.scss?inline';

@customElement('sun-pricing')
export class SunPricing extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <section>
        <section>
          <h1>Where should you recieve your license key?</h1>
          <p>
            We'll send your license key to the email address you provide below.
          </p>
          <sun-license-form></sun-license-form>
        </section>
      </section>
    `;
  }
}
