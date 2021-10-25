import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { PostsListItem } from "./home/postsListItem.js";

class Home {
    $container = commonJsCreateEl("div");
    $menuContainer = new Menu();
    $contentContainer = commonJsCreateEl("div");
    $rowContentContainer = commonJsCreateEl("div");
    $colLeftContentContainer = commonJsCreateEl("div");
    $listPostsContainer = commonJsCreateEl("div");
    $btnLoadMorePosts = commonJsCreateEl("div");
    
    lastestDoc = null;
    lstwatchings = null;
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
        this.$colLeftContentContainer.appendChild(this.$listPostsContainer);
        commonJsAddClass(this.$btnLoadMorePosts, "btn", "btn-outline-secondary");
        this.$btnLoadMorePosts.innerHTML = "Hiển thị thêm bài viết";
        this.$btnLoadMorePosts.addEventListener("click", () => {
            this.getlistPosts();
        });
        this.$colLeftContentContainer.appendChild(this.$btnLoadMorePosts);
        this.getUserInfo();
    }
    getUserInfo = () => {
        db.collection("users")
        .where("email", "==", firebase.auth().currentUser.email)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added")
                this.lstwatchings = change.doc.data().watchings;
                this.getlistPosts();
                this.$menuContainer.setBackgroungIconUserActive(change.doc.data().photoURL)
            });
        });
    }
    getlistPosts = () => {
        console.log(this.lastestDoc)
        db.collection("posts")
        .where("email", "in", this.lstwatchings)
        .orderBy('createAt', 'asc')
        //.endBefore(this.lastestDoc || 0)
        .limit(5)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    const $postsList = new PostsListItem(change.doc.data(), change.doc.id);
                    this.$listPostsContainer.appendChild($postsList.$container);
                }
            });
            console.log(snapshot.docs.length-1)
            this.lastestDoc = snapshot.docs[snapshot.docs.length-1];
                console.log(this.lastestDoc)
        });
    }
}
export { Home }