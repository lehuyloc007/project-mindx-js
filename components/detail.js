import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { UserInfor } from "./detail/userInfor.js";
import { ListPost } from "./detail/listPost.js";
import { PostItem } from "./detail/postItem.js";

class Detail {
  $container = commonJsCreateEl("div");
  $contentWrapper = commonJsCreateEl("div");
  $rowDiv = commonJsCreateEl("div");
  $menuContainer = new Menu();
  $listPostContainer = new ListPost();

  constructor() {
    commonJsAddClass(
      this.$contentWrapper,
      "container",
      "mt-5",
      "pt-3",
      "text-dark"
    );
    commonJsAddClass(this.$container, "bg-light");
    commonJsAddClass(this.$rowDiv, "row");

    this.getUserInfo();
    this.$contentWrapper.appendChild(this.$rowDiv);

    this.$container.appendChild(this.$menuContainer.$container);
    this.$container.appendChild(this.$contentWrapper);
  }

  getUserInfo = () => {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            const userInforContainer = new UserInfor(change.doc.data());
            this.$rowDiv.appendChild(userInforContainer.$containerWrapper);
            this.$rowDiv.appendChild(this.$listPostContainer.$container);
            this.getlistPosts(change.doc.data());
          }
        });
      });
  };

  getlistPosts = (userInfo) => {
    db.collection("posts")
      .where("email", "==", userInfo.email)
      .orderBy("createAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            const postItem = new PostItem(change.doc.data());
            this.$listPostContainer.$postListContainer.appendChild(
              postItem.$container
            );
          }
        });
      });
  };
}

export { Detail };
