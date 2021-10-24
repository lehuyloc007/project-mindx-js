import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";

class PostItem {
  $container = commonJsCreateEl("div");
  $postImage = commonJsCreateEl("div");
  $removePostIconContainer = commonJsCreateEl("div");
  $removePostIcon = commonJsCreateEl("div");

  constructor(postData) {
    commonJsAddClass(this.$container, "col", "col-md-4", "mt-4");
    commonJsAddClass(
      this.$postImage,
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
      "rounded"
    );
    commonJsAddClass(
      this.$removePostIcon,
      "icon-delete-post",
      "cursor-pointer"
    );

    this.$postImage.style.backgroundImage = postData?.images[0]
      ? "url(" + postData.images[0] + ")"
      : "";
    this.$removePostIconContainer.appendChild(this.$removePostIcon);
    this.$postImage.appendChild(this.$removePostIconContainer);
    this.$container.appendChild(this.$postImage);
  }
}

export { PostItem };
