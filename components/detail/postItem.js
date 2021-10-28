import { commonJsAddClass, commonJsCreateEl, commonJsRemoveClass } from "../shared/common.js";

class PostItem {
  $container = commonJsCreateEl("div");
  $postImage = commonJsCreateEl("div");
  $postTitleContainer = commonJsCreateEl("div");
  $relativeContainer = commonJsCreateEl("div");
  $postTitle = commonJsCreateEl("div");
  $removePostIconContainer = commonJsCreateEl("div");
  $removePostIcon = commonJsCreateEl("div");
  $confirmDeleteContainer = commonJsCreateEl("div");
  $acceptBtn = commonJsCreateEl("div");
  $refuseBtn = commonJsCreateEl("div");
  $postId;

  constructor(postData, postId) {
    this.$postId = postId;
    commonJsAddClass(this.$container, "col", "col-md-4", "mt-4");
    commonJsAddClass(
      this.$postImage,
      "post-container",
      "cursor-pointer",
      "ratio",
      "ratio-1x1",
      "bg-secondary",
      "rounded",
      "bg-image"
    );
    commonJsAddClass(
      this.$removePostIconContainer,
      "icon-delete-post-container",
      "mt-2",
      "me-2",
      "p-2",
      "right-0",
      "position-absolute",
      "cursor-pointer",
      "bg-secondary",
      "rounded",
      "d-none"
    );
    commonJsAddClass(
      this.$postTitleContainer,
      "post-title-container",
      "position-absolute",
      "rounded"
    );
    commonJsAddClass(
      this.$postTitleContainer,
      "post-relative",
      "w-100",
      "h-100",
      "rounded"
    );
    commonJsAddClass(
      this.$postTitle,
      "position-absolute",
      "ms-2",
      "mb-2",
      "l-0",
      "b-0",
      "text-white"
    );
    commonJsAddClass(
      this.$removePostIcon,
      "icon-delete-post",
      "cursor-pointer"
    );
    commonJsAddClass(
      this.$acceptBtn,
      "btn",
      "btn-primary",
      "text-white"
    );
    commonJsAddClass(
      this.$refuseBtn,
      "btn",
      "btn-warning",
      "text-white",
      "me-3"
    );
    commonJsAddClass(
      this.$confirmDeleteContainer,
      "position-absolute",
      "top-50",
      "start-50",
      "translate-middle",
      "cursor-pointer",
      "d-none",
      "p-3",
      "rounded",
      "bg-secondary",
      "d-flex",
      "confirm-container"
    );

    this.$acceptBtn.innerText = "Xóa";
    this.$refuseBtn.innerText = "Hủy";
    this.$refuseBtn.addEventListener("click", ()=> {
      commonJsAddClass(this.$confirmDeleteContainer, "d-none");
    });
    this.$acceptBtn.addEventListener("click", this.handleDeletePost);

    this.$postTitle.innerHTML = postData.detail;
    this.$postImage.style.backgroundImage = postData?.images[0]
      ? "url(" + postData.images[0] + ")"
      : "";

    this.$postTitleContainer.appendChild(this.$postTitle);
    this.$confirmDeleteContainer.appendChild(this.$refuseBtn);
    this.$confirmDeleteContainer.appendChild(this.$acceptBtn);
    this.$removePostIcon.addEventListener("click", () => {
      commonJsRemoveClass(this.$confirmDeleteContainer, "d-none");
    });
    this.$removePostIconContainer.appendChild(this.$removePostIcon);
    this.$postImage.appendChild(this.$postTitleContainer);
    this.$postImage.appendChild(this.$confirmDeleteContainer);
    this.$postImage.appendChild(this.$removePostIconContainer);
    this.$container.appendChild(this.$postImage);
  }

  handleDeletePost = () => {
    db.collection("posts").doc(this.$postId).delete().then(() => {
      this.$container.remove();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}

export { PostItem };
