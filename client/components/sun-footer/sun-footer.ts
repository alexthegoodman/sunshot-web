import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-footer.scss?inline';

@customElement('sun-footer')
export class SunFooter extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`<div></div>`;
  }
}
