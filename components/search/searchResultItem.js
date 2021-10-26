import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";

class SearchResultItem {
  $container = commonJsCreateEl("div");
  $avatar = commonJsCreateEl("img");
  $nameComtainer = commonJsCreateEl("div");
  $username = commonJsCreateEl("div");
  $userdescription = commonJsCreateEl("div");
  $followBtn = commonJsCreateEl("div");

  constructor(userInfor) {
    commonJsAddClass(
      this.$container,
      "p-3",
      "rounded-3",
      "d-flex",
      "align-items-center",
      "border-bottom"
    );
    commonJsAddClass(this.$avatar, "rounded-circle", "me-2", "col-2");
    commonJsAddClass(this.$nameComtainer, "ms-1", "me-auto");
    commonJsAddClass(this.$username, "h5");
    commonJsAddClass(this.$userdescription, "h6", "text-secondary", "mt-2");
    commonJsAddClass(this.$followBtn, "btn", "btn-sm", "btn-outline-secondary");

    this.$username.innerText = userInfor.displayName;
    this.$userdescription.innerText = userInfor.description;
    this.$followBtn.innerText = "Theo dõi";
    this.$avatar.setAttribute("src", userInfor.photoURL);

    this.$container.appendChild(this.$avatar);
    this.$nameComtainer.appendChild(this.$username);
    this.$nameComtainer.appendChild(this.$userdescription);
    this.$container.appendChild(this.$nameComtainer);
    this.$container.appendChild(this.$followBtn);
  }
}

export { SearchResultItem };
