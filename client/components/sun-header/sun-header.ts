import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-header.scss?inline';

@customElement('sun-header')
export class SunHeader extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <header>
        <div className="headerInner">
          <slot name="logo"></slot>
          <span>Links</span>
        </div>
      </header>
    `;
  }
}
