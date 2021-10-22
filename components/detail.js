import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { UserInfor } from "./detail/userInfor.js";
import { ListPost } from "./detail/listPost.js";

class Detail {
  $container = commonJsCreateEl("div");
  $contentWrapper = commonJsCreateEl("div");
  $rowDiv = commonJsCreateEl("div");
  $menuContainer = new Menu();
  $userInforContainer = new UserInfor();
  $listPostContainer = new ListPost();

  constructor() {
    commonJsAddClass(
      this.$contentWrapper,
      "container",
      "mt-5",
      "pt-3",
      "text-dark"
    );

    commonJsAddClass(this.$rowDiv, "row");

    this.$rowDiv.appendChild(this.$userInforContainer.$container);
    this.$rowDiv.appendChild(this.$listPostContainer.$container);
    this.$contentWrapper.appendChild(this.$rowDiv);

    this.$container.appendChild(this.$menuContainer.$container);
    this.$container.appendChild(this.$contentWrapper);
  }
}

export { Detail };
