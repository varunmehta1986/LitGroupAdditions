import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-upload';
import '@polymer/iron-icons/iron-icons.js';
import './add-new-requirement-document';

class UploadRequirementDocument extends LitElement {

    static get properties(){
        return{
            hideAddRequirement:{type: Boolean},
            items:{type: Array},
            index:{type: Number}          
        }
    }
    constructor(){
        super();
        this.hideAddRequirement = false;
        this.index = 0;
    }

    render(){
        return html`
        
                <div style="width:550px;padding-top:14px" ?hidden="${this.hideAddRequirement}" >
                <vaadin-vertical-layout>
                <span style="font-size : 14px;font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 
                            'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'">Upload Requirement Document</span> 
               
                            <vaadin-button  theme="small"
                                            @click = "${this.onAddRequirementClick}">
                                            <iron-icon icon="add-box"></iron-icon>
                                            Add Requirement document                                            
                            </vaadin-button>
                            
                            
                            <add-requirement-document   id="${this.index}" 
                                                        ?hidden = "${this.hideAddRequirement}"   
                                                        style="padding:20px"                                                     
                                                       ></add-requirement-document>
                    
                    
                </vaadin-vertical-layout>
                </div>
        `;
    }
    onAddRequirementClick(){
        this.index = this.index + 1;
        var newReq =  document.createElement("add-requirement-document");        
        this.shadowRoot.appendChild(newReq);

    }
    
    
}
customElements.define("upload-requirement-document", UploadRequirementDocument);