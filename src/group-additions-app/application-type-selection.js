import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-combo-box/vaadin-combo-box'

class ApplictionTypeSelection extends LitElement {
    static get properties() {
        return {
            applicationTypeOptions: { type: Array },
            selectedApplicationType: { type: String }, 
            disabled: {type:Boolean}
        };
    }
    constructor() {
        super();
        this.applicationTypeOptions = ["New Enrollee"]
        this.selectedApplicationType = "";
    }
    render() {
        return html`
            <vaadin-combo-box .items = "${this.applicationTypeOptions}" 
                                @selected-item-changed = "${this.onApplicationTypeSelection}"
                                .selectedItem = "${this.selectedApplicationType}"
                                label = "Select Application Type" 
                                ?disabled = "${this.disabled}">
            </vaadin-combo-box>
            `;
    }
    onApplicationTypeSelection(e) {
        if (e.target.selectedItem !== null && e.target.selectedItem !== undefined) {
            this.selectedApplicationType = e.target.selectedItem;
            let applicationTypeSelected = new CustomEvent("applicationType-selected", {
                detail: {
                    message: this.selectedApplicationType
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(applicationTypeSelected);
        }
    }
}
customElements.define("application-type-selection", ApplictionTypeSelection);