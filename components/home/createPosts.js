import { commonJsCreateEl, commonJsAddClass, commonJsRemoveClass } from "../shared/common.js";
import { ModalCommon } from "../shared/modal.js";

class CreatePosts {
    $container = commonJsCreateEl("div");
    $modal = new ModalCommon();
    $containerBodyCreatePosts = commonJsCreateEl("div");
    $modalBodyInfoUser = commonJsCreateEl("div");
    $modalBodyInfoUserImg = commonJsCreateEl("img");
    $modalBodyInfoUserName = commonJsCreateEl("div");
    $modalBodyPostsContent = commonJsCreateEl("div");
    $modalBodyPostsInput = commonJsCreateEl("div");
    $modalBodyPostsFooter = commonJsCreateEl("div");
    $modalBodyPostsFooterTitle = commonJsCreateEl("div");
    $modalBodyPostsFooterSmile = commonJsCreateEl("div");
    $modalBodyPostsFooterPicture = commonJsCreateEl("div");
    $modalBodyPostsFooterPictureInput = commonJsCreateEl("input");
    $modalBodyPostsFooterPictureLabel = commonJsCreateEl("label");
    $modalErrMessage = commonJsCreateEl("div");
    $modalProgress = commonJsCreateEl("div");
    $modalProgressBar = commonJsCreateEl("div");
    $modalListImages = commonJsCreateEl("div");
    $modalSuccess = new ModalCommon();
    $modalSuccessMessage = commonJsCreateEl("div");

