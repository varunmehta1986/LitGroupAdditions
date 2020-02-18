import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@polymer/iron-input/iron-input';
import '@vaadin/vaadin-date-picker/vaadin-date-picker-light'
class CustomMarketwriteDatePicker extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            selectedDate: { type: String },
            required: { type: Boolean }
        };
    }
    constructor() {
        super();
        this.required = false;
        this.updateComplete.then(() => {
            var datePicker = this.shadowRoot.querySelector("vaadin-date-picker-light");
            datePicker.close();
            datePicker.set("i18n.parseDate", function (dateString) {
                var date = new Date(dateString);
                return {
                    day: date.getDate() < 10 ? Number("0" + date.getDate()) : date.getDate(),
                    month: date.getMonth() < 10 ? Number("0" + date.getMonth()) : date.getMonth(),
                    year: date.getFullYear()
                };
            });
            datePicker.set("i18n.formatDate", function (date) {
                return [ (date.month + 1) < 10 ? ("0" + (date.month + 1)) : (date.month + 1),
                date.day < 10 ? ("0" + date.day) : date.day,
                date.year].join("/");
            });
        });
    }
    render() {
        return html`
                <div>
                    <vaadin-date-picker-light>
                        <iron-input>
                        <vaadin-text-field style = "width:150px;" 
                                            label = "${this.label}" 
                                            .value = "${this.selectedDate}" 
                                            @change = "${this.onDateChange}"                                     
                                            maxlength = "10" placeholder = "mm/dd/yyyy" 
                                            ?required = "${this.required}"
                                            @blur = "${this.onDateLeave}" 
                                            error-message = "Invalid Date"                                             
                                            @value-changed = "${this.onDateValueChanged}" >
                        </vaadin-text-field>
                        </iron-input>
                    </vaadin-date-picker-light>  
                </div>            
        `;
    }

    onDateValueChanged(event) {
        var dateString = event.currentTarget.value;
        if (dateString.length === 2) {
            dateString = dateString + "/";
        }
        else if (dateString.length === 5) {
            dateString = dateString + "/";
        }
        event.currentTarget.value = dateString;
        if (dateString.length === 10) {
            event.currentTarget.invalid = this.isValidDate(dateString);
        }

    }
    onDateLeave(event) {
        if (event.currentTarget.value === "") {
            var dateElement = this.shadowRoot.querySelector("vaadin-date-picker-light");
            dateElement.value = "";
            this.required = true;
            event.currentTarget.invalid = false;
        }
        else {
            event.currentTarget.invalid = this.isValidDate(event.currentTarget.value);
        }
    }
    isValidDate(dateString) {
        if (dateString === "") {
            this.required = true;
            return true;
        }
        else {
            var date = new Date(dateString);
            return (date.toLocaleDateString("en-US") === "Invalid Date");
        }
    }
    onDateChange(e) {
        if (e.currentTarget.value !== "") {
            if (this.isValidDate(e)) {
                e.currentTarget.invalid = false;
                let dateChanged = new CustomEvent("date-selected", {

                    detail: {
                        message: JSON.stringify(e.currentTarget.value)
                    },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(dateChanged);
            }
            else {
                this.required = true;
                e.currentTarget.invalid = true;
                this.focus();
            }
        }
        else {
            e.currentTarget.invalid = true;
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        var datePicker = this.shadowRoot.querySelector('vaadin-date-picker-light');
        if (datePicker !== null) {
            datePicker.removeAttribute("invalid");
        }
        var datePickerBox = this.shadowRoot.querySelector('vaadin-text-field');
        if (datePickerBox !== null) {
            datePickerBox.removeAttribute("invalid");
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
}
customElements.define("custom-marketwrite-date-picker", CustomMarketwriteDatePicker);