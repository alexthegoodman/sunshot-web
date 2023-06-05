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
                <li>
                  <a href="#!" @click=${this.scrollToPricing}>Pricing</a>
                </li>
                <li><a href="mailto:admin@sunshot.app">Contact Support</a></li>
              </ul>
            </nav>
            <button class="btn">Download Now</button>
          </div>
        </div>
      </header>
    `;
  }

  // scroll to #pricing on click
  private scrollToPricing() {
    const pricingEl = document.getElementById('pricing');
    console.info('pricingEl', pricingEl);
    pricingEl?.scrollIntoView({behavior: 'smooth'});
  }
}
