import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import styles from './sun-header.scss?inline';

@customElement('sun-header')
export class SunHeader extends LitElement {
  static override styles = unsafeCSS(styles);

  @state()
  _menuOpen = false;

  override render() {
    return html`
      <header>
        <div class="headerInner">
          <div class="logoWrapper"><slot name="logo"></slot></div>
          <div class="headerCtrls ${this._menuOpen ? 'open' : ''}">
            <nav>
              <ul>
                <li>
                  <a href="#!" @click=${this.scrollToPricing}>Pricing</a>
                </li>
                <li><a href="mailto:admin@sunshot.app">Contact Support</a></li>
              </ul>
            </nav>
            <sun-download-button></sun-download-button>
          </div>
          <div class="mobile">
            <img src="/images/menu.svg" @click=${this._openMenu} />
          </div>
        </div>
      </header>
    `;
  }

  _openMenu() {
    this._menuOpen = !this._menuOpen;
  }

  // scroll to #pricing on click
  private scrollToPricing() {
    this._openMenu();
    const pricingEl = document.getElementById('pricing');
    console.info('pricingEl', pricingEl);
    pricingEl?.scrollIntoView({behavior: 'smooth'});
  }
}
