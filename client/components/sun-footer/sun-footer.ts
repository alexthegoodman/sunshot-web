import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-footer.scss?inline';

@customElement('sun-footer')
export class SunFooter extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <footer>
        <div class="footerInner">
          <div class="logoWrapper"><slot name="logo"></slot></div>
          <ul>
            <li><a href="/recover-license">Recover License</a></li>
            <li><a href="/contact-support">Contact Support</a></li>
          </ul>
        </div>
      </footer>
    `;
  }
}
