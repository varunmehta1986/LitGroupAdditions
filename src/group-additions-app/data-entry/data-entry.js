import { LitElement, html } from "lit-element";
import './policy-eligibility-type-selection';
import '../custom-marketwrite-date-picker';
import '../app-document-upload/app-document-upload';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout'

class DataEntry extends LitElement {
    static get properties() {
        return {
            selectedGroups: { type: Object },
            eligibilityTypes: { type: Object },
            receivedDate: { type: Object },
            reset: { type: Boolean }
        };
    }
    render() {
        return html`
            
             <vaadin-vertical-layout theme="spacing-s" >    
               <custom-marketwrite-date-picker label = "Received Date *"
                    @date-selected = "${(e) => { this.receivedDate = JSON.parse(e.detail.message); }}">
                </custom-marketwrite-date-picker>
                <policy-eligibility-type-selection                     
                    @eligibilityType-selected = "${(e) => { this.eligibilityTypes = this.onEligibilityTypeSelection(e); }}">
                </policy-eligibility-type-selection>
                <app-document-upload .selectedGroups = "${this.selectedGroups}"></app-document-upload> 
                <vaadin-button theme="primary">Upload Documents</vaadin-button>     
            </vaadin-vertical-layout>
        `;

    }
    attributeChangedCallback(name, oldVal, newVal) {
        var dateElement = this.shadowRoot.querySelector("custom-marketwrite-date-picker").shadowRoot.querySelector("vaadin-text-field");
        var policyEligibilityTypeElement = this.shadowRoot.querySelector("policy-eligibility-type-selection").shadowRoot.querySelector("vaadin-combo-box");
        if (name === "reset" && newVal === "true") {
            dateElement.focus();
            dateElement.value = "";
            dateElement.invalid = false;
            policyEligibilityTypeElement.selectedItem = null;
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    onEligibilityTypeSelection(e) {
        this.eligibilityTypes = e.detail.message;
    }

    onDateChange(e) {
        this.receivedDate = JSON.parse(e.detail.message)

    }
}
customElements.define("data-entry", DataEntry);