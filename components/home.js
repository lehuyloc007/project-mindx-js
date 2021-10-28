import { commonJsAddClass, commonJsCreateEl, commonJsRemoveClass } from "./shared/common.js";

import { PostsListItem } from "./home/postsListItem.js";
import { WatchingsList } from "./home/watchingsList.js";

class Home {
    
    $container = commonJsCreateEl("div");
    $rowContentContainer = commonJsCreateEl("div");
    $colLeftContentContainer = commonJsCreateEl("div");
    $listPostsContainer = commonJsCreateEl("div");
    $btnLoadMorePostsContainer = commonJsCreateEl("div");
    $btnLoadMorePosts = commonJsCreateEl("div");
    $colRightContentContainer = commonJsCreateEl("div");
    $listWatchings = new WatchingsList();
    
    lastestDoc = null;
    lstwatchings = null;
    lstdataPosts = null;
    constructor(){
        //content
        commonJsAddClass(this.$container, "container", "my-5", "pt-3", "text-dark");
        this.$container.appendChild(this.$rowContentContainer);
        commonJsAddClass(this.$rowContentContainer, "row");
        this.$rowContentContainer.appendChild(this.$colLeftContentContainer);
        this.$rowContentContainer.appendChild(this.$colRightContentContainer);

        //left
        commonJsAddClass(this.$colLeftContentContainer, "col-12", "col-md-6", "offset-md-1");
        this.$colLeftContentContainer.appendChild(this.$listPostsContainer);

        //right
        commonJsAddClass(this.$colRightContentContainer, "col-12", "col-md-4");
        this.$colRightContentContainer.appendChild(this.$listWatchings.$container);
    }

    setCurrentUserActive = (user, idUser) => {
        this.lstwatchings = user.watchings;
        this.getlistPosts();
        this.$listWatchings.addItemWatchings(user.watchings, idUser);
    }

    setCurrentUserActiveUpdate = (user, idUser) => {
        this.lstwatchings = user.watchings;
        this.getlistPosts();
        this.$listWatchings.handelRemoveWatching();
        this.$listWatchings.addItemWatchings(user.watchings, idUser);
    }

    getlistPosts = () => {
        this.lstdataPosts = db.collection("posts")
            .where("email", "in", this.lstwatchings)
            .orderBy('createAt', 'asc')
            .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    const $postsList = new PostsListItem(change.doc.data(), change.doc.id);
                    this.$listPostsContainer.prepend($postsList.$container);
                }
            });
            this.lastestDoc = snapshot.docs[snapshot.docs.length-1]; 
        });
    }
}
export { Home }