import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@polymer/iron-ajax/iron-ajax';
class ApplicationFormSelection extends LitElement {
    static get properties() {
        return {
            forms: { type: Array },
            formOptionsApiUrl: { type: String },
            disabled: { type: Boolean },
            selectedValue: { type: Number }
        }
    }
    constructor() {
        super();
        this.formOptionsApiUrl = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + "/" + window.location.pathname
            + "/api/GroupAdditions/GetApplicationFormTypes";
    }
    render() {
        return html`
            <vaadin-combo-box  label = "Select Application Form" 
                               .items = "${this.forms}"  
                                item-label-path = "formNumber"  
                                item-value-path = "applicationFormTypeID"
                                style = "width:550px"  
                                @selected-item-changed = "${this.onFormSelection}"
                                ?disabled = "${this.disabled}"
                                .value = "${this.selectedValue}"
            >
            
            </vaadin-combo-box>
            <iron-ajax id="iaGetFormSelections" auto 
                                url="${this.formOptionsApiUrl}" 
                                handle-as ="json" 
                                @response = "${this.onGetFormSelectionsApiResponse}" ></iron-ajax>
        `;
    }
    onFormSelection(e) {
        if (e.target.selectedItem !== null && e.target.selectedItem !== undefined) {
            this.selectedValue = e.target.value;
            var formSelection = new Object();
            formSelection.useWebApp = e.target.selectedItem.useWebApp;
            var formSelectionString = JSON.stringify(formSelection);

            let changeEvent = new CustomEvent('form-changed', {
                detail: {
                    message: formSelectionString
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(changeEvent);
        }
    }

    onGetFormSelectionsApiResponse(e) {
        this.forms = e.detail.response;
    }
}
customElements.define("application-form-selection", ApplicationFormSelection);