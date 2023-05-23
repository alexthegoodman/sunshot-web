import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import logoUrl from '../../images/logowbg.svg';
import styles from './sun-logo.scss?inline';

@customElement('sun-logo')
export class Logo extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <div>
        <img alt="Lit" src=${logoUrl} width="150" />
        <span>SunShot</span>
      </div>
    `;
  }
}
