import { commonJsCreateEl, commonJsAddClass, setScreen } from "./shared/common.js";
import { InputGroup } from "./shared/inputGroup.js";
import { Login } from "./login.js";

class Register {
    $container = commonJsCreateEl("div");
    $colContainer = commonJsCreateEl("div");
    $txtLogo = commonJsCreateEl("div");
    $txtTitle = commonJsCreateEl("div");
    $inputGroupEmail = new InputGroup("Email:", "email");
    $inputGroupDisplayName = new InputGroup("Tên người dùng:", "text");
    $inputGroupPassword = new InputGroup("Mật khẩu:", "password");
    $inputGroupConfirmPassword = new InputGroup("Xác nhận mật khẩu :", "password");
    $containerBtn = commonJsCreateEl("div");
    $btnGoToLogin = commonJsCreateEl("div");
    $btnRegister = commonJsCreateEl("button");

    constructor() {
        this.$txtLogo.innerHTML = "Social";
        commonJsAddClass(this.$txtLogo, "fw-bolder", "p-3", "h1", "fst-italic");

        this.$txtTitle.innerHTML = "Đăng ký tài khoản";
        commonJsAddClass(this.$txtTitle, "border-bottom", "h5", "pb-2", "text-secondary", "mb-3");

        this.$btnGoToLogin.innerHTML = "Đăng nhập";
        this.$btnGoToLogin.type = "button";
        commonJsAddClass(this.$btnGoToLogin, "btn", "btn-light", "me-auto");
        this.$btnGoToLogin.addEventListener("click", this.handelGoToLogin);
        this.$containerBtn.appendChild(this.$btnGoToLogin);

        this.$btnRegister.innerHTML = "Tiếp theo";
        commonJsAddClass(this.$btnRegister, "btn", "btn-primary");
        this.$containerBtn.appendChild(this.$btnRegister);

        commonJsAddClass(this.$containerBtn, "my-3", "d-flex")

        this.$colContainer.appendChild(this.$txtLogo);
        this.$colContainer.appendChild(this.$txtTitle);
        this.$colContainer.appendChild(this.$inputGroupEmail.$container);
        this.$colContainer.appendChild(this.$inputGroupDisplayName.$container);
        this.$colContainer.appendChild(this.$inputGroupPassword.$container);
        this.$colContainer.appendChild(this.$inputGroupConfirmPassword.$container);
        this.$colContainer.appendChild(this.$containerBtn);


        commonJsAddClass(this.$colContainer, "col-11", "col-md-4", "text-center", "border", "bg-white", "my-5", "p-3", "rounded-3");
        this.$container.appendChild(this.$colContainer)
        commonJsAddClass(this.$container, "d-flex", "justify-content-center", "my-5");
    }
    handelGoToLogin = () => {
        const loginScreen = new Login();
        setScreen(loginScreen.$container)
    };
}
export { Register }