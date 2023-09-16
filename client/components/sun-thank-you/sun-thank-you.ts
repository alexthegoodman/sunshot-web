import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-thank-you.scss?inline';

@customElement('sun-thank-you')
export class ThankYou extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <div class="thankYou">
        <h1>Thank you!</h1>
        <p>
          Hopefully, you are completely satisfied with your purchase. Feedback
          is always welcome. Support is available at
          <a href="mailto:admin@sunshot.app">admin@sunshot.app</a>
        </p>
        <button class="btn">Download for Windows</button>
      </div>
    `;
  }
}
