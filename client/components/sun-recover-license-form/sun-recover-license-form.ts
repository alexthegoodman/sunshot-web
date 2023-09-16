import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import styles from './sun-recover-license-form.scss?inline';

@customElement('sun-recover-license-form')
export class SunLicenseForm extends LitElement {
  static override styles = unsafeCSS(styles);

  @state()
  protected _email = '';

  @state()
  protected _errorMessage = '';

  @state()
  protected _successMessage = '';

  override render() {
    return html`
      <section class="recoverLicenseForm">
        <div class="recoverLicenseFormInner">
          <div class="recoverLicenseHeader">
            <h1>Recover License(s)</h1>
            <p>
              It happens to all of us. For some reason, you’ve been prompted to
              enter your license key, but you have forgotten it! That’s okay.
              Enter your email below, and your license key(s) will be emailed to
              you instantly!
            </p>
          </div>
          <form @submit="${this._formSubmit}">
            <label for="email">Your email</label>
            <input
              id="email"
              type="email"
              autocomplete="email"
              .value="${this._email}"
              @change="${this._updateEmail}"
            />
            ${this._errorMessage}
            <button class="btn" type="submit">Request License</button>
            ${this._successMessage}
          </form>
        </div>
      </section>
    `;
  }

  private async _formSubmit(event: Event) {
    event.preventDefault();
    // this.dispatchEvent(new CustomEvent('form-submit', {detail: this._email}));

    // TODO: client-side validation

    // send to loopback api and get back stripe url
    const data = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/users/send-licenses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: this._email}),
      },
    );

    const json = await data.json();

    // TODO: error handling

    if (!data.ok) {
      console.error(json);
      this._errorMessage = json.error.message;
      return;
    }

    if (json.message === 'User not found') {
      this._errorMessage = 'User not found';
      return;
    }

    this._successMessage = 'Check your email for your license key!';
  }

  private _updateEmail(event: Event) {
    this._email = (event.target as HTMLInputElement).value;
  }
}
