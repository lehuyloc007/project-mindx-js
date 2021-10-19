import { commonJsCreateEl ,commonJsAddClass, setScreen } from "./shared/common.js";
import { InputGroup } from "./shared/inputGroup.js";
import { Register } from "./register.js";
class Login {
    $container = commonJsCreateEl("div");
    $colContainer = commonJsCreateEl("div");
    $txtLogo = commonJsCreateEl("div");
    $txtTitle = commonJsCreateEl("div");
    $inputGroupEmail = new InputGroup("Email:", "email");
    $inputGroupPassword = new InputGroup("Password:", "password");
    $btnLogin = commonJsCreateEl("button");
    $containerGoToRegister = commonJsCreateEl("div");
    $btnGoToRegister = commonJsCreateEl("div");

    constructor() {
        this.$txtLogo.innerHTML = "Social";
        commonJsAddClass(this.$txtLogo, "fw-bolder", "p-3", "h1", "fst-italic");

        this.$txtTitle.innerHTML = "Đăng nhập";
        commonJsAddClass(this.$txtTitle, "border-bottom", "h5", "pb-2", "text-secondary", "mb-3");

        this.$btnLogin.innerHTML = "Tiếp theo";
        commonJsAddClass(this.$btnLogin, "btn", "btn-primary", "mt-4");

        this.$containerGoToRegister.innerHTML = "Bạn chưa có tài khoản";
        this.$btnGoToRegister.innerHTML = "Đăng ký";
        this.$btnGoToRegister.type = "button";
        commonJsAddClass(this.$btnGoToRegister, "text-primary", "ps-2", "cursor-pointer");
        this.$btnGoToRegister.addEventListener("click", this.handelGoToRegister)

        this.$containerGoToRegister.appendChild(this.$btnGoToRegister);
        commonJsAddClass(this.$containerGoToRegister, "mb-5", "mt-2", "d-flex", "align-items-center", "justify-content-center");

        this.$colContainer.appendChild(this.$txtLogo);
        this.$colContainer.appendChild(this.$txtTitle);
        this.$colContainer.appendChild(this.$inputGroupEmail.$container);
        this.$colContainer.appendChild(this.$inputGroupPassword.$container);
        this.$colContainer.appendChild(this.$btnLogin);
        this.$colContainer.appendChild(this.$containerGoToRegister);
        commonJsAddClass(this.$colContainer, "col-11", "col-md-4", "text-center", "border", "bg-white", "my-5", "p-3", "rounded-3");
        this.$container.appendChild(this.$colContainer)
        commonJsAddClass(this.$container, "d-flex", "justify-content-center", "my-5");
    }
    handelGoToRegister = () => {
        const registerScreen = new Register();
        setScreen(registerScreen.$container)
    }
    
}

export { Login };