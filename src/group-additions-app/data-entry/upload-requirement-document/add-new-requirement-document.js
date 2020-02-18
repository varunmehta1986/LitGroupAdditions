import {LitElement, html, css} from "lit-element";

class AddRequirementDocument extends LitElement{
    static get properties(){
        return{           
            selectedRequirementType:{type: String},
            requirementDocumentTypes:{type: Array},
            requirementDocumentOptionsUrl:{type: String},
            hideAddRequirementControls:{type: Boolean},
            hideUpload:{type: Boolean},
            index: {type:Number},
            file:{type: String}
        }
    }
    constructor(){
        super();
        this.selectedRequirementType = "";
        this.hideAddRequirementControls = false;
        this.hideUpload = false;
        this.requirementDocumentOptionsUrl = window.location.protocol + "//" + window.location.hostname + ":"
                                            + window.location.port
                                            + "/" + window.location.pathname
                                            + "/api/GroupAdditions/GetRequirementDocumentTypes";
        this.index = 0;     
        this.string = "";                                       

    }
    render(){
        return html`
                    <div id="vaadinAddRequirement" ?hidden = "${this.hideAddRequirementControls}" style="width:550px;padding-top:14px">
                        <vaadin-horizontal-layout theme="spacing-s">
                                <vaadin-combo-box   ?hidden = "${this.hideRequirementType}"
                                                    placeholder = "Select Requirement Type"                                                                                                     
                                                    .items = "${this.requirementDocumentTypes}"  
                                                    item-label-path = "docDescription"  
                                                    item-value-path = "requirementTypeId"
                                                    style = "width:350px"                                                     
                                                    @selected-item-changed = "${(e) => this.selectedRequirementType = e.detail.message}">
                                </vaadin-combo-box>
                                <iron-ajax id="iaGetRequirementDocumentSelections" auto 
                                            url="${this.requirementDocumentOptionsUrl}" 
                                            handle-as ="json" 
                                            @response = "${this.onGetRequirementDocumentSelectionsApiResponse}" >
                                </iron-ajax>
                                <vaadin-upload id="${this.index}"
                                                style="width: 400px"                                               
                                                @click= "${this.onUploadClick.bind(this)}"
                                                @file-uploaded = "${(e) => this.file = e.detail.message}"
                                                ></vaadin-upload>
                                <vaadin-button @click="${this.onRemoveRequirementClick.bind(this)}"
                                                >
                                                <iron-icon icon="clear" style  = "color : red"></iron-icon>                                                                                         
                                </vaadin-button>
                        </vaadin-horizontal-layout>
                    </div>
                    
        `;
    }
    
    onGetRequirementDocumentSelectionsApiResponse(e){
        this.requirementDocumentTypes = e.detail.response;
    }
    onRemoveRequirementClick(e){
        this.shadowRoot.getElementById("vaadinAddRequirement").value = "";
        this.hideAddRequirementControls = true;       
        
    }

    onUploadClick(e){
        this.index = this.index + 1;
    }
}

customElements.define("add-requirement-document", AddRequirementDocument);