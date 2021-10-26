import {
  commonJsAddClass,
  commonJsCreateEl,
  commonJsRemoveClass,
} from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { Home } from "./home.js";
import { Detail } from "./detail.js";
import { Search } from "./search.js";
class App {
  $container = commonJsCreateEl("div");
  $menuContainer = new Menu();
  $contentContainer = commonJsCreateEl("div");
  $homeContainer = new Home();
  $detailContainer = new Detail();
  $searchContainer = new Search();

  constructor() {
    commonJsAddClass(this.$container, "bg-light");
    this.$container.appendChild(this.$menuContainer.$container);
    this.$container.appendChild(this.$contentContainer);
    this.getUserInfo();
    this.$menuContainer.setMenuHomeClick(() => {
      this.$contentContainer.innerHTML = "";
      this.$contentContainer.appendChild(this.$homeContainer.$container);
    });
    this.$menuContainer.setOnSearchSubmit((keyword) => {
      this.$contentContainer.innerHTML = "";
      this.$contentContainer.appendChild(this.$searchContainer.$container);
      this.$searchContainer.setKeyword(keyword);
    });
    this.$menuContainer.setOnMenuLogoClick(() => {
      this.$contentContainer.innerHTML = "";
      this.$contentContainer.appendChild(this.$homeContainer.$container);
    });
    this.$menuContainer.setMenuHomeClick(() => {
      this.$contentContainer.innerHTML = "";
      this.$contentContainer.appendChild(this.$homeContainer.$container);
    });
    this.$menuContainer.setMenuDetailClick(() => {
      this.$contentContainer.innerHTML = "";
      this.$contentContainer.appendChild(this.$detailContainer.$container);
    });
    this.$contentContainer.appendChild(this.$homeContainer.$container);
  }

  getUserInfo = () => {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            this.$menuContainer.setBackgroungIconUserActive(
              change.doc.data().photoURL
            );
            this.$homeContainer.setCurrentUserActive(
              change.doc.data(),
              change.doc.id
            );
            this.$detailContainer.setCurrentUserInfo(
              change.doc.data(),
              change.doc.id
            );
          }
          if (change.type == "modified") {
            this.$detailContainer.setCurrentUserInfoUpdate(change.doc.data());
          }
        });
      });
  };
}
export { App };
