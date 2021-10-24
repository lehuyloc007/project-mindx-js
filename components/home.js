import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { PostsListItem } from "./home/postsListItem.js";

class Home {
    $container = commonJsCreateEl("div");
    $menuContainer = new Menu();
    $contentContainer = commonJsCreateEl("div");
    $rowContentContainer = commonJsCreateEl("div");
    $colLeftContentContainer = commonJsCreateEl("div");
    
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


        this.getUserInfo();
    }
    getUserInfo = () => {
        db.collection("users")
        .where("email", "==", firebase.auth().currentUser.email)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added")
                this.getlistPosts(change.doc.data());
                this.$menuContainer.setBackgroungIconUserActive(change.doc.data().photoURL)
            });
        });
    }
    getlistPosts = (userActiveInfo) => {
        db.collection("posts")
        .where("email", "in", userActiveInfo.followers)
        .orderBy('createAt')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    const $postsList = new PostsListItem(change.doc.data(), change.doc.id);
                    $postsList.setIdPosts(change.doc.id);
                    this.$colLeftContentContainer.appendChild($postsList.$container);
                }
            });
        });
    }
}
export { Home }