import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { PostsList } from "./home/postsList.js";

class Home {
    $container = commonJsCreateEl("div");
    $menuContainer = new Menu();
    $contentContainer = commonJsCreateEl("div");
    $rowContentContainer = commonJsCreateEl("div");
    $colLeftContentContainer = commonJsCreateEl("div");
    
    userInfo = null;
    userActiveInfo = null;
    listPosts = null;
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
        this.userInfo = db.collection("users")
        .where("email", "==", firebase.auth().currentUser.email)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added")
                this.userActiveInfo = change.doc.data();
                this.getlistPosts(change.doc.data());
            });
        });
    }
    getlistPosts = (userActiveInfo) => {
        this.listPosts = db.collection("posts")
        .where("email", "in", userActiveInfo.followers)
        .orderBy('createAt')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    const $postsList = new PostsList(change.doc.data());
                    $postsList.setIdPosts(change.doc.id);
                    this.$colLeftContentContainer.appendChild($postsList.$container);
                }
            });
        });
    }
}
export { Home }