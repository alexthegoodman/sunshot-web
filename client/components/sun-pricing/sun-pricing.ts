import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-pricing.scss?inline';

@customElement('sun-pricing')
export class SunPricing extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`<div></div>`;
  }
}
