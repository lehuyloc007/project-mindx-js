import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";
import { PostsListItem } from "./postsListItem.js";

class PostsList {
    $container = commonJsCreateEl("div");
    constructor () {
        commonJsAddClass(this.$container, "lists-post");
    }

    addPostsList = (posts, idPost) => {
        const $postsList = new PostsListItem(posts, idPost);
        this.$container.prepend($postsList.$container);
    }
    clearPostsList = () => {
        this.$container.innerHTML = "";
    }
}
export { PostsList }