import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { UserInfor } from "./detail/userInfor.js";
import { ListPost } from "./detail/listPost.js";
import { PostItem } from "./detail/postItem.js";
import { EditProfile } from "./detail/editProfile.js";

class Detail {
  $container = commonJsCreateEl("div");
  $rowDiv = commonJsCreateEl("div");
  $listPostContainer = new ListPost();
  $userInforContainer = new UserInfor();
  $postsNumber = 0;

  constructor() {
    commonJsAddClass(
      this.$container,
      "container",
      "mt-5",
      "pt-3",
      "text-dark"
    );
    commonJsAddClass(this.$rowDiv, "row");

    this.$rowDiv.appendChild(this.$userInforContainer.$containerWrapper);
    this.$rowDiv.appendChild(this.$listPostContainer.$container);
    this.$container.appendChild(this.$rowDiv);
  }

  setCurrentUserInfo = (user, idUser) => {
    const modalEditProfile = new EditProfile(user,idUser);
    this.$container.appendChild(modalEditProfile.$container);
    this.$userInforContainer.showEditProfileModal(() => {
      modalEditProfile.$modal.showModal(true);
    });
    this.$userInforContainer.getInforValue(user);
    this.getlistPosts(user.email);
  };
  setCurrentUserInfoUpdate = () =>{
    this.$userInforContainer.$userName.innerText = user.displayName;
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
