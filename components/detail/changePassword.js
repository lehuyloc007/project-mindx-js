import { commonJsAddClass, commonJsCreateEl, commonJsRemoveClass } from "../shared/common.js";
import {ModalCommon} from "../shared/modal.js";

class ChangePassword {
    $container = commonJsCreateEl("div");
    $modal = new ModalCommon();
    $modalSuccess = new ModalCommon();
    $modalError = new ModalCommon();
    $modalSuccessMessage = commonJsCreateEl("div");
    $modalErrorMessage = commonJsCreateEl("div");
    $bodyModalContainer = commonJsCreateEl("div");
    $newPwdContainer = commonJsCreateEl("div");
    $note = commonJsCreateEl("div");
    $newPwdInput = commonJsCreateEl("input");
    $newPwdLabel = commonJsCreateEl("label");
    $errorNewPwd = commonJsCreateEl("div");
    $confirmNewPwdContainer = commonJsCreateEl("div");
    $confirmNewPwdInput = commonJsCreateEl("input");
    $confirmNewPwdLabel = commonJsCreateEl("label");
    $errorConfirmNewPwd = commonJsCreateEl("div");

    constructor() {
        commonJsAddClass(this.$newPwdContainer, "form-floating", "mt-2");
        commonJsAddClass(this.$newPwdInput, "form-control");
        commonJsAddClass(this.$confirmNewPwdContainer, "form-floating", "mt-4");
        commonJsAddClass(this.$confirmNewPwdInput, "form-control");
        commonJsAddClass(this.$errorConfirmNewPwd, "alert", "alert-danger", "py-1", "mt-1", "d-none");
        commonJsAddClass(this.$errorNewPwd, "alert", "alert-danger", "py-1", "mt-1", "d-none");
        commonJsAddClass(this.$modalSuccessMessage, "alert", "alert-success", "py-1", "mt-3");
        commonJsAddClass(this.$modalErrorMessage, "alert", "alert-danger", "py-1", "mt-3");
        commonJsAddClass(this.$note, "fs-0d8", "fst-italic", "mb-1");

        this.$note.innerText = "* Mật khẩu phải có ít nhất 6 ký tự";
        this.$newPwdLabel.innerText = "Mật khẩu mới";
        this.$confirmNewPwdLabel.innerText = "Xác nhận mật khẩu";
        this.$errorConfirmNewPwd.innerText = "Xác nhận mật khẩu chưa chính xác";
        this.$errorNewPwd.innerText = "Mật khẩu mới không được để trống";

        this.$newPwdInput.setAttribute("type", "password");
        this.$newPwdInput.addEventListener("change", () => {
            commonJsAddClass(this.$errorNewPwd, "d-none");
        });
        this.$confirmNewPwdInput.setAttribute("type", "password");
        this.$confirmNewPwdInput.addEventListener("change", () => {
            commonJsAddClass(this.$errorConfirmNewPwd, "d-none");
        });

        this.$modal.setHeader("Đổi mật khẩu");
        this.$modal.setOnConfirmClick("Đổi mật khẩu", this.handleUpdatePassword);
        this.$modal.setBody(this.$bodyModalContainer);

        this.$bodyModalContainer.appendChild(this.$note);
        this.$newPwdContainer.appendChild(this.$newPwdInput);
        this.$newPwdContainer.appendChild(this.$newPwdLabel);
        this.$bodyModalContainer.appendChild(this.$newPwdContainer);
        this.$bodyModalContainer.appendChild(this.$errorNewPwd);
        this.$confirmNewPwdContainer.appendChild(this.$confirmNewPwdInput);
        this.$confirmNewPwdContainer.appendChild(this.$confirmNewPwdLabel);
        this.$bodyModalContainer.appendChild(this.$confirmNewPwdContainer);
        this.$bodyModalContainer.appendChild(this.$errorConfirmNewPwd);

        this.$modalSuccessMessage.innerHTML = "Cập nhật mật khẩu thành công";
        this.$modalSuccess.setHeader("Thông báo");
        this.$modalSuccess.setBody(this.$modalSuccessMessage);
        this.$modalErrorMessage.innerHTML = "Cập nhật mật khẩu không thành công";
        this.$modalError.setHeader("Thông báo");
        this.$modalError.setBody(this.$modalErrorMessage);
        this.$container.appendChild(this.$modal.$container);
        this.$container.appendChild(this.$modalSuccess.$container);
        this.$container.appendChild(this.$modalError.$container);
    }

    showChangePasswordModal = (listener) => {
        this.$modal.showModal(listener);
    }

    handleUpdatePassword = () => {
        const user = firebase.auth().currentUser;
        const userNewPwd = this.$newPwdInput.value;
        const confirmUserNewPwd = this.$confirmNewPwdInput.value;

        if (!userNewPwd) {
            commonJsRemoveClass(this.$errorNewPwd, "d-none");
        } else if (userNewPwd != confirmUserNewPwd) {
            commonJsRemoveClass(this.$errorConfirmNewPwd, "d-none");
        } else {
            user.updatePassword(userNewPwd).then(() => {
                this.$modalSuccess.showModal(true);
            }).catch((error) => {
                console.log(error);
                this.$modalError.showModal(true);
            });
        }
    }
}

export { ChangePassword }