    listImages = [];
    constructor() {
        commonJsAddClass(this.$modalBodyInfoUser, "rounded-3", "create-post-body-info-user", "d-flex", "align-items-center", "mt-3");
        commonJsAddClass(this.$modalBodyInfoUserImg, "rounded-circle");
        this.$modalBodyInfoUserImg.src = "../components/imgs/111.jpg";
        commonJsAddClass(this.$modalBodyInfoUserName, "ms-1", "h5", "me-auto");
        this.$modalBodyInfoUserName.innerHTML = "TonyAdams";

        this.$modalBodyInfoUser.appendChild(this.$modalBodyInfoUserImg);
        this.$modalBodyInfoUser.appendChild(this.$modalBodyInfoUserName);

        commonJsAddClass(this.$modalBodyPostsContent, "post-content", "mt-3", "text-secondary");
        this.$modalBodyPostsContent.setAttribute("placeholder", "Nội dung bài viết...");
        this.$modalBodyPostsInput.setAttribute("contenteditable", "true");
        this.$modalBodyPostsContent.appendChild(this.$modalBodyPostsInput);

        commonJsAddClass(this.$modalBodyPostsFooter, "border", "rounded", "mt-3", "px-2", "py-3", "d-flex", "align-items-center");
        this.$modalBodyPostsFooterTitle.innerHTML = "Thêm vào bài viết";
        commonJsAddClass(this.$modalBodyPostsFooterSmile, "icon-smile", "ms-auto");
        this.$modalBodyPostsFooterSmile.addEventListener("click", this.handleBtnEmoClick);
        commonJsAddClass(this.$modalBodyPostsFooterPicture, "icon-picture", "ms-3");
        this.$modalBodyPostsFooterPictureInput.id = "uploadImgPost";
        this.$modalBodyPostsFooterPictureInput.type = "file";
        this.$modalBodyPostsFooterPictureInput.setAttribute("multiple", "multiple")
        this.$modalBodyPostsFooterPictureLabel.setAttribute("for", "uploadImgPost");
        this.$modalBodyPostsFooterPicture.addEventListener("change", this.handelBtnUploadImg);
        this.$modalBodyPostsFooterPicture.appendChild(this.$modalBodyPostsFooterPictureLabel);
        this.$modalBodyPostsFooterPicture.appendChild(this.$modalBodyPostsFooterPictureInput);

        this.$modalBodyPostsFooter.appendChild(this.$modalBodyPostsFooterTitle);
        this.$modalBodyPostsFooter.appendChild(this.$modalBodyPostsFooterSmile);
        this.$modalBodyPostsFooter.appendChild(this.$modalBodyPostsFooterPicture);

        this.$containerBodyCreatePosts.appendChild(this.$modalBodyInfoUser);
        this.$containerBodyCreatePosts.appendChild(this.$modalBodyPostsContent);

        commonJsAddClass(this.$modalListImages, "post-content-list-images");
        this.$containerBodyCreatePosts.appendChild(this.$modalListImages);

        commonJsAddClass(this.$modalErrMessage, "alert", "alert-danger", "py-1", "mt-1", "d-none");
        this.$containerBodyCreatePosts.appendChild(this.$modalErrMessage);
        

        commonJsAddClass(this.$modalProgress, "progress", "mt-3", "d-none");
        commonJsAddClass(this.$modalProgressBar, "progress-bar");
        this.$modalProgress.appendChild(this.$modalProgressBar);
        this.$containerBodyCreatePosts.appendChild(this.$modalProgress);
        this.$containerBodyCreatePosts.appendChild(this.$modalBodyPostsFooter);
        

        this.$modal.setHeader("Tạo bài viết");
        this.$modal.setBody(this.$containerBodyCreatePosts);
        this.$modal.setOnConfirmClick("Đăng", () => {
            if (this.$modalBodyPostsInput.innerText.length > 0) {
                this.$modalErrMessage.innerHTML = "";
                commonJsAddClass(this.$modalErrMessage, "d-none");
                db.collection('posts').add({
                    email: firebase.auth().currentUser.email,
                    detail: this.$modalBodyPostsInput.innerHTML,
                    images: this.listImages,
                    like: [],
                    comment: [],
                    createAt: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    this.showModalCreatePost(false);
                    this.resetModalCreatePost();
                    this.$modalSuccess.showModal(true)
                })
            } else {
                this.$modalErrMessage.innerHTML = "Bạn chưa nhập nội dung bài viết";
                commonJsRemoveClass(this.$modalErrMessage, "d-none");
            }
        });

        commonJsAddClass(this.$modalSuccessMessage, "alert", "alert-success", "py-1", "mt-3");
        this.$modalSuccessMessage.innerHTML = "Tạo bài viết thành công";
        this.$modalSuccess.setHeader("Thông báo");
        this.$modalSuccess.setBody(this.$modalSuccessMessage);
        this.$container.appendChild(this.$modal.$container);
        this.$container.appendChild(this.$modalSuccess.$container);
    }
    resetModalCreatePost = () => {
        this.$modalBodyPostsInput.innerHTML = "";
        this.$modalListImages.innerHTML = "";
        this.listImages = [];
        this.$modalErrMessage.innerHTML = "";
        commonJsAddClass(this.$modalErrMessage, "d-none");
    }
    showModalCreatePost = (listener) => {
        this.$modal.showModal(listener);
        this.resetModalCreatePost();
    }
    handleBtnEmoClick = () => {
        const iconEmo = commonJsCreateEl("span");
        iconEmo.innerHTML = "😀";
        this.$modalBodyPostsInput.appendChild(iconEmo);
    }
    handelBtnUploadImg = () => {
        const fileImgs = this.$modalBodyPostsFooterPictureInput.files;
        const ref = st.ref(); 
        for (let i = 0; i < fileImgs.length; i++) {
            let locationImage = i + 1;
            let fileImg = fileImgs[i];
            const acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
            if (fileImg.type.length && !acceptFileTypes.test(fileImg.type)){
                this.$modalErrMessage.innerHTML = "Ảnh tải lên không đúng định dạng là ảnh số:" + locationImage + " Tên " + fileImg.name + "</br>";
                commonJsRemoveClass(this.$modalErrMessage, "d-none");
                return;
            }  else {
                this.$modalErrMessage.innerHTML = "";
                commonJsAddClass(this.$modalErrMessage, "d-none");
            }
            
            if (fileImg.size > 5242880) {
                this.$modalErrMessage.innerHTML = "Ảnh tải lên quá dụng lượng 5M là ảnh số:" + locationImage + " Tên " + fileImg.name + "</br>";
                commonJsRemoveClass(this.$modalErrMessage, "d-none");
                return;
            } else {
                this.$modalErrMessage.innerHTML = "";
                commonJsAddClass(this.$modalErrMessage, "d-none");
            }

            const metadata = {
                contentType: fileImg.type
            };
            const task = ref.child('images/' + Math.floor(new Date()/1000.0) + fileImg.name).put(fileImg, metadata);
            task.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                commonJsRemoveClass(this.$modalProgress, "d-none");
                this.$modalProgressBar.innerHTML = progress + "%";
                this.$modalProgressBar.style.width = progress + "%";
            },
            (error) => {

            },
            () => {
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    commonJsAddClass(this.$modalProgress, "d-none");
                    const imgPreview = commonJsCreateEl("img");
                    commonJsAddClass(imgPreview, "card-img-top");
                    imgPreview.src = downloadURL;
                    this.$modalListImages.appendChild(imgPreview);
                    this.listImages.push(downloadURL);
                });
            }
            );
        }
        

        
    }

}
export { CreatePosts }