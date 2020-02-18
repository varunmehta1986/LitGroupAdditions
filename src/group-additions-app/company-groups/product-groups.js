import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import '../radio-group-dynamic';

class ProductGroups extends LitElement {
    static get properties() {
        return {
            productType: { type: String },
            groups: { type: Array },
            selectedGroup: { type: String }, 
            disabled: {type: Boolean}
        };
    }
    render() {
        return html`
            <div style="background:#F5F5F5;height:100%; width:170px">
                <div style="text-align:center; color: white; font-weight: bolder; background: url('/MWG_Apps/images/top_nav_bg_tile.gif') repeat-x; 
                                height: 25px;line-height: 25px;border-radius:5px 5px 0px 0px;" >${this.productType}</div>
                <div style="padding:15px">
                    <radio-group-dynamic .items = "${this.groups}" 
                                        @value-changed = "${(e) => this.radioGroupSelectedValueChanged(e)}"
                                        .value = "${this.selectedGroup}"
                                        ?disabled = "${this.disabled}"> </radio-group-dynamic>
                </div>
            </div>
        `;
    }
    attributeChangedCallback(name, oldVal, newVal) {
        var radioGroup = this.shadowRoot.querySelector("radio-group-dynamic");
        if (name === "groups" && newVal !== null && newVal !== undefined) {
            radioGroup.setAttribute("items", newVal);
        }
        else if(name === "disabled"){
            if(newVal=== "true"){
                radioGroup.setAttribute("disabled", "true");
            }
            else{
                radioGroup.removeAttribute("disabled");
            }
        }
        radioGroup.requestUpdate();
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    radioGroupSelectedValueChanged(e) {
        this.selectedGroup = e.detail.message;
        var groupSelectedEvent = new CustomEvent("group-selected", {
            detail: {
                message: this.selectedGroup
            }
        });
        this.dispatchEvent(groupSelectedEvent);
    }
}
customElements.define('product-groups', ProductGroups);