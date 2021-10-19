import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js"
import { MenuList } from "../shared/menuList.js";

class Menu {
    $navContainer = commonJsCreateEl("nav");
    $container = commonJsCreateEl("div");
    $txtLogo = commonJsCreateEl("div");
    $btnMenu = commonJsCreateEl("button");
    $bgBtnMenu = commonJsCreateEl("span");
    $centerContainer = commonJsCreateEl("div");
    $searchBox = commonJsCreateEl("div");
    $searchInputSearch = commonJsCreateEl("input");
    $btnInputSearch = commonJsCreateEl("button");
    $rightContainer = commonJsCreateEl("div");
    $menuContainer = commonJsCreateEl("div")
    $menuListContainer = commonJsCreateEl("ul");
    $menuItemSearchContainer = commonJsCreateEl("li");
    $menuSearchBox = commonJsCreateEl("div");
    $menuSearchInputSearch = commonJsCreateEl("input");
    $menuBtnInputSearch = commonJsCreateEl("button");
    $menuItemBtnHomeContainer = new MenuList("btn-home", "Trang chủ");
    $menuItemBtnCreatPostContainer = new MenuList("btn-create-post", "Tạo bài viết");
    $menuItemBtnUserContainer = new MenuList("btn-user", "Tên nhân vật");
    $menuItemBtnLogoutContainer = new MenuList("btn-logout", "Đăng xuất");

    constructor() {
        //left
        this.$txtLogo.innerHTML = "Social";
        commonJsAddClass(this.$txtLogo, "navbar-brand", "fst-italic", "fw-bold");
        this.$btnMenu.type = "button";
        commonJsAddClass(this.$btnMenu, "navbar-toggler", "ms-auto", "d-lg-none");
        commonJsAddClass(this.$bgBtnMenu, "navbar-toggler-icon");
        this.$bgBtnMenu.appendChild(this.$btnMenu);


        //center 
        commonJsAddClass(this.searchInputSearch, "form-control");
        this.$searchInputSearch.placeholder = "Nhập từ khóa...";
        this.$searchInputSearch.type = "text";
        commonJsAddClass(this.btnInputSearch, "btn", "btn-outline-secondary");
        this.$btnInputSearch.innerHTML = "Tìm kiếm";
        this.$btnInputSearch.type = "button";
        commonJsAddClass(this.searchBox, "input-group", "input-group-sm");
        this.searchBox.appendChild(this.searchInputSearch);
        this.searchBox.appendChild(this.btnInputSearch);
        commonJsAddClass(this.centerContainer, "mx-auto", "d-none", "d-md-block");
        this.centerContainer.appendChild(this.searchBox);
        

        //right
        commonJsAddClass(this.$menuSearchBox, "input-group", "input-group-sm");
        commonJsAddClass(this.$menuSearchInputSearch, "form-control");
        this.$menuSearchInputSearch.placeholder = "Nhập từ khóa...";
        this.$menuSearchInputSearch.type = "text";
        commonJsAddClass(this.$menuBtnInputSearch, "btn", "btn-outline-secondary");
        this.$menuBtnInputSearch.innerHTML = "Tìm kiếm";
        this.$menuBtnInputSearch.type = "button";
        this.$menuSearchBox.appendChild(this.$menuSearchInputSearch);
        this.$menuSearchBox.appendChild(this.$menuBtnInputSearch);
        commonJsAddClass(this.$menuItemSearchContainer, "nav-item", "d-block", "d-md-none");
        this.$menuItemSearchContainer.appendChild(this.$menuSearchBox);

        commonJsAddClass(this.$menuListContainer, "navbar-nav", "mt-2", "mt-lg-0");
        this.$menuListContainer.appendChild(this.$menuItemSearchContainer);
        this.$menuListContainer.appendChild(this.$menuItemBtnHomeContainer);
        this.$menuListContainer.appendChild(this.$menuItemBtnCreatPostContainer);
        this.$menuListContainer.appendChild(this.$menuItemBtnUserContainer);
        this.$menuListContainer.appendChild(this.$menuItemBtnLogoutContainer);

        commonJsAddClass(this.$menuContainer, "collapse", "navbar-collapse");
        this.$menuContainer.appendChild(this.$menuListContainer);

        
    }
}
export { Menu }