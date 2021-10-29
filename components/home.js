import { commonJsAddClass, commonJsCreateEl, commonJsRemoveClass } from "./shared/common.js";
import { WatchingsList } from "./home/watchingsList.js";
import { PostsList } from "./home/postsList.js";

class Home {
    
    $container = commonJsCreateEl("div");
    $rowContentContainer = commonJsCreateEl("div");
    $colLeftContentContainer = commonJsCreateEl("div");
    $listPostsContainer = new PostsList();
    $colRightContentContainer = commonJsCreateEl("div");
    $listWatchings = new WatchingsList();
    
    lstwatchings = null;
    lstDataPost = null;
    constructor(){
        //content
        commonJsAddClass(this.$container, "container", "my-5", "pt-3", "text-dark");
        this.$container.appendChild(this.$rowContentContainer);
        commonJsAddClass(this.$rowContentContainer, "row");
        this.$rowContentContainer.appendChild(this.$colLeftContentContainer);
        this.$rowContentContainer.appendChild(this.$colRightContentContainer);

        //left
        commonJsAddClass(this.$colLeftContentContainer, "col-12", "col-md-6", "offset-md-1");
        this.$colLeftContentContainer.appendChild(this.$listPostsContainer.$container);

        //right
        commonJsAddClass(this.$colRightContentContainer, "col-12", "col-md-4");
        this.$colRightContentContainer.appendChild(this.$listWatchings.$container);
    }

    setCurrentUserActive = (user, idUser) => {
        this.$listPostsContainer.clearPostsList();
        this.lstwatchings = user.watchings;
        this.getlistPosts();
        this.$listWatchings.handelRemoveWatching();
        this.$listWatchings.addItemWatchings(user.watchings, idUser);
    }
    setCurrentUserActiveUpdate = (user, idUser) => {
        this.lstwatchings = user.watchings;
        this.$listWatchings.handelRemoveWatching();
        this.$listWatchings.addItemWatchings(user.watchings, idUser);
    }

    getlistPosts = () => {
        if (this.lstDataPost !== null) {
            this.lstDataPost();
        }
        if(this.lstwatchings.length >= 9) {
            this.lstwatchings = this.lstwatchings.slice(0,8);
        }
        this.lstDataPost = db.collection("posts")
            .where("email", "in", this.lstwatchings)
            .orderBy('createAt')
            .onSnapshot((snapshot) => {

            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    this.$listPostsContainer.addPostsList(change.doc.data(), change.doc.id);
                }
            });
        });
    }
}
export { Home }