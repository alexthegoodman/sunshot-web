import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-features.scss?inline';

@customElement('sun-features')
export class SunFeatures extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`<div></div>`;
  }
}
