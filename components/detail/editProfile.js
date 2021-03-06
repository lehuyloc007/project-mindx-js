import {
  commonJsAddClass,
  commonJsCreateEl,
  commonJsRemoveClass,
  hasWhiteSpace
} from "../shared/common.js";
import { ModalCommon } from "../shared/modal.js";
import { ChangePassword } from "./changePassword.js";

class EditProfile {
  $container = commonJsCreateEl("div");
  $modal = new ModalCommon();
  $modalSuccess = new ModalCommon();
  $modalChangePassword = new ChangePassword();
  $modalSuccessMessage = commonJsCreateEl("div");
  $bodyModalContainer = commonJsCreateEl("div");
  $avatarContainer = commonJsCreateEl("div");
  $avatarImg = commonJsCreateEl("img");
  $avatarEditIconContainer = commonJsCreateEl("div");
  $avatarEditIcon = commonJsCreateEl("div");
  $uploadAvatarInput = commonJsCreateEl("input");
  $uploadAvatarLabel = commonJsCreateEl("label");
  $userNameContainer = commonJsCreateEl("div");
  $userNameInput = commonJsCreateEl("input");
  $userNameLabel = commonJsCreateEl("label");
  $userNameError = commonJsCreateEl("div");
  $describeContainer = commonJsCreateEl("div");
  $describeInput = commonJsCreateEl("input");
  $describeLabel = commonJsCreateEl("label");
  $changePasswordContainer = commonJsCreateEl("div");
  $changePasswordText = commonJsCreateEl("div");
  $changePasswordBtn = commonJsCreateEl("button");
  $modalErrorMsg = commonJsCreateEl("div");
  $modalProgress = commonJsCreateEl("div");
  $modalProgressBar = commonJsCreateEl("div");
  $userId;
  $userEmail;

  constructor(userInfor,userId) {
    this.$userEmail = userInfor.email;
    this.$userId = userId;
    commonJsAddClass(
      this.$avatarContainer,
      "rounded-3",
      "d-flex",
      "mt-3",
      "position-relative"
    );
    commonJsAddClass(
      this.$avatarImg,
      "rounded-circle",
      "avatar-edit",
      "mx-auto"
    );
    commonJsAddClass(this.$avatarEditIcon, "icon-pencil");
    commonJsAddClass(
      this.$avatarEditIconContainer,
      "p-1",
      "position-absolute",
      "rounded-circle",
      "icon-edit-container",
      "cursor-pointer"
    );
    commonJsAddClass(this.$userNameError, "alert", "alert-danger", "py-1", "mt-1", "d-none");
    commonJsAddClass(this.$userNameContainer, "form-floating", "mt-4");
    commonJsAddClass(this.$userNameInput, "form-control");
    commonJsAddClass(this.$describeContainer, "form-floating", "mt-4");
    commonJsAddClass(this.$describeInput, "form-control");
    commonJsAddClass(
      this.$changePasswordContainer,
      "mb-5",
      "mt-4",
      "d-flex",
      "align-items-center"
    );
    commonJsAddClass(
      this.$changePasswordBtn,
      "btn",
      "btn-white",
      "text-primary",
      "p-0",
      "ps-5"
    );
    commonJsAddClass(
      this.$modalErrorMsg,
      "alert",
      "alert-danger",
      "py-1",
      "mt-3",
      "d-none"
    );
    commonJsAddClass(this.$modalProgress, "progress", "mt-3", "d-none");
    commonJsAddClass(this.$modalProgressBar, "progress-bar");
    commonJsAddClass(this.$modalSuccessMessage, "alert", "alert-success", "py-1", "mt-3");

    this.$userNameInput.setAttribute("type", "text");
    this.$userNameLabel.setAttribute("for", "floatingInputValue");
    this.$changePasswordBtn.setAttribute("type", "button");
    this.$uploadAvatarInput.setAttribute("id", "uploadAvatar");
    this.$uploadAvatarInput.setAttribute("type", "file");
    this.$uploadAvatarLabel.setAttribute("for", "uploadAvatar");

    this.$userNameLabel.innerText = "T??n ng?????i d??ng";
    this.$describeLabel.innerText = "M?? t???";
    this.$changePasswordText.innerText = "M???t kh???u";
    this.$changePasswordBtn.innerText = "?????i m???t kh???u";

    this.$avatarEditIcon.appendChild(this.$uploadAvatarInput);
    this.$avatarEditIcon.appendChild(this.$uploadAvatarLabel);
    this.$avatarContainer.appendChild(this.$avatarImg);
    this.$avatarEditIconContainer.appendChild(this.$avatarEditIcon);
    this.$avatarContainer.appendChild(this.$avatarEditIconContainer);
    this.$bodyModalContainer.appendChild(this.$avatarContainer);
    this.$modalProgress.appendChild(this.$modalProgressBar);
    this.$bodyModalContainer.appendChild(this.$modalProgress);
    this.$bodyModalContainer.appendChild(this.$modalErrorMsg);
    this.$userNameContainer.appendChild(this.$userNameInput);
    this.$userNameContainer.appendChild(this.$userNameLabel);
    this.$bodyModalContainer.appendChild(this.$userNameContainer);
    this.$bodyModalContainer.appendChild(this.$userNameError);
    this.$describeContainer.appendChild(this.$describeInput);
    this.$describeContainer.appendChild(this.$describeLabel);
    this.$bodyModalContainer.appendChild(this.$describeContainer);
    this.$changePasswordContainer.appendChild(this.$changePasswordText);
    this.$changePasswordContainer.appendChild(this.$changePasswordBtn);
    this.$bodyModalContainer.appendChild(this.$changePasswordContainer);

    this.$describeInput.value = userInfor.description;
    this.$userNameInput.value = userInfor.displayName;
    if (!userInfor.photoURL) {
      this.$avatarImg.setAttribute("src", "components/imgs/account-icon.svg");
    } else {
      this.$avatarImg.setAttribute("src", userInfor.photoURL);
    }

    this.$changePasswordBtn.addEventListener(
      "click",
      this.showChangePasswordModal
    );
    this.$avatarEditIcon.addEventListener("change", this.handleEditAvatar);

    this.$modal.setHeader("Ch???nh s???a th??ng tin c?? nh??n");
    this.$modal.setOnConfirmClick("C???p nh???t", this.handleUpdateInfor);
    this.$modal.setBody(this.$bodyModalContainer);

    this.$modalSuccessMessage.innerHTML = "C???p nh???t t??i kho???n th??nh c??ng";
    this.$modalSuccess.setHeader("Th??ng b??o");
    this.$modalSuccess.setBody(this.$modalSuccessMessage);

    this.$container.appendChild(this.$modalSuccess.$container);
    this.$container.appendChild(this.$modal.$container);
    this.$container.appendChild(this.$modalChangePassword.$container);
  }

