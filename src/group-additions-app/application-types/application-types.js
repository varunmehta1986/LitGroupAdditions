import { LitElement, html } from "lit-element";
import './new-enrollee';
import './add-family-member'


class ApplicationTypes extends LitElement {
    static get properties() {
        return {
            hideNewEnrollee: { type: Boolean, attribute: false },
            hideAddFamilyMember: { type: Boolean, attribute: false },
            selectedApplicationType: { type: String, attribute: true }
        }
    }
    constructor() {
        super();
        this.hideNewEnrollee = true;
        this.hideAddFamilyMember = true;
    }
    render() {
        return html`  

                <new-enrollee ?hidden = "${this.hideNewEnrollee}" @disabled-changed = "${this.disabledChanged}"></new-enrollee>
                <add-family-member ?hidden = "${this.hideAddFamilyMember}"></add-family-member>

        `;
    }
    disabledChanged(e) {
        var disabledChangedEvent = new CustomEvent("disabled-changed", {
            detail: {
                message: e.detail.message
            }
        });
        this.dispatchEvent(disabledChangedEvent);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "selectedapplicationtype") {
            if (newVal == "New Enrollee") { 
                this.hideNewEnrollee = false;
                this.resetNewEnrolleeControls();
                this.hideAddFamilyMember = true;
            }
            else {
                this.hideNewEnrollee = true;
                this.hideAddFamilyMember = true;
            }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }   

    resetNewEnrolleeControls() {
        var newEnrolleControl = this.shadowRoot.querySelector("new-enrollee");
        newEnrolleControl.setAttribute("reset", true);
        newEnrolleControl.requestUpdate();

    }
}
customElements.define("application-types", ApplicationTypes);