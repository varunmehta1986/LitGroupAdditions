import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-text-field/vaadin-text-field'
class AppDocumentProduct extends LitElement {
    static get properties() {
        return {
            productType: { type: String },
            groupNumber: { type: String },
            hideNoGroupSelected : {type: Boolean}
        }
    }
    render() {
        return html`
            <style>
                .divHeader{
                    font-family :  Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    text-align : center;
                    color: white; 
                    background: #0099CC;
                    height: 20px;
                    line-height: 20px;
                }
                .mainDiv{
                    border-width : 1px;
                    border-color : #0099CC;
                    height: 100%;
                    width :  250px;
                    border-style: solid;
                }
                .noGroupSelected{
                    font-family :  Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    text-align : center;
                    padding-top : 60px;
                }
            </style>
            <div class = "mainDiv">
                <div id="divGroup" ?hidden = "${(this.groupNumber==="" || this.groupNumber===undefined || 
                                                this.groupNumber===null || this.groupNumber === "None")}">
                    <div class="divHeader">
                        ${this.productType}
                    </div>
                    <div class="divHeader">
                      ${this.groupNumber}
                    </div>
                    <div> 
                        <vaadin-vertical-layout>
                            <vaadin-combo-box label = "Class/Waiting Period" style="width: 240px"
                                    placeholder = "Select Class/Wait Period"></vaadin-combo-box>
                            <vaadin-text-field label = "Document Description *" style="width: 240px" 
                                        value="App for Group# ${this.groupNumber}">
                            </vaadin-text-field>
                            <vaadin-text-area label = "Long Description" style="width: 240px"></vaadin-text-area>
                        </vaadin-vertical-layout>
                    </div>
                </div>
                <div id="divNoGroup" class="noGroupSelected" 
                                ?hidden = "${!(this.groupNumber==="" || this.groupNumber===undefined ||
                                                 this.groupNumber===null  || this.groupNumber === "None")}"> 
                    No ${this.productType} Group has been selected.
                </div>
            </div>
        `;
    }
}
customElements.define("app-document-product", AppDocumentProduct);