  showEditProfileModal = (listener) => {
    this.$modal.showModal(listener);
  };

  showChangePasswordModal = () => {
    this.$modalChangePassword.showChangePasswordModal(true);
    this.$modal.showModal(false);
  };

  handleEditAvatar = () => {
    const fileImg = this.$uploadAvatarInput.files;
    const ref = st.ref();
    const acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
    const metadata = {
      contentType: fileImg[0].type,
    };

    if (fileImg[0].type.length && !acceptFileTypes.test(fileImg[0].type)) {
      this.$modalErrorMsg.innerHTML = "???nh t???i l??n kh??ng ????ng ?????nh d???ng";
      commonJsRemoveClass(this.$modalErrorMsg, "d-none");
      return;
    } else {
      this.$modalErrorMsg.innerHTML = "";
      commonJsAddClass(this.$modalErrorMsg, "d-none");
    }

    if (fileImg[0].size > 5242880) {
      this.$modalErrorMsg.innerHTML = "???nh t???i l??n qu?? d???ng l?????ng 5M";
      commonJsRemoveClass(this.$modalErrorMsg, "d-none");
      return;
    } else {
      this.$modalErrorMsg.innerHTML = "";
      commonJsAddClass(this.$modalErrorMsg, "d-none");
    }

    const task = ref
      .child("images/" + Math.floor(new Date() / 1000.0) + fileImg[0].name)
      .put(fileImg[0], metadata);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        commonJsRemoveClass(this.$modalProgress, "d-none");
        this.$modalProgressBar.innerHTML = progress + "%";
        this.$modalProgressBar.style.width = progress + "%";
      },
      (error) => {},
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          commonJsAddClass(this.$modalProgress, "d-none");
          this.$avatarImg.setAttribute("src", downloadURL);
        });
      }
    );
  };

  handleUpdateInfor = () => {
    const avatar = this.$avatarImg.src;
    const userName = this.$userNameInput.value;
    const userDes = this.$describeInput.value;

    if (!userName) {
      this.$userNameError.innerText = "T??n hi???n th??? kh??ng ???????c ????? tr???ng";
      commonJsRemoveClass(this.$userNameError,"d-none");
    } else if(hasWhiteSpace(userName)) {
      this.$userNameError.innerText = "T??n hi???n th??? kh??ng ???????c c?? kho???ng tr???ng";
      commonJsRemoveClass(this.$userNameError,"d-none");
    } else {
      commonJsAddClass(this.$userNameError,"d-none");
      db.collection("users")
      .doc(this.$userId)
      .update({
        displayName: userName,
        description: userDes,
        photoURL: avatar,
      })
      .then(() => {
        this.showEditProfileModal(false);
        this.$modalSuccess.showModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };
}

export { EditProfile };
