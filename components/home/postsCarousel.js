import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";

class PostsCarousel {
    $container = commonJsCreateEl("div");
    $carouselInner = commonJsCreateEl("div");
    constructor() {
        commonJsAddClass(this.$container, "carousel", "slide");
        commonJsAddClass(this.$carouselInner, "carousel-inner");
    }
}
export { PostsCarousel }