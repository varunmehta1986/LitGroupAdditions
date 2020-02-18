import { LitElement, html } from 'lit-element';

class MwHeader extends LitElement {
 render() {
    return html`
      <style>
        :host {
          display: block;
        }
        .logoTop {
          width: 100%;
          text-align: left;
        }
        .logo {
          text-align: right; 
          background: URL(/MWG_Apps/images/mw_int_header_tile.gif) repeat-x;
          height: 41px;
          width: 100%;
          vertical-align: top;
        }
        img {
          vertical-align: top; 
          float: left;
        }
        .logoFooter {
          text-align: center; 
          width: 100%;
          vertical-align: text-bottom; 
          padding-top: 4px;
          background: url(/MWG_Apps/images/top_nav_bg_tile.gif) repeat-x;
          height: 26px;
        }
      h1{
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      }
      </style>
      <div class="logoTop">
          <div class="logo">
            <img src="/MWG_Apps/images/mw_header_logo.gif" alt="MW Header" .onerror="${this.onHeaderImageNotFound}"  />
            <br />
          </div>
            <div class="logoFooter"></div>
      </div>
      <div>
        <h1>${this.title}</h1>
      </div>      
    `;
  }

  onHeaderImageNotFound(e){
    e.srcElement.src = location.origin + "/mw-header/images/mw_header_logo.gif";
  }

  static get properties() {
    return {
      title: {
        type: String,
        value: 'MW Page',
      },
    };
  }
}

customElements.define('mw-header', MwHeader);
