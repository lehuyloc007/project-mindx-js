import { commonJsAddClass, commonJsCreateEl } from "./common.js"

class MenuList {
    $container = commonJsCreateEl("li");
    $itemMenu = commonJsCreateEl("div")
    $iconMenu = commonJsCreateEl("span");
    $txtMenu = commonJsCreateEl("span");

    constructor(classIcon, txtContent) {
        commonJsAddClass(this.$container, "nav-item", "ms-1");
        commonJsAddClass(this.$itemMenu, classIcon, "nav-link", "d-flex", "align-items-center");
        this.$txtMenu.innerHTML = txtContent;
        commonJsAddClass(this.$txtMenu, "ms-1", "d-inline-block", "d-sm-none");
        this.$itemMenu.appendChild(this.$iconMenu);
        this.$itemMenu.appendChild(this.$txtMenu);
        this.$container.appendChild(this.$itemMenu);
    }
    setOnMenuClick = (listener) => {
        this.$itemMenu.onclick = listener;
    }
    setBackgroungIconUser = (imgUser) => {
        console.log(imgUser)
        this.$iconMenu.style.backgroundImage = "url(" + imgUser + ")";
    }

}
export { MenuList }