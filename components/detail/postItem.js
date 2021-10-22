import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";

class PostItem {
  $container = commonJsCreateEl("div");
  $postImage = commonJsCreateEl("div");
  $removePostIcon = commonJsCreateEl("div");

  constructor() {
    commonJsAddClass(this.$container, "col", "col-md-4", "mt-4");
    commonJsAddClass(
      this.$postImage,
      "ratio",
      "ratio-1x1",
      "bg-secondary",
      "rounded"
    );
    commonJsAddClass(
      this.$removePostIcon,
      "icon-delete-post",
      "mt-1",
      "me-1",
      "right-0",
      "position-absolute"
    );

    this.$postImage.appendChild(this.$removePostIcon);
    this.$container.appendChild(this.$postImage);
  }
}

export { PostItem };
