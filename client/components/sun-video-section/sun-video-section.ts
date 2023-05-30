import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-video-section.scss?inline';

@customElement('sun-video-section')
export class SunVideoSection extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`<div></div>`;
  }
}
