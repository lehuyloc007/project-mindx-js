import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";

class SearchResultItem {
  $container = commonJsCreateEl("div");
  $avatar = commonJsCreateEl("img");
  $nameComtainer = commonJsCreateEl("div");
  $username = commonJsCreateEl("div");
  $userdescription = commonJsCreateEl("div");
  $followBtn = commonJsCreateEl("div");

  constructor() {
    commonJsAddClass(
      this.$container,
      "p-3",
      "rounded-3",
      "d-flex",
      "align-items-center",
      "border-bottom"
    );
    commonJsAddClass(this.$avatar, "rounded-circle", "me-2");
    commonJsAddClass(this.$nameComtainer, "ms-1", "me-auto");
    commonJsAddClass(this.$username, "h5");
    commonJsAddClass(this.$userdescription, "h6", "text-secondary");
    commonJsAddClass(this.$followBtn, "btn", "btn-sm", "btn-outline-secondary");

    this.$username.innerText = "Minh Hiếu";
    this.$userdescription.innerText = "Be Patient";
    this.$followBtn.innerText = "Theo dõi";
    this.$avatar.setAttribute("src", "components/imgs/111.jpg");

    this.$container.appendChild(this.$avatar);
    this.$nameComtainer.appendChild(this.$username);
    this.$nameComtainer.appendChild(this.$userdescription);
    this.$container.appendChild(this.$nameComtainer);
    this.$container.appendChild(this.$followBtn);
  }
}

export { SearchResultItem };
