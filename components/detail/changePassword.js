import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";
import {ModalCommon} from "../shared/modal.js";

class ChangePassword {
    $container = commonJsCreateEl("div");
    $modal = new ModalCommon();
    $bodyModalContainer = commonJsCreateEl("div");
    $oldPwdContainer = commonJsCreateEl("div");
    $oldPwdInput = commonJsCreateEl("input");
    $oldPwdLabel = commonJsCreateEl("label");
    $newPwdContainer = commonJsCreateEl("div");
    $newPwdInput = commonJsCreateEl("input");
    $newPwdLabel = commonJsCreateEl("label");
    $confirmNewPwdContainer = commonJsCreateEl("div");
    $confirmNewPwdInput = commonJsCreateEl("input");
    $confirmNewPwdLabel = commonJsCreateEl("label");

    constructor() {
        commonJsAddClass(this.$oldPwdContainer, "form-floating", "mt-4");
        commonJsAddClass(this.$oldPwdInput, "form-control");
        commonJsAddClass(this.$newPwdContainer, "form-floating", "mt-4");
        commonJsAddClass(this.$newPwdInput, "form-control");
        commonJsAddClass(this.$confirmNewPwdContainer, "form-floating", "mt-4");
        commonJsAddClass(this.$confirmNewPwdInput, "form-control");

        this.$oldPwdLabel.innerText = "Mật khẩu cũ";
        this.$newPwdLabel.innerText = "Mật khẩu mới";
        this.$confirmNewPwdLabel.innerText = "Xác nhận mật khẩu";

        this.$modal.setHeader("Đổi mật khẩu");
        this.$modal.setOnConfirmClick("Đổi mật khẩu", () => {});
        this.$modal.setBody(this.$bodyModalContainer);

        this.$oldPwdContainer.appendChild(this.$oldPwdInput);
        this.$oldPwdContainer.appendChild(this.$oldPwdLabel);
        this.$bodyModalContainer.appendChild(this.$oldPwdContainer);
        this.$newPwdContainer.appendChild(this.$newPwdInput);
        this.$newPwdContainer.appendChild(this.$newPwdLabel);
        this.$bodyModalContainer.appendChild(this.$newPwdContainer);
        this.$confirmNewPwdContainer.appendChild(this.$confirmNewPwdInput);
        this.$confirmNewPwdContainer.appendChild(this.$confirmNewPwdLabel);
        this.$bodyModalContainer.appendChild(this.$confirmNewPwdContainer);

        this.$container.appendChild(this.$modal.$container);
    }

    showChangePasswordModal = (listener) => {
        this.$modal.showModal(listener);
    }
}

export { ChangePassword }