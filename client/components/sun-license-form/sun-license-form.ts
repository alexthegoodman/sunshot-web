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
        <label for="email">Your email</label>
        <input
          id="email"
          type="email"
          autocomplete="email"
          .value="${this._email}"
          @change="${this._updateEmail}"
        />
        <button class="btn" type="submit">Continue to Payment</button>
      </form>
    `;
  }

  private async _formSubmit(event: Event) {
    event.preventDefault();
    // this.dispatchEvent(new CustomEvent('form-submit', {detail: this._email}));

    // TODO: client-side validation

    // send to loopback api and get back stripe url
    const data = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/stripe/create-session?email=${
        this._email
      }`,
    );

    // TODO: error handling

    const sessionUrl = await data.text();

    // redirect to stripe url
    window.location.href = sessionUrl;
  }

  private _updateEmail(event: Event) {
    this._email = (event.target as HTMLInputElement).value;
  }
}
