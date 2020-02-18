import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import './app-document-product';
import '@vaadin/vaadin-upload/vaadin-upload';
import '@vaadin/vaadin-button'

class AppDocumentUpload extends LitElement {
    static get properties(){
        return {
            selectedGroups: { type: Object }
        }
    }
    render() {
        return html`
            <style>
                .mainDiv{
                    background:#F5F5F5;
                }
                .divHeader{
                    font-family :  Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    text-align : left;
                    color: white; 
                    font-weight: bolder; 
                    background: url('/MWG_Apps/images/top_nav_bg_tile.gif') repeat-x;
                    height: 25px;
                    line-height: 25px;
                    border-radius:5px 5px 0px 0px; 
                }
            </style>
            <div class="mainDiv">
                <div class = "divHeader">
                    Upload Application Document
                </div>
                <vaadin-horizontal-layout theme="spacing-s" >
                    <app-document-product productType = "Health" groupNumber = "${this.selectedGroups.healthGroup}" id="healthGroup">
                    </app-document-product>
                    <app-document-product productType = "Dental" groupNumber = "${this.selectedGroups.dentalGroup}" id="dentalGroup">
                    </app-document-product>
                    <app-document-product productType = "Vision" groupNumber = "${this.selectedGroups.visionGroup}" id="visionGroup">
                    </app-document-product>
                </vaadin-horizontal-layout>
                <vaadin-upload label = "Select Document" max-files = "1"> </vaadin-upload>
            </div>
        `;
    }
}
customElements.define("app-document-upload", AppDocumentUpload);