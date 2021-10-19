import { commonJsAddClass, commonJsCreateEl } from "./common.js"

class MenuList {
    $container = commonJsCreateEl("li");
    $iconMenu = commonJsCreateEl("span");
    $txtMenu = commonJsCreateEl("span");
    constructor(classIcon, txtContent) {
        commonJsAddClass(this.$container, classIcon, "nav-item", "btn-home", "d-flex", "align-items-center");
        this.$txtMenu.innerHTML = txtContent;
        commonJsAddClass(this.$txtMenu, "ms-1", "d-inline-block", "d-md-none");
    }
}
export { MenuList }