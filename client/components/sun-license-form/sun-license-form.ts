import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import styles from './sun-license-form.scss?inline';

@customElement('sun-license-form')
export class SunLicenseForm extends LitElement {
  static override styles = unsafeCSS(styles);

  @state()
  protected _email = '';

  override render() {
    return html`
      <form @submit="${this._formSubmit}">
        <label>Your email</label>
        <input
          type="text"
          autocomplete="email"
          .value="${this._email}"
          @change="${this._updateEmail}"
        />
        <button type="submit">Continue to Payment</button>
      </form>
    `;
  }

  private _formSubmit(event: Event) {
    event.preventDefault();
    console.info('form-submit', this._email);
    // this.dispatchEvent(new CustomEvent('form-submit', {detail: this._email}));

    // send to loopback api and get back stripe url
  }

  private _updateEmail(event: Event) {
    this._email = (event.target as HTMLInputElement).value;
  }
}
