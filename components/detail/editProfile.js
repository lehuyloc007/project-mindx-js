import {
  commonJsAddClass,
  commonJsCreateEl,
  commonJsRemoveClass,
} from "../shared/common.js";
import { ModalCommon } from "../shared/modal.js";
import { ChangePassword } from "./changePassword.js";

class EditProfile {
  $container = commonJsCreateEl("div");
  $modal = new ModalCommon();
  $modalChangePassword = new ChangePassword();
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
  $describeContainer = commonJsCreateEl("div");
  $describeInput = commonJsCreateEl("input");
  $describeLabel = commonJsCreateEl("label");
  $changePasswordContainer = commonJsCreateEl("div");
  $changePasswordText = commonJsCreateEl("div");
  $changePasswordBtn = commonJsCreateEl("button");
  $modalErrorMsg = commonJsCreateEl("div");
  $modalProgress = commonJsCreateEl("div");
  $modalProgressBar = commonJsCreateEl("div");
  $userEmail;

  constructor(userInfor) {
    console.log(userInfor);
    this.$userEmail = userInfor.email;
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

    this.$userNameInput.setAttribute("type", "text");
    this.$userNameLabel.setAttribute("for", "floatingInputValue");
    this.$changePasswordBtn.setAttribute("type", "button");
    this.$uploadAvatarInput.setAttribute("id", "uploadAvatar");
    this.$uploadAvatarInput.setAttribute("type", "file");
    this.$uploadAvatarLabel.setAttribute("for", "uploadAvatar");

    this.$userNameLabel.innerText = "Tên người dùng";
    this.$describeLabel.innerText = "Mô tả";
    this.$changePasswordText.innerText = "Mật khẩu";
    this.$changePasswordBtn.innerText = "Đổi mật khẩu";

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

    this.$modal.setHeader("Chỉnh sửa trang cá nhân");
    this.$modal.setOnConfirmClick("Cập nhật", this.handleUpdateInfor);
    this.$modal.setBody(this.$bodyModalContainer);

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
      this.$modalErrorMsg.innerHTML = "Ảnh tải lên không đúng định dạng";
      commonJsRemoveClass(this.$modalErrorMsg, "d-none");
      return;
    } else {
      this.$modalErrorMsg.innerHTML = "";
      commonJsAddClass(this.$modalErrorMsg, "d-none");
    }

    if (fileImg[0].size > 5242880) {
      this.$modalErrorMsg.innerHTML = "Ảnh tải lên quá dụng lượng 5M";
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

    console.log(this.$userEmail);
    db.collection("users")
      .doc(this.$userEmail)
      .update({
        displayName: userName,
        description: userDes,
        photoURL: avatar,
      })
      .then(() => {
        console.log("Document successfully updated!");
      });
    // firebase
    //   .database()
    //   .ref("users/" + this.$userEmail)
    //   .set(
    //     {
    //       displayName: userName,
    //       description: userDes,
    //       photoURL: avatar,
    //     },
    //     (error) => {
    //       if (error) {
    //         // The write failed...
    //       } else {
    //         // Data saved successfully!
    //       }
    //     }
    //   );
  };
}

export { EditProfile };
