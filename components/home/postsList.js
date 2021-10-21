import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";
import { PostsCarousel } from "./postsCarousel.js";

class PostsList {
    $container = commonJsCreateEl("div");
    $cardHeader = commonJsCreateEl("div");
    $imagesUserPost = commonJsCreateEl("img");
    $nameUserPost = commonJsCreateEl("div");
    $cardBody = commonJsCreateEl("div");
    $contentPosts = commonJsCreateEl("div");
    $imagesPosts = new PostsCarousel();


    constructor() {
        //card header
        commonJsAddClass(this.$container, "card", "post-new");
        commonJsAddClass(this.$cardHeader, "card-header", "bg-white", "d-flex", "align-items-center", "border-bottom-0");
        commonJsAddClass(this.$imagesUserPost, "rounded-circle");
        this.$imagesUserPost.src = 'components/imgs/111.jpg';
        commonJsAddClass(this.$nameUserPost, "ms-1", "h6");
        this.$nameUserPost.innerHTML = "Hieu bi bi";
        this.$cardHeader.appendChild(this.$imagesUserPost);
        this.$cardHeader.appendChild(this.$nameUserPost);

        //card body
        commonJsAddClass(this.$cardBody, "card-body", "py-0", "fs-09");
        commonJsAddClass(this.$contentPosts, "card-text");
        



    }
}
export { PostsList }