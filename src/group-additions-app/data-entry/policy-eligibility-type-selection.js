import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@polymer/iron-ajax/iron-ajax';
import '../custom-marketwrite-date-picker';

class PolicyElligibilityTypeSelection extends LitElement {
    static get properties(){
        return{
            eligibilityTypes: {type: Array},
            eligibilityTypeOptionsApiUrl:{type: String},
            selectedEligibilityDate: {type: String},
            hideEligibilityDate: {type: Boolean},
            hideReason: {type: Boolean},
            selectedReason: {type: String},
            selectedEligibilityType: {type:String},
            selectedItem:{type: Object}            
        }
    }


constructor() {
    super();
    this.eligibilityTypeOptionsApiUrl = window.location.protocol + "//" + window.location.hostname + ":"
    + window.location.port
    + "/" + window.location.pathname
    + "/api/GroupAdditions/GetEligibilityTypes";
    this.hideEligibilityDate = true;
    this.hideReason = true;

}
render(){
    return html`
            <div style="background:#F5F5F5;height:100%; width:550px; padding:2px">
                <div style="text-align:left; color: white; font-weight: bolder; background: url('/MWG_Apps/images/top_nav_bg_tile.gif') repeat-x;
                                height: 25px;line-height: 25px;border-radius:5px 5px 0px 0px;" >Policy Eligibility</div>
                    <div style="padding:2px">
                        <vaadin-vertical-layout style="padding-bottom: 2px">
                                <vaadin-combo-box  label = "Select EligibilityType"
                                                    .items = "${this.eligibilityTypes}"
                                                    item-label-path = "name"
                                                    item-value-path = "id"
                                                    style = "width:350px;"
                                                    @selected-item-changed = "${this.onEligibilityTypeSelection}"
                                                    .selectedItem = "${this.selectedItem}" >
                                </vaadin-combo-box>
                                <iron-ajax id="iaGetEligibilityTypeSelections" auto
                                                    url="${this.eligibilityTypeOptionsApiUrl}"
                                                    handle-as ="json"
                                                    @response = "${this.onGetEligibilityTypeSelectionsApiResponse}" >
                                </iron-ajax>
                            <vaadin-horizontal-layout theme="spacing-s">
                                <vaadin-text-field  label="Reason"
                                                    style = "width:350px"
                                                    ?hidden = "${this.hideReason}"
                                                    @change ="${this.onReasonChange}"
                                                    .value = "${this.selectedReason}">
                                </vaadin-text-field>
                                <custom-marketwrite-date-picker label="Policy Eligibility Date"
                                                                ?hidden = "${this.hideEligibilityDate}"
                                                                @date-selected ="${(e) => { this.selectedEligibilityDate = JSON.parse(e.detail.message);}}"  
                                                                >
                                </custom-marketwrite-date-picker>
                            </vaadin-horizontal-layout>
                        </vaadin-vertical-layout>
                    </div>
            </div>
        `;
    }
    onEligibilityTypeSelection(e){
        this.selectedReason = "";
        var dateElement = this.shadowRoot.querySelector("custom-marketwrite-date-picker").shadowRoot.querySelector("vaadin-text-field");        
        dateElement.value = "";
        dateElement.invalid = false;
        this.hideEligibilityDate = true;
        this.hideReason = true;
        this.selectedEligibilityType = e.target.selectedItem;
        if (e.target.selectedItem !== null && e.target.selectedItem !== undefined) {
            var eligibilityTypeSelection = e.detail.value;
            if(eligibilityTypeSelection.name == "Open Enrollment"){
                this.hideEligibilityDate = true;
                this.hideReason = true;
            }
            else if (eligibilityTypeSelection.name == "Other"){
                this.hideReason = false;
                this.hideEligibilityDate = false;

            }
            else{
                this.hideReason = true;
                this.hideEligibilityDate = false;
            }            

        }
        
    }
    onGetEligibilityTypeSelectionsApiResponse(e) {
            this.eligibilityTypes = e.detail.response;
    }
    onReasonChange(e){
            this.selectedReason = e.target.value;
            let changeEvent = new CustomEvent('eligibilityType-selected', {
                detail: {
                    message:  JSON.stringify({ "eligibilityType": this.selectedEligibilityType, "eligibilityDate": this.selectedEligibilityDate, "reason": this.selectedReason})
                },
                bubbles: true,
                composed: true
            });
             this.dispatchEvent(changeEvent);
    }


}
customElements.define("policy-eligibility-type-selection", PolicyElligibilityTypeSelection);

