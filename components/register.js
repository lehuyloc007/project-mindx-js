import { CommonJsCreateEl } from "./shared/common.js";
import { InputGroup } from "./shared/inputGroup.js";
import {Login} from './login.js'


class Register{
    $container = CommonJsCreateEl("div");
    $txtTitle = CommonJsCreateEl("h3");

    $form = CommonJsCreateEl("form");
    $inputGroupEmail = new InputGroup("Email", "email");
    $inputGroupDisplayName = new InputGroup("Display Name", "text");
    $inputGroupPassword = new InputGroup("Password", "password");
    $inputGroupConfirmPassword = new InputGroup("Confirm Password", "password");

    $action = CommonJsCreateEl("div");
    $btnRegister = CommonJsCreateEl("button");
    $btnGoTologin = CommonJsCreateEl("button");   


    constructor(){
        this.$container.appendChild(this.$form);

        this.$form.appendChild(this.$txtTitle);
        this.$form.appendChild(this.$inputGroupEmail.$container);
        this.$form.appendChild(this.$inputGroupDisplayName.$container);
        this.$form.appendChild(this.$inputGroupPassword.$container);
        this.$form.appendChild(this.$inputGroupConfirmPassword.$container);
        this.$form.appendChild(this.$action);
        this.$form.addEventListener("submit",this.handleSubmit);



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
        const password = this.$inputGroupPassword.getValue();
        
        if(!email){
            this.$inputGroupEmail.setErrorMessage("Email can not be empty");
        } else{
            this.$inputGroupEmail.setErrorMessage("");
        }

        if(!password){
            this.$inputGroupPassword.setErrorMessage("Password can not be empty")
        }

        if
    };
}

export {Register};