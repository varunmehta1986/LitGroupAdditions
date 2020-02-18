import { LitElement, html } from "lit-element";
import './product-groups';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@polymer/iron-ajax';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';

class CompanyGroups extends LitElement {
    static get properties() {
        return {
            companyId: { type: Number },
            companyGroupsApiURL: { type: String, attribute: false },
            selectedHealthGroup: { type: String },
            selectedDentalGroup: { type: String },
            selectedVisionGroup: { type: String },
            hideCompanyGroupsControl: { type: Boolean },
            hideProgressBar: { type: Boolean, attribute: false },
            disableDoneButton: { type: Boolean, attribute: false },
            disableResetButton: { type: Boolean, attribute: false },
            disableGroupSelections: { type: Boolean, attribute: false },
            healthGroups: { type: Array, attribute: false },
            dentalGroups: { type: Array, attribute: false },
            visionGroups: { type: Array, attribute: false }
        };
    }
    constructor() {
        super();
        this.hideCompanyGroupsControl = true;
        this.hideProgressBar = true;
        this.disableResetButton = true;
    }
    render() {
        return html`
            <iron-ajax  url="${this.companyGroupsApiURL}" 
                        handle-as ="json" 
                        @response = "${this.onGetCompanyGroupsApiReponse}" ></iron-ajax>
            <vaadin-progress-bar indeterminate value="0" ?hidden = "${this.hideProgressBar}" ></vaadin-progress-bar>
            <div ?hidden = "${this.hideCompanyGroupsControl}">
                <div style="width:550px;padding-top:14px" >
                    <span style="font-size : 14px;font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 
                            'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'">Company Groups</span> 
                    <vaadin-horizontal-layout theme="spacing-s" >
                        <product-groups id="pgHealth" 
                                        .productType = "${"Health"}"
                                        .groups = "${this.healthGroups}"
                                        @group-selected = "${(e) => this.selectedHealthGroup = e.detail.message}"
                                        ?disabled = "${this.disableGroupSelections}" >
                        </product-groups>
                        <product-groups id="pgDental"
                                        .productType = "${"Dental"}"
                                        .groups = "${this.dentalGroups}"
                                        @group-selected = "${(e) => this.selectedDentalGroup = e.detail.message}" 
                                        ?disabled = "${this.disableGroupSelections}">
                        </product-groups>
                        <product-groups id="pgVision" 
                                        .productType = "${"Vision"}"
                                        .groups = "${this.visionGroups}"
                                        @group-selected = "${(e) => this.selectedVisionGroup = e.detail.message}"
                                        ?disabled = "${this.disableGroupSelections}">
                        </product-groups>
                    </vaadin-horizontal-layout>
                </div>
                <vaadin-button theme="primary small" 
                                @click = "${this.onDoneClick.bind(this)}"
                                ?disabled = "${this.disableDoneButton}">
                                Done selecting Groups
                                
                </vaadin-button>
                <vaadin-button ?disabled = "${this.disableResetButton}"
                                theme="small"
                                @click = "${this.onResetClick.bind(this)}">
                                Reset Group selections
                </vaadin-button>
                 <!-- style="background: url('/MWG_Apps/images/top_nav_bg_tile.gif') repeat-x; " -->
            </div>
            <vaadin-notification duration="4000" theme="error" id="vaadinNotifyNoProductGroupSelected">
                <template>
                    <div>
                        At least one product group needs to be selected to proceed. 
                    </div>
                </template>
            </vaadin-notification>
            
            <vaadin-notification duration="4000" theme="error" id="vaadinNotifyNoActiveGroupsFound">
                <template>
                    <div>
                        No active groups found based on company selected.
                    </div>
                </template>
            </vaadin-notification>
        `;
    }

    onDoneClick(e) {
        if ((this.selectedHealthGroup === "" || this.selectedHealthGroup == undefined || this.selectedHealthGroup === "None")
            && (this.selectedDentalGroup === "" || this.selectedDentalGroup == undefined || this.selectedDentalGroup === "None")
            && (this.selectedVisionGroup === "" || this.selectedVisionGroup == undefined || this.selectedVisionGroup === "None")) {

            this.shadowRoot.getElementById("vaadinNotifyNoProductGroupSelected").open();
        }
        else {
            this.disableDoneButton = true;
            this.disableResetButton = false;
            this.toggleCompanyGroupsDisabled(true);
            var groupsSelectedEvent = new CustomEvent("groups-selected", {
                detail: {
                    message: JSON.stringify({ "healthGroup": this.selectedHealthGroup, "dentalGroup": this.selectedDentalGroup, "visionGroup": this.selectedVisionGroup })
                }
            });
            this.dispatchEvent(groupsSelectedEvent);
        }
    }
    toggleCompanyGroupsDisabled(disabled) {
        this.disableGroupSelections = true;
        var productGroupControls = this.shadowRoot.querySelectorAll("product-groups");
        for (var i = 0; i < productGroupControls.length; i++) {
            if (disabled) {
                productGroupControls[i].setAttribute("disabled", disabled);
            }
            else{
                productGroupControls[i].removeAttribute("disabled");
            }
        }
    }

    onResetClick(e) {
        this.disableDoneButton = false;
        this.disableResetButton = true;
        this.toggleCompanyGroupsDisabled(false);
        var groupsResetEvent = new CustomEvent("groups-reset",{
            detail: {
                message: "Groups Reset Fired"
            }
        });
        this.dispatchEvent(groupsResetEvent);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this.hideCompanyGroupsControl = true;
        if (name === "companyid" && newVal !== null && newVal !== undefined) {
            this.hideProgressBar = false;
            this.companyId = newVal;
            this.companyGroupsApiURL = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + "/" + window.location.pathname
                + "/api/GroupsSearch/GetGroupsForCompany?companyId=" + this.companyId;
            var ironAjax = this.shadowRoot.querySelector("iron-ajax");
            ironAjax.url = this.companyGroupsApiURL;
            ironAjax.generateRequest();
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    onGetCompanyGroupsApiReponse(e) {
        this.healthGroups = e.detail.response.Health;
        this.dentalGroups = e.detail.response.Dental;
        this.visionGroups = e.detail.response.Vision;
        if (this.healthGroups.length === 0 && this.dentalGroups.length == 0 && this.visionGroups.length === 0) {
            this.shadowRoot.getElementById("vaadinNotifyNoActiveGroupsFound").open();
            this.hideCompanyGroupsControl = true;
        }
        else {
            this.setGroupsOnControl("pgHealth", this.healthGroups);
            this.setGroupsOnControl("pgDental", this.dentalGroups);
            this.setGroupsOnControl("pgVision", this.visionGroups);
            this.hideCompanyGroupsControl = false;
        }
        this.hideProgressBar = true;
    }
    setGroupsOnControl(controlName, groups) {
        var productGroups = this.shadowRoot.getElementById(controlName);
        productGroups.setAttribute("groups", JSON.stringify(groups));
        productGroups.setAttribute("selectedgroup", "None");
        productGroups.requestUpdate();

    }
}
customElements.define("company-groups", CompanyGroups);