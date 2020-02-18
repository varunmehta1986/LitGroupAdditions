import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

import './application-form-selection';
import './application-type-selection';
import './oldapplication-redirect-dialog';
import '../mw-header/mw-header';
import './application-types/application-types';

class GroupAdditionsApp extends LitElement {

    static get properties() {
        return {
            hideApplicationTypeSelection: { type: Boolean },
            hideRedirectDialog: { type: Boolean },
            hideApplicationTypes: { type: Boolean },
            selectedApplicationType: { type: String }
        }
    }
    constructor() {
        super();
        this.hideApplicationTypeSelection = true;
        this.hideRedirectDialog = true;
        this.hideApplicationTypes = true;
    }
    render() {
        return html`
                <mw-header title="Group Additions Data Entry"></mw-header>
                <div style="scroll-behavior:smooth" id="mainDiv">
                    <vaadin-vertical-layout >
                        <application-form-selection  
                        @form-changed = "${(e) => { this.onApplicationFormSelection(e); }}">
                        </application-form-selection> 
                        <oldapplication-redirect-dialog 
                            ?hidden = "${this.hideRedirectDialog}"
                            @dialog-closed = "${this.resetApplicationFormSelection}">
                        </oldapplication-redirect-dialog>  

                    <application-type-selection .selectedApplicationType= "${this.selectedApplicationType}"
                                            ?hidden = "${this.hideApplicationTypeSelection}" 
                                            @applicationType-selected = "${(e) => { this.onApplicationTypeSelection(e); }}">
                    </application-type-selection>
                    <application-types ?hidden = "${this.hideApplicationTypes}" @disabled-changed = "${this.disabledChanged}"></application-types>
                </vaadin-vertical-layout>
                </div>
            `;
    }
    resetApplicationFormSelection(e){
        this.hideRedirectDialog = true;
        var applicationFormSelectionElement = this.shadowRoot.querySelector("application-form-selection");
        applicationFormSelectionElement.selectedValue = null;
        applicationFormSelectionElement.setAttribute("selectedvalue",null);
        applicationFormSelectionElement.requestUpdate();

    }
    disabledChanged(e) {
        var applicationFormElement = this.shadowRoot.querySelector("application-form-selection");
        var applicationTypeElement = this.shadowRoot.querySelector("application-type-selection");
        if (e.detail.message.disabled) {
            applicationFormElement.setAttribute("disabled", true);
            applicationTypeElement.setAttribute("disabled", true);
        }
        else {
            applicationFormElement.removeAttribute("disabled");
            applicationTypeElement.removeAttribute("disabled");
        }
        applicationFormElement.requestUpdate();
        applicationTypeElement.requestUpdate();
    }
    onApplicationFormSelection(e) {
        var selectedApplicationForm = JSON.parse(e.detail.message);
        if (selectedApplicationForm.useWebApp === true) {
            this.selectedApplicationType = "";
            var appTypeSelectionElement =  this.shadowRoot.querySelector("application-type-selection");
            appTypeSelectionElement.setAttribute("selectedapplicationtype","");
            appTypeSelectionElement.requestUpdate();
            this.hideApplicationTypeSelection = false;
            this.hideRedirectDialog = true;
        }
        else {
            this.hideApplicationTypeSelection = true;
            this.hideRedirectDialog = false;
        }
        this.hideApplicationTypes = true;
    }
    onApplicationTypeSelection(e) {
        this.selectedApplicationType = e.detail.message;
        if (this.selectedApplicationType !== "") {
            this.hideApplicationTypes = false;
            var applicationTypesControl = this.shadowRoot.querySelector('application-types');
            applicationTypesControl.setAttribute('selectedapplicationtype', this.selectedApplicationType);
            applicationTypesControl.requestUpdate();
        }
        else {
            this.hideApplicationTypes = true;
        }
    }
}
customElements.define('group-additions-app', GroupAdditionsApp);