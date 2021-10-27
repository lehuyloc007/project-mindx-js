import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";
import { EditProfile } from "./editProfile.js";

class UserInfor {
  $containerWrapper = commonJsCreateEl("div");
  $container = commonJsCreateEl("div");
  $avatarContainer = commonJsCreateEl("div");
  $avatarImg = commonJsCreateEl("img");
  $avatar = commonJsCreateEl("div");
  $inforContainer = commonJsCreateEl("div");
  $nameAndEditWrapper = commonJsCreateEl("div");
  $nameAndEditContainer = commonJsCreateEl("div");
  $userName = commonJsCreateEl("div");
  $editBtn = commonJsCreateEl("div");
  $btnText = commonJsCreateEl("div");
  $btnIcon = commonJsCreateEl("div");
  $communicateContainer = commonJsCreateEl("div");
  $postNumberWrapper = commonJsCreateEl("div");
  $postNumberContainer = commonJsCreateEl("div");
  $postNumber = commonJsCreateEl("span");
  $postText = commonJsCreateEl("span");
  $followerWrapper = commonJsCreateEl("div");
  $followerContainer = commonJsCreateEl("div");
  $followerNumber = commonJsCreateEl("span");
  $followerText = commonJsCreateEl("span");
  $followingWrapper = commonJsCreateEl("div");
  $followingContainer = commonJsCreateEl("div");
  $followingNumber = commonJsCreateEl("span");
  $followingTextLeft = commonJsCreateEl("span");
  $followingTextRight = commonJsCreateEl("span");
  $modalEditProfile;
  $totalPostNumber = 0;

  clickEv = null;
  constructor() {
    commonJsAddClass(
      this.$avatar,
      "avatar",
      "rounded-circle",
      "bg-secondary",
      "mx-auto",
      "overflow-hidden"
    );
    commonJsAddClass(this.$avatarImg, "w-100");
    commonJsAddClass(this.$avatarContainer, "col-md-3");
    commonJsAddClass(
      this.$nameAndEditContainer,
      "pt-2",
      "d-flex",
      "flex-start",
      "align-items-center",
      "clearfix"
    );
    commonJsAddClass(this.$userName, "me-3", "mb-0", "h3", "text-494949");
    commonJsAddClass(
      this.$editBtn,
      "btn",
      "btn-edit-profile",
      "border",
      "rounded",
      "d-flex",
      "align-items-center",
      "py-1"
    );
    commonJsAddClass(this.$btnText, "me-2");
    commonJsAddClass(this.$btnIcon, "icon-setting");
    commonJsAddClass(this.$inforContainer, "col-md-7");
    commonJsAddClass(
      this.$container,
      "col-md-10",
      "col-12",
      "offset-md-1",
      "row",
      "justify-content-center"
    );
    commonJsAddClass(this.$communicateContainer, "d-flex", "mt-3");
    commonJsAddClass(this.$postNumberContainer, "me-4");
    commonJsAddClass(this.$postNumber, "h3", "me-1");
    commonJsAddClass(this.$postText, "text-868686");
    commonJsAddClass(this.$followingContainer, "me-4");
    commonJsAddClass(this.$followingNumber, "h3", "me-1");
    commonJsAddClass(this.$followingTextLeft, "text-868686", "me-1");
    commonJsAddClass(this.$followingTextRight, "text-868686");

    this.$btnText.innerText = "Chỉnh sửa trang cá nhân";
    this.$postNumber.innerText = 0;
    this.$postText.innerText = "Bài Viết";
    this.$followingTextLeft.innerText = "Đang theo dõi";
    this.$followingTextRight.innerText = "người dùng";

    this.$avatar.appendChild(this.$avatarImg);
    this.$avatarContainer.appendChild(this.$avatar);

    this.$editBtn.appendChild(this.$btnText);
    this.$editBtn.appendChild(this.$btnIcon);
    this.$editBtn.addEventListener("click", () => {
      this.clickEv();
    });

    this.$nameAndEditContainer.appendChild(this.$userName);
    this.$nameAndEditContainer.appendChild(this.$editBtn);
    this.$nameAndEditWrapper.appendChild(this.$nameAndEditContainer);

    this.$postNumberContainer.appendChild(this.$postNumber);
    this.$postNumberContainer.appendChild(this.$postText);
    this.$communicateContainer.appendChild(this.$postNumberContainer);

    this.$followingContainer.appendChild(this.$followingTextLeft);
    this.$followingContainer.appendChild(this.$followingNumber);
    this.$followingContainer.appendChild(this.$followingTextRight);
    this.$communicateContainer.appendChild(this.$followingContainer);

    this.$inforContainer.appendChild(this.$nameAndEditWrapper);
    this.$inforContainer.appendChild(this.$communicateContainer);

    this.$container.appendChild(this.$avatarContainer);
    this.$container.appendChild(this.$inforContainer);
    this.$containerWrapper.appendChild(this.$container);
  }

  showEditProfileModal = (listener) => {
    this.clickEv = listener;
  };
  getTotalPostNumber = (numberPosts) => {
    this.$postNumber.innerText = numberPosts;
  };
  getInforValue = (userInfor) => {
    this.$userName.innerText = userInfor.displayName;
    this.$followingNumber.innerText =
      userInfor.watchings?.length > 0 ? userInfor.watchings?.length : 0;
    userInfor.photoURL
      ? this.$avatarImg.setAttribute("src", userInfor.photoURL)
      : "";
  };
  setNumberWatchings = (userInfor) => {
    this.$followingNumber.innerText = userInfor.watchings.length;
  }
}

export { UserInfor };
