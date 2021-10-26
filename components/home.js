import { commonJsAddClass, commonJsCreateEl, commonJsRemoveClass } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { PostsListItem } from "./home/postsListItem.js";
import { WatchingsList } from "./home/watchingsList.js";

class Home {
    $container = commonJsCreateEl("div");
    $menuContainer = new Menu();
    $contentContainer = commonJsCreateEl("div");
    $rowContentContainer = commonJsCreateEl("div");
    $colLeftContentContainer = commonJsCreateEl("div");
    $listPostsContainer = commonJsCreateEl("div");
    $btnLoadMorePostsContainer = commonJsCreateEl("div");
    $btnLoadMorePosts = commonJsCreateEl("div");
    $colRightContentContainer = commonJsCreateEl("div");
    $listWatchings = new WatchingsList();
    
    lastestDoc = null;
    lstwatchings = null;
    constructor(){
        //menu
        this.$menuContainer.setMenuHomeClick(()=> {
            console.log(2)
           //content
            
           this.getHome();
        });

        
        
        this.$container.appendChild(this.$menuContainer.$container);

        

    }
    getHome = () => {
        //content
        commonJsAddClass(this.$contentContainer, "container", "my-5", "pt-3", "text-dark");
        this.$contentContainer.appendChild(this.$rowContentContainer);
        commonJsAddClass(this.$rowContentContainer, "row");
        this.$rowContentContainer.appendChild(this.$colLeftContentContainer);
        this.$rowContentContainer.appendChild(this.$colRightContentContainer);

        this.$container.appendChild(this.$contentContainer);

        //left
        commonJsAddClass(this.$colLeftContentContainer, "col", "col-sm-7", "col-md-6", "offset-md-1");
        this.$colLeftContentContainer.appendChild(this.$listPostsContainer);
        commonJsAddClass(this.$btnLoadMorePostsContainer, "d-flex", "d-none");
        commonJsAddClass(this.$btnLoadMorePosts, "btn", "btn-outline-secondary", "my-5", "mx-auto");
        this.$btnLoadMorePosts.innerHTML = "Hiển thị thêm bài viết";
        this.$btnLoadMorePosts.addEventListener("click", this.getlistPosts);
        this.$btnLoadMorePostsContainer.appendChild(this.$btnLoadMorePosts);
        this.$colLeftContentContainer.appendChild(this.$btnLoadMorePostsContainer);
        this.getUserInfo();

        //right
        commonJsAddClass(this.$colRightContentContainer, "col", "col-sm-5", "col-md-4");
        this.$colRightContentContainer.appendChild(this.$listWatchings.$container);
    }
    getUserInfo = () => {
        
        db.collection("users")
        .where("email", "==", firebase.auth().currentUser.email)
        .onSnapshot((snapshot) => {
            this.$listWatchings.clearw();
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    console.log(1)
                    this.lstwatchings = change.doc.data().watchings;
                    this.getlistPosts();
                    this.$menuContainer.setBackgroungIconUserActive(change.doc.data().photoURL);

                    this.$listWatchings.addItemWatchings(change.doc.data().watchings, change.doc.id);
                }
            });
        });
    }
    getlistPosts = () => {
        commonJsRemoveClass(this.$btnLoadMorePostsContainer,  "d-none");
        if(this.lastestDoc === undefined) {
            commonJsAddClass(this.$btnLoadMorePostsContainer, "d-none");
            return;
        };
        let lstdataPosts = db.collection("posts")
            .where("email", "in", this.lstwatchings)
            .orderBy('createAt', 'desc')
            .limit(5);
        if(this.lastestDoc !== null) {
            lstdataPosts =  lstdataPosts.startAfter(this.lastestDoc)
        } 
        lstdataPosts.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    const $postsList = new PostsListItem(change.doc.data(), change.doc.id);
                    this.$listPostsContainer.appendChild($postsList.$container);
                }
            });
            this.lastestDoc = snapshot.docs[snapshot.docs.length-1];
        });
    }

}
export { Home }