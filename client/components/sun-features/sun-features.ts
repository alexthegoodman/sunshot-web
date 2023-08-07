import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import styles from './sun-features.scss?inline';

@customElement('sun-features')
export class SunFeatures extends LitElement {
  static override styles = unsafeCSS(styles);

  override render() {
    return html`
      <section class="features">
        <div class="featuresInner">
          <div class="featuresLeft">
            <div class="feature">
              <span>Smooth Tracking</span>
              <h2>Follows your mouse</h2>
              <p>
                SunShot records all of your movements during screen capture.
                Guide viewers with your cursor!
              </p>
            </div>
          </div>
          <div class="featuresRight">
            <div class="feature">
              <h3>Customize</h3>
              <p>
                Pick where, when, and how much zooms happen, pick background.
              </p>
            </div>
            <div class="feature">
              <h4>Full Quality</h4>
              <p>
                Capture in 4K? Export at full size. 60FPS. Smooth animations.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
