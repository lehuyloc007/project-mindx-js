import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";

class ListPost {
  $container = commonJsCreateEl("div");
  $postTitleWrapper = commonJsCreateEl("div");
  $postTitleContainer = commonJsCreateEl("div");
  $postTitleIcon = commonJsCreateEl("div");
  $postTitleText = commonJsCreateEl("div");
  $postListWrapper = commonJsCreateEl("div");
  $postListContainer = commonJsCreateEl("div");

  constructor() {
    commonJsAddClass(this.$postTitleWrapper, "border-bottom", "mt-3", "pb-1");
    commonJsAddClass(
      this.$postTitleContainer,
      "d-flex",
      "align-items-center",
      "justify-content-center"
    );
    commonJsAddClass(this.$postTitleIcon, "icon-list-posts", "me-1");
    commonJsAddClass(this.$postTitleText, "h5", "mb-0");
    commonJsAddClass(this.$postListWrapper, "pt-4", "pb-3", "bg-ececec");
    commonJsAddClass(
      this.$postListContainer,
      "list-posts",
      "row",
      "col",
      "col-md-10",
      "mx-auto"
    );

    this.$postTitleText.innerText = "Bài Viết";

    this.$postTitleContainer.appendChild(this.$postTitleIcon);
    this.$postTitleContainer.appendChild(this.$postTitleText);
    this.$postTitleWrapper.appendChild(this.$postTitleContainer);
    this.$container.appendChild(this.$postTitleWrapper);
    this.$postListWrapper.appendChild(this.$postListContainer);
    this.$container.appendChild(this.$postListWrapper);
  }
}

export { ListPost };
