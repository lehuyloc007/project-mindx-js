import { commonJsAddClass, commonJsCreateEl } from "./common.js"

class ModalCommon {
    $container =commonJsCreateEl("div");
    $modalDialog =commonJsCreateEl("div");
    $modalContent =commonJsCreateEl("div");
    $modalHeader =commonJsCreateEl("div");
    $modalTitle =commonJsCreateEl("h5");
    $btnCloseHeader =commonJsCreateEl("button");
    $modalBody =commonJsCreateEl("div");
    $modalFooter =commonJsCreateEl("div");
    $btnCloseFooter =commonJsCreateEl("div");
    $btnSaveFooter =commonJsCreateEl("div");

    modal = null;

    constructor() {
        commonJsAddClass(this.$container, "modal", "fade");
        commonJsAddClass(this.$modalDialog, "modal-dialog");
        commonJsAddClass(this.$modalContent, "modal-content");
        commonJsAddClass(this.$modalHeader, "modal-header");
        commonJsAddClass(this.$modalTitle, "modal-title", "h5");
        commonJsAddClass(this.$btnCloseHeader, "btn-close");
        this.$btnCloseHeader.setAttribute("data-bs-dismiss", "modal");
        this.$btnCloseHeader.type = "button";

        commonJsAddClass(this.$modalBody, "modal-body");
        commonJsAddClass(this.$modalFooter, "modal-footer");
        commonJsAddClass(this.$btnCloseFooter, "btn", "btn-secondary", "btn-sm");
        this.$btnCloseFooter.innerHTML = "Đóng";
        this.$btnCloseFooter.type = "button";
        commonJsAddClass(this.$btnSaveFooter, "btn", "btn-primary", "btn-sm");

        this.$modalHeader.appendChild(this.$modalTitle);
        this.$modalHeader.appendChild(this.$btnCloseHeader);
        this.$modalContent.appendChild(this.$modalHeader);
        this.$modalContent.appendChild(this.$modalBody);
        this.$modalContent.appendChild(this.$modalFooter);
        this.$modalDialog.appendChild(this.$modalContent);
        this.$container.appendChild(this.$modalDialog);
        this.modal = new bootstrap.Modal(this.$container)
        

        
    }
    setBody = (component) => {
        this.$modalBody.innerHTML = "";
        this.$modalBody.appendChild(component);
    }
    setHeader = (title) => {
        this.$modalTitle.innerHTML = title;
    }
    setOnConfirmClick = (btnname,listener) => {
        this.$btnSaveFooter.innerHTML = btnname;
        this.$btnSaveFooter.onclick = listener;
    }
    showModal = (listener) => {
        console.log(listener)
        if(listener == true){
            this.modal.toggle(this.$container)
        }
    }
}
export { ModalCommon }