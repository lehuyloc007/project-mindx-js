import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { PostsList } from "./home/postsList.js";

class Home {
    $container = commonJsCreateEl("div");
    $menuContainer = new Menu();
    $contentContainer = commonJsCreateEl("div");
    $rowContentContainer = commonJsCreateEl("div");
    $colLeftContentContainer = commonJsCreateEl("div");
    $postsList = new PostsList();


    constructor(){
        //menu
        this.$container.appendChild(this.$menuContainer.$container);

        //content
        commonJsAddClass(this.$contentContainer, "container", "mt-5", "pt-3", "text-dark");
        this.$contentContainer.appendChild(this.$rowContentContainer);
        commonJsAddClass(this.$rowContentContainer, "row");
        this.$rowContentContainer.appendChild(this.$colLeftContentContainer);

        this.$container.appendChild(this.$contentContainer);

        //left
        commonJsAddClass(this.$colLeftContentContainer, "col", "col-md-6", "offset-md-1");
        this.$colLeftContentContainer.appendChild(this.$postsList.$container);

        
    }
}
export { Home }