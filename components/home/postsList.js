import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";
import { PostsListItem } from "./postsListItem.js";

class PostsList {
    $container = commonJsCreateEl("div");

    lstPosts = []
    constructor () {
        commonJsAddClass(this.$container, "lists-post");
    }

    addPostsList = (posts, idPost) => {
        const $postsList = new PostsListItem(posts, idPost);
        this.lstPosts.push($postsList);
        this.$container.prepend($postsList.$container);
    }
    clearPostsList = () => {
        this.$container.innerHTML = "";
    }
    handelUpdateLikeCount = (numlike, idPosts) => {
        this.lstPosts.forEach((item) => {
            if(item.activeIdPosts == idPosts) {
                item.handelUpdateLikeCount(numlike)
            }
        })
    }
}
export { PostsList }