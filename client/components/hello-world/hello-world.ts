import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import logoUrl from '../../images/logowbg.svg';
import styles from './hello-world.scss?inline';

@customElement('test-header')
export class SimpleGreeting extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static override styles = unsafeCSS(styles);

  // Declare reactive properties
  @property()
  name?: string = 'World';

  // Render the UI as a function of component state
  override render() {
    return html`<div>
      <img alt="Lit" src=${logoUrl} width="150" />
      <p className="test">Hello, ${this.name}!</p>
      <button @click=${this.handleClick}>Test</button>
    </div>`;
  }

  // update name on button click
  handleClick() {
    this.name = 'Lit';
  }
}
