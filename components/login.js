import { CommonJsCreateEl } from "./shared/common.js";
import { InputGroup } from "./shared/inputGroup.js";
import {setScreen} from "../index.js";
import { Register } from "./register.js"


class Login{ 
    $container = CommonJsCreateEl('div');
    $txtTitle = CommonJsCreateEl('h3');

    $form = CommonJsCreateEl('form');
    $inputGroupEmail = new InputGroup("Email", "email");
    $inputGroupPassword = new InputGroup("Password", "password");

    $actions = CommonJsCreateEl('div');
    $btnLogin = CommonJsCreateEl('button');
    $btnGoToRegister = CommonJsCreateEl('button');

    constructor(){
        this.$txtTitle.innerHTML = "Login";
        this.$btnLogin.innerHTML = "Login";
        this.$btnGoToRegister.innerHTML = "Go to Register";
        this.$btnGoToRegister.addEventListener('click', this.handleGoToRegister);


        this.$container.appendChild(this.$form);

        this.$form.appendChild(this.$txtTitle);
        this.$form.appendChild(this.$inputGroupEmail.$container);
        this.$form.appendChild(this.$inputGroupPassword.$container);
        this.$form.appendChild(this.$actions);

        this.$actions.appendChild(this.$btnLogin);
        this.$actions.appendChild(this.$btnGoToRegister);

        
    }

    handleGoToRegister = () => {
        const registerScreen = new Register();
        setScreen(registerScreen.$container);
    };  
}


export {Login};
