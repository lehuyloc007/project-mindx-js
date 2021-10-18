import { CommonJsCreateEl } from "./common.js"

class InputGroup{
    $container = CommonJsCreateEl("div");
    $label = CommonJsCreateEl("label");
    $input = CommonJsCreateEl("input");
    $errMsg = CommonJsCreateEl("div");

    constructor(label, inputType){
        this.$label.innerHTML = label;
        this.$input.type = inputType;

        this.$container.appendChild(this.$label);
        this.$container.appendChild(this.$input);
        this.$container.appendChild(this.$errMsg);
    }

    getValue(){
        return this.$input.value;
    }

    setErrorMessage = (errMsg) => {
        this.$errMsg.innerHTML = errMsg;
    }
}

export { InputGroup };