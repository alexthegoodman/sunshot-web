import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './sun-accordion.scss?inline';

@customElement('sun-accordion')
export class SunAccordion extends LitElement {
  static override styles = unsafeCSS(styles);

  // accordion items property
  @property({type: Array})
  items = [] as {title: string; content: string}[];

  override render() {
    return html`
      <div class="accordion">
        <div class="accordionInner">
          ${this.items &&
          this.items.map(item => {
            return html`
              <div class="accordionItem">
                <div class="accordionItemInner">
                  <div class="accordionItemTitle">
                    <h3>${item.title}</h3>
                  </div>
                  <div class="accordionItemContent">
                    <p>${item.content}</p>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
