import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-header.scss?inline';

@customElement('sun-header')
export class SunHeader extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <header>
        <div class="headerInner">
          <div class="logoWrapper"><slot name="logo"></slot></div>
          <div class="headerCtrls">
            <nav>
              <ul>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="/contact-support">Contact Support</a></li>
              </ul>
            </nav>
            <button class="btn">Download Now</button>
          </div>
        </div>
      </header>
    `;
  }
}
