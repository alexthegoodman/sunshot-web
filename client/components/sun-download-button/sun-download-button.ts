import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-download-button.scss?inline';

@customElement('sun-download-button')
export class SunDownloadButton extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <a
        class="btn"
        href="https://sunshot.b-cdn.net/Sunshot Setup 1.0.92.exe"
        target="_blank"
        download
        >Download for Windows</a
      >
    `;
  }
}
