import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './sun-video-section.scss?inline';

@customElement('sun-video-section')
export class SunVideoSection extends LitElement {
  static override styles = unsafeCSS(styles);

  @property({type: String})
  videoSrc = '';

  override render() {
    return html`
      <section class="videoSection">
        <div class="videoSectionInner">
          <div class="video">
            <video autoplay muted loop playsinline>
              <source src=${this.videoSrc} type="video/mp4" />
            </video>
          </div>
          <!-- video -->
          <div class="content">
            <div class="icon">
              <slot name="icon"></slot>
            </div>
            <div class="title">
              <slot name="title"></slot>
            </div>
            <div class="description">
              <slot name="description"></slot>
            </div>
            <button class="btn">Download Now</button>
          </div>
          <!-- content -->
        </div>
      </section>
    `;
  }
}
