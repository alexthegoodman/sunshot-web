import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import logoUrl from '../../images/logowbg.svg';
import styles from './sun-logo.scss?inline';

@customElement('sun-logo')
export class Logo extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <a href="/" class="sun-logo">
        <img alt="SunShot logo" src=${logoUrl} />
        <span>SunShot</span>
      </a>
    `;
  }
}
