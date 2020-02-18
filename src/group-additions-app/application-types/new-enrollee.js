import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '../data-entry/data-entry';
import '../company-search';
import '../company-groups/company-groups';

class NewEnrollee extends LitElement {
    static get properties() {
        return {
            hideCompanyGroups: { type: Boolean },
            reset: { type: Boolean },
            hideDataEntryControls: { type: Boolean },
            selectedGroups: { type: Object }
        };
    }
    constructor() {
        super();
        this.hideCompanyGroups = true;
        this.hideDataEntryControls = true;
        this.disableCompanyControls = false;
    }
    render() {
        return html`
            <vaadin-vertical-layout>
                <div id="divCompanyControls">
                    <company-search @company-selected = "${this.companySelected}" ></company-search>

                    <company-groups ?hidden = "${this.hideCompanyGroups}"
                                     @groups-selected = "${this.groupsSelected}"
                                     @groups-reset = "${this.groupsReset}">
                    </company-groups>
                </div>
                <div id="dataEntryDiv">
                <data-entry ?hidden = "${this.hideDataEntryControls}" .selectedGroups = "${this.selectedGroups}"></data-entry>
                </div>
            </vaadin-vertical-layout>
        `;
    };
    groupsSelected(e) {
        this.hideDataEntryControls = false;
        this.selectedGroups = JSON.parse(e.detail.message);
        var dataEntryControl = this.shadowRoot.querySelector("data-entry");
        dataEntryControl.setAttribute("reset", true);
        dataEntryControl.requestUpdate();
        this.toggleCompanySearchDisabled(true);
    }
    groupsReset(e) {
        this.hideDataEntryControls = true;
        this.toggleCompanySearchDisabled(false);

    }
    toggleCompanySearchDisabled(disabled) {
        var companySearchElement = this.shadowRoot.querySelector("company-search")
        if (disabled) {
            companySearchElement.setAttribute("disabled", disabled);
        }
        else {
            companySearchElement.removeAttribute("disabled");
        }
        var disabledChangedEvent = new CustomEvent("disabled-changed", {
            detail: {
                message: { "disabled": disabled }
            }
        });
        this.dispatchEvent(disabledChangedEvent);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "reset" && newVal === "true") {
            this.hideCompanyGroups = true;
            var dataEntryElement = this.shadowRoot.querySelector("data-entry");
            var companySearchElement = this.shadowRoot.querySelector("company-search");
            dataEntryElement.setAttribute("reset", true);
            companySearchElement.setAttribute("value", "");
            companySearchElement.value = "";
            companySearchElement.requestUpdate();
            dataEntryElement.requestUpdate();
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    companySelected(e) {
        this.hideDataEntryControls = true;
        if (e.detail.message !== "No company selected") {
            var companyGroupControl = this.shadowRoot.querySelector("company-groups");
            companyGroupControl.setAttribute("companyid", e.detail.message);
            companyGroupControl.requestUpdate();
            this.hideCompanyGroups = false;
        }
        else {
            this.hideCompanyGroups = true;
        }
    }
}
customElements.define("new-enrollee", NewEnrollee);