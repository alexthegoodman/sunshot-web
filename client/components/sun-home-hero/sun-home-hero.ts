import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-home-hero.scss?inline';

@customElement('sun-home-hero')
export class SunHomeHero extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <section class="homeHero">
        <div class="homeHeroInner">
          <div class="content">
            <div class="title">
              <h1>
                Create
                <span class="gradient">Beautiful</span>
                Screen Recordings
              </h1>
            </div>
            <div class="checks">
              <div class="check">
                <img src="/images/checkbold.svg" />
                <span>Follows Your Mouse</span>
              </div>
              <div class="check">
                <img src="/images/checkbold.svg" />
                <span>Full Quality</span>
              </div>
              <div class="check">
                <img src="/images/checkbold.svg" />
                <span>Easy and Fast</span>
              </div>
            </div>
          </div>
          <!-- content -->
          <div class="video">
            <video autoplay muted loop playsinline>
              <source src="/videos/postmanTest.mp4" type="video/mp4" />
            </video>
          </div>
          <!-- video -->
        </div>
      </section>
    `;
  }
}
