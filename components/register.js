import { commonJsCreateEl, commonJsAddClass, setScreen, hasWhiteSpace, checkEmailValid } from "./shared/common.js";
import { InputGroup } from "./shared/inputGroup.js";
import { Login } from "./login.js";

class Register {
    $container = commonJsCreateEl("div");
    $colContainer = commonJsCreateEl("form");
    $txtLogo = commonJsCreateEl("div");
    $txtTitle = commonJsCreateEl("div");
    $inputGroupEmail = new InputGroup("Email:", "text");
    $inputGroupDisplayName = new InputGroup("Tên người dùng:", "text");
    $inputGroupPassword = new InputGroup("Mật khẩu:", "password");
    $inputGroupConfirmPassword = new InputGroup("Xác nhận mật khẩu :", "password");
    $containerBtn = commonJsCreateEl("div");
    $btnGoToLogin = commonJsCreateEl("div");
    $btnRegister = commonJsCreateEl("button");

    checkFormRegister = false;

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
        this.$colContainer.addEventListener("submit", this.handelSubmit)
        commonJsAddClass(this.$colContainer, "col-11", "col-md-5", "text-center", "border", "bg-white", "my-5", "p-3", "rounded-3");
        
        this.$container.appendChild(this.$colContainer)
        commonJsAddClass(this.$container, "d-flex", "justify-content-center", "my-5");
    }
    handelGoToLogin = () => {
        const loginScreen = new Login();
        setScreen(loginScreen.$container)
    };
    handelSubmit = (event) => {
        event.preventDefault();
        const email = this.$inputGroupEmail.getValue();
        const displayName = this.$inputGroupDisplayName.getValue();
        const password = this.$inputGroupPassword.getValue();
        const confirmPassword = this.$inputGroupConfirmPassword.getValue();
        
        if(!email) {
            this.$inputGroupEmail.setErrMessage("Email không được để trống");
            this.checkFormRegister = false; 
            return;
        } else if (!checkEmailValid(email)) {
            this.$inputGroupEmail.setErrMessage("Email không đúng định dạng");
            this.checkFormRegister = false;    
            return;
        } else {
            this.$inputGroupEmail.setErrMessage("")
            this.checkFormRegister = true; 
        }

        if (!displayName) {
            this.$inputGroupDisplayName.setErrMessage("Tên hiển thị không được để trống");
            this.checkFormRegister = false; 
            return;
        } else if(hasWhiteSpace(displayName)) {
            this.$inputGroupDisplayName.setErrMessage("Tên hiển thị không được có khoảng trắng");
            this.checkFormRegister = false; 
            return;
        } else {
            this.$inputGroupDisplayName.setErrMessage("");
            this.checkFormRegister = true; 
        }

        if(!password) {
            this.$inputGroupPassword.setErrMessage("Mật khẩu không được để trống");
            this.checkFormRegister = false; 
            return;
        } else if (password.length < 6) {
            this.$inputGroupPassword.setErrMessage("Mật khẩu phải nhiều hơn 6 ký tự");
            this.checkFormRegister = false;  
            return;  
        } else if (password !== confirmPassword) {
            this.$inputGroupConfirmPassword.setErrMessage("Xác nhận mật khẩu không đúng")
            this.checkFormRegister = false; 
            return;
        } else {
            this.$inputGroupPassword.setErrMessage("");
            this.$inputGroupConfirmPassword.setErrMessage("");
            this.checkFormRegister = true; 
        }

        if (this.checkFormRegister == true) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection('users').add({
                    email: firebase.auth().currentUser.email,
                    displayName: displayName,
                    photoURL: "",
                    followers: 0,
                    Watching: 0,
                    description: ""
                }).then(() => {
                    firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        alert("Vui lòng kiểm tra email để xác thực tài khoản")
                    });
                })
            });
        }
        
    };
}
export { Register }