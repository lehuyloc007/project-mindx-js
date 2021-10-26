import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { UserInfor } from "./detail/userInfor.js";
import { ListPost } from "./detail/listPost.js";
import { PostItem } from "./detail/postItem.js";
import { EditProfile } from "./detail/editProfile.js";

class Detail {
  $container = commonJsCreateEl("div");
  $contentWrapper = commonJsCreateEl("div");
  $rowDiv = commonJsCreateEl("div");
  $menuContainer = new Menu();
  $listPostContainer = new ListPost();
  $userInforContainer = new UserInfor();
  $postsNumber = 0;

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
    this.$rowDiv.appendChild(this.$userInforContainer.$containerWrapper);
    this.$rowDiv.appendChild(this.$listPostContainer.$container);
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
            const modalEditProfile = new EditProfile(
              change.doc.data(),
              change.doc.id
            );
            this.$container.appendChild(modalEditProfile.$container);
            this.$userInforContainer.showEditProfileModal(() => {
              modalEditProfile.$modal.showModal(true);
            });
            this.$userInforContainer.getInforValue(change.doc.data());
            this.getlistPosts(change.doc.data().email);
          } else if (change.type == "modified") {
            this.$userInforContainer.$userName.innerText =
              change.doc.data().displayName;
          }
        });
      });
  };

  getlistPosts = (email) => {
    db.collection("posts")
      .where("email", "==", email)
      .orderBy("createAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            this.$postsNumber++;
            const postItem = new PostItem(change.doc.data(), change.doc.id);
            this.$listPostContainer.$postListContainer.appendChild(
              postItem.$container
            );
          } else if (change.type == "removed") {
            this.$postsNumber--;
          }
        });
        this.$userInforContainer.getTotalPostNumber(this.$postsNumber);
      });
  };
}

export { Detail };
