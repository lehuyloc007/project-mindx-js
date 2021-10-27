import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";

class SearchResultItem {
  $container = commonJsCreateEl("div");
  $avatar = commonJsCreateEl("img");
  $nameComtainer = commonJsCreateEl("div");
  $username = commonJsCreateEl("div");
  $userdescription = commonJsCreateEl("div");
  $btnWatching = commonJsCreateEl("div");

  emailUserItem = null;
  currentUserInfo = null;
  currentUserId = null;
  constructor(userItem) {
    this.emailUserItem = userItem.email;
    commonJsAddClass(this.$container,"p-3","rounded-3","d-flex","align-items-center","border-bottom");
    commonJsAddClass(this.$avatar, "rounded-circle", "me-2", "col-2");
    commonJsAddClass(this.$nameComtainer, "ms-1", "me-auto");
    commonJsAddClass(this.$username, "h5");
    commonJsAddClass(this.$userdescription, "h6", "text-secondary", "mt-2");
    commonJsAddClass(this.$btnWatching, "btn", "btn-sm", "btn-outline-secondary");

    this.$username.innerText = userItem.displayName;
    this.$userdescription.innerText = userItem.description;
    this.$btnWatching.innerText = "Theo dõi";
    this.$btnWatching.addEventListener("click", this.handelWatching);
    this.$avatar.setAttribute("src", userItem.photoURL);

    this.$container.appendChild(this.$avatar);
    this.$nameComtainer.appendChild(this.$username);
    this.$nameComtainer.appendChild(this.$userdescription);
    this.$container.appendChild(this.$nameComtainer);
  }
  setActiveBtnWatchings = () => {
    this.$container.appendChild(this.$btnWatching);
  }
  setCurrentUserInfo = (user, idUser) => {
    this.currentUserInfo = user;
    this.currentUserId = idUser;
  }
  handelWatching = () => {
    this.currentUserInfo.watchings.splice(1, 0, this.emailUserItem);
    db.collection("users")
    .doc(this.currentUserId)
    .update({
      watchings: this.currentUserInfo.watchings
    })
    .then(() => {
      commonJsAddClass(this.$btnWatching, "d-none");
    })
    .catch((error) => {
      console.log(error);
    });
  }

}

export { SearchResultItem };
