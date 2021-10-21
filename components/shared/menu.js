import { commonJsAddClass, commonJsCreateEl } from "./common.js"
import { MenuList } from "./menuList.js";
import { CreatePosts } from "../home/createPosts.js";

class Menu {
    $container = commonJsCreateEl("div");
    $bgMenuContainer = commonJsCreateEl("nav");
    $navContainer = commonJsCreateEl("div");
    $txtLogo = commonJsCreateEl("div");
    $btnMenu = commonJsCreateEl("button");
    $bgBtnMenu = commonJsCreateEl("span");
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
    $modalCreatePosts = new CreatePosts();

    constructor() {
        //left
        this.$txtLogo.innerHTML = "Social";
        commonJsAddClass(this.$txtLogo, "navbar-brand", "fst-italic", "fw-bold");

        this.$btnMenu.type = "button";
        this.$btnMenu.setAttribute("data-bs-toggle", "collapse");
        this.$btnMenu.setAttribute("data-bs-target", "#collapsibleNavId");
        this.$btnMenu.setAttribute("aria-controls", "collapsibleNavId");
        commonJsAddClass(this.$btnMenu, "navbar-toggler", "ms-auto", "d-lg-none");
        commonJsAddClass(this.$bgBtnMenu, "navbar-toggler-icon");
        this.$btnMenu.appendChild(this.$bgBtnMenu);

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
        commonJsAddClass(this.$menuItemSearchContainer, "nav-item");
        this.$menuItemSearchContainer.appendChild(this.$menuSearchBox);

        commonJsAddClass(this.$menuListContainer, "navbar-nav", "mt-2", "mt-md-0");
        this.$menuListContainer.appendChild(this.$menuItemSearchContainer);
        this.$menuListContainer.appendChild(this.$menuItemBtnHomeContainer.$container);
        this.$menuListContainer.appendChild(this.$menuItemBtnCreatPostContainer.$container);
        this.$menuListContainer.appendChild(this.$menuItemBtnUserContainer.$container);
        this.$menuListContainer.appendChild(this.$menuItemBtnLogoutContainer.$container);

        commonJsAddClass(this.$menuContainer, "collapse", "navbar-collapse", "justify-content-end");
        this.$menuContainer.id = "collapsibleNavId";
        this.$menuContainer.appendChild(this.$menuListContainer);
        
        commonJsAddClass(this.$navContainer, "container");
        commonJsAddClass(this.$bgMenuContainer, "navbar", "navbar-expand-md", "navbar-light", "bg-white", "border-bottom", "py-1", "fixed-top");
        this.$navContainer.appendChild(this.$txtLogo);
        this.$navContainer.appendChild(this.$btnMenu);
        this.$navContainer.appendChild(this.$menuContainer);
        this.$bgMenuContainer.appendChild(this.$navContainer);
        this.$container.appendChild(this.$bgMenuContainer);
        this.$container.appendChild(this.$modalCreatePosts.$container);

        this.$menuItemBtnLogoutContainer.setOnMenuClick(()=> {
            firebase.auth().signOut();
        });

        this.$menuItemBtnCreatPostContainer.setOnMenuClick(()=> {
            this.$modalCreatePosts.showModalCreatePost(true);
        });

        // db.collection("users")
        // .where("email", "==", firebase.auth().currentUser.email)
        // .onSnapshot((snapshot) => {
        //     snapshot.docChanges().forEach((change) => {
        //         if(change.type == "added") {

        //         }
        //     });
        // });
    }

    handelLogout = () => {
        firebase.auth().signOut();
    }
}
export { Menu }