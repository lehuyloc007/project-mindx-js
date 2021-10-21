import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";
import { ModalCommon } from "../shared/modal.js";

class CreatePosts {
    $container = commonJsCreateEl("div");
    $modal = new ModalCommon();
    $containerBodyCreatePosts = commonJsCreateEl("div");
    $modalBodyInfoUser = commonJsCreateEl("div");
    $modalBodyInfoUserImg = commonJsCreateEl("img");
    $modalBodyInfoUserName = commonJsCreateEl("div");
    $modalBodyPosts = commonJsCreateEl("div");
    $modalBodyPostsInputContent = commonJsCreateEl("div");
    $modalBodyPostsLabelContent = commonJsCreateEl("div");

    constructor() {
        commonJsAddClass(this.$modalBodyInfoUser, "rounded-3", "create-post-body-info-user", "d-flex", "align-items-center", "mt-3");
        commonJsAddClass(this.$modalBodyInfoUserImg, "rounded-circle");
        this.$modalBodyInfoUserImg.src = "../components/imgs/111.jpg";
        commonJsAddClass(this.$modalBodyInfoUserName, "ms-1", "h5", "me-auto");
        this.$modalBodyInfoUserName.innerHTML = "TonyAdams";

        this.$modalBodyInfoUser.appendChild(this.$modalBodyInfoUserImg);
        this.$modalBodyInfoUser.appendChild(this.$modalBodyInfoUserName);

        this.$containerBodyCreatePosts.appendChild(this.$modalBodyInfoUser);
        
        this.$modal.setHeader("Tạo bài viết");
        this.$modal.setBody(this.$containerBodyCreatePosts);
        this.$container.appendChild(this.$modal.$container);
    }
    showModalCreatePost = (listener) => {
        this.$modal.showModal(listener);
    }
}
export { CreatePosts }