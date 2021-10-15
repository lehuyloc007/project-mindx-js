import { CommonJsCreateEl } from "./shared/common";
import { InputGroup } from "./shared/inputGroup";

class Register{
    $container = CommonJsCreateEl("div");
    $txtTitle = CommonJsCreateEl("h3");

    $form = CommonJsCreateEl("form");
    $inputGroupEmail = new InputGroup("Email", "email");
    $inputGroupDisplayName = new InputGroup("Display Name", "text");
    $inputGroupPassword = new InputGroup("Password", "password");
    $inputGroupConfirmPassword = new InputGroup("Confirm Password", "password");

    $actions = CommonJsCreateEl("div");
    $btnRegister = CommonJsCreateEl("button");
    $btnGoToLogin = CommonJsCreateEl("button");

    constructor(){
        this.$container.appendChild(this.$form);

        this.$txtTitle.innerHTML = "Register";

        this.$form.appendChild(this.$txtTitle);
        this.$form.appendChild(this.$inputGroupEmail.$container);
        this.$form.appendChild(this.$inputGroupDisplayName.$container);
        this.$form.appendChild(this.$inputGroupPassword.$container);
        this.$form.appendChild(this.$inputGroupConfirmPassword.$container);
        this.$form.appendChild(this.$actions);
        this.$btnGoToRegister.addEventListener('click', this.handleSubmit);

        this.$btnRegister.innerHTML = "Register";
        this.$btnRegister.type = "submit";
        this.$btnGoTologin.innerHTML = "Go to Login";
        this.$btnGoTologin.type = "button";

        this.$action.appendChild(this.$btnRegister);
        this.$action.appendChild(this.$btnGoTologin);
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const email = this.$inputGroupEmail.getValue();
        if(!email){
            this.$inputGroupEmail.setErrorMessage("Email cannot be empty!");
        } else {
            this.$inputGroupEmail.setErrorMessage("");
        }
    }
}

export {Register};