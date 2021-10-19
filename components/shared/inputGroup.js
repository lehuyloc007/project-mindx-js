import { commonJsCreateEl ,commonJsRemoveClass ,commonJsAddClass } from "./common.js";

class InputGroup {
    $container = commonJsCreateEl("div");
    $label = commonJsCreateEl("label");
    $input = commonJsCreateEl("input");
    $errMessage = commonJsCreateEl("div");

    constructor(label, inputType) {
        this.$label.innerHTML = label;
        this.$input.type = inputType;
        commonJsAddClass(this.$input, "form-control");
        commonJsAddClass(this.$container, "form-floating", "mt-4");
        commonJsAddClass(this.$errMessage, "alert", "alert-danger", "py-1", "mt-1", "d-none");
        this.$container.appendChild(this.$input);
        this.$container.appendChild(this.$label);
        this.$container.appendChild(this.$errMessage);
    }
    getValue() {
        return this.$input.value;
    }
    setErrMessage = (errMsg) => {
        this.$errMessage.innerHTML = errMsg;
        if (errMsg) {
            commonJsAddClass(this.$errMessage, "d-none");
        } else {
            commonJsRemoveClass(this.$errMessage, "d-none");
        }
        
    }
}
export { InputGroup };