import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";

class PostsCarousel {
    $container = commonJsCreateEl("div");
    $carouselInner = commonJsCreateEl("div");
    $carouselBtnLeft = commonJsCreateEl("div");
    $carouselBtnLeftIcon = commonJsCreateEl("div");
    $carouselItemRight = commonJsCreateEl("div");
    $carouselItemRightIcon = commonJsCreateEl("div");
    constructor(fileImages) {
        commonJsAddClass(this.$container, "carousel", "slide");
        this.$container.id = "carouselPost";
        this.$container.setAttribute("data-bs-touch", "true");

        commonJsAddClass(this.$carouselInner, "carousel-inner");

        fileImages.forEach((item, index) => {
            const carouselItem = commonJsCreateEl("div");
            const carouselItemImg = commonJsCreateEl("img");
            
            if (index == 0) {
                commonJsAddClass(carouselItem, "carousel-item", "active");
            } else {
                commonJsAddClass(carouselItem, "carousel-item");
            }
            commonJsAddClass(carouselItemImg, "d-block", "w-100");
            carouselItemImg.src = item;
            carouselItem.appendChild(carouselItemImg);
            this.$carouselInner.appendChild(carouselItem);
        });
        

        commonJsAddClass(this.$carouselBtnLeft, "carousel-control-prev");
        this.$carouselBtnLeft.type = "button";
        this.$carouselBtnLeft.setAttribute("data-bs-target", "#carouselPost");
        this.$carouselBtnLeft.setAttribute("data-bs-slide", "prev");
        commonJsAddClass(this.$carouselBtnLeftIcon, "carousel-control-prev-icon", "bg-secondary", "rounded-circle");
        
        commonJsAddClass(this.$carouselItemRight, "carousel-control-next");
        this.$carouselItemRight.type = "button";
        this.$carouselItemRight.setAttribute("data-bs-target", "#carouselPost");
        this.$carouselItemRight.setAttribute("data-bs-slide", "next");
        commonJsAddClass(this.$carouselItemRightIcon, "carousel-control-next-icon", "bg-secondary", "rounded-circle");
        
        this.$carouselBtnLeft.appendChild(this.$carouselBtnLeftIcon);
        this.$carouselItemRight.appendChild(this.$carouselItemRightIcon);
        
        
        this.$carouselInner.appendChild(this.$carouselBtnLeft);
        this.$carouselInner.appendChild(this.$carouselItemRight);
        this.$container.appendChild(this.$carouselInner);

    }
}
export { PostsCarousel }