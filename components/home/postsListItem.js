import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";
import { CommentItem } from "./commentItem.js";
import { PostsCarousel } from "./postsCarousel.js";

class PostsListItem {
    $container = commonJsCreateEl("div");
    $cardHeader = commonJsCreateEl("div");
    $imagesUserPost = commonJsCreateEl("img");
    $nameUserPost = commonJsCreateEl("div");
    $cardBody = commonJsCreateEl("div");
    $contentPosts = commonJsCreateEl("div");
    $likeCount = commonJsCreateEl("div");
    $likeCountIcon = commonJsCreateEl("span");
    $likeCountNumber = commonJsCreateEl("span");

    $listComment = commonJsCreateEl("div");
    $inputCommentContainer = commonJsCreateEl("form");
    $inputComment = commonJsCreateEl("input");
    $buttonComment = commonJsCreateEl("button");

  


    
    activeIdPosts = null;
    constructor(dataItemPosts, postsId) {
        
        //card header
        
        commonJsAddClass(this.$container, "card", "post-new", "mb-3");
        commonJsAddClass(this.$cardHeader, "card-header", "bg-white", "d-flex", "align-items-center", "border-bottom-0");
        commonJsAddClass(this.$imagesUserPost, "rounded-circle");
        
        commonJsAddClass(this.$nameUserPost, "ms-1", "h6");
        this.$cardHeader.appendChild(this.$imagesUserPost);
        this.$cardHeader.appendChild(this.$nameUserPost);

        //card body
        commonJsAddClass(this.$cardBody, "card-body", "py-0", "fs-09");
        commonJsAddClass(this.$contentPosts, "card-text");

        this.$container.appendChild(this.$cardHeader);
        this.$contentPosts.innerHTML= dataItemPosts.detail;
        this.$cardBody.appendChild(this.$contentPosts);
        const carouselPost = new PostsCarousel(dataItemPosts.images); 
        this.$cardBody.appendChild(carouselPost.$container);

        commonJsAddClass(this.$likeCount, "d-flex", "align-items-center", "like-count", "mt-2");
        commonJsAddClass(this.$likeCountNumber, "ms-1", "h6");
        this.$likeCountNumber.innerHTML = dataItemPosts.like.length + " lượt thích";
        this.$likeCount.appendChild(this.$likeCountIcon);
        this.$likeCount.appendChild(this.$likeCountNumber);
        this.$cardBody.appendChild(this.$likeCount);

        this.getCommentPosts(postsId);
        commonJsAddClass(this.$listComment, "list-comment");
        this.$cardBody.appendChild(this.$listComment)
        
        commonJsAddClass(this.$inputCommentContainer, "action-comment", "py-2", "mt-3", "border-top", "input-group");
        commonJsAddClass(this.$inputComment, "form-control", "border-0");
        this.$inputComment.placeholder = "Thêm bình luận ...";
        this.$inputComment.type = "text";
        commonJsAddClass(this.$buttonComment, "input-group-text", "bg-white", "border-0", "text-primary", "h6");
        this.$buttonComment.innerHTML = "Đăng";
        this.$inputCommentContainer.appendChild(this.$inputComment);
        this.$inputCommentContainer.appendChild(this.$buttonComment);
        this.$inputCommentContainer.addEventListener("submit", this.handelComment);
        this.$cardBody.appendChild(this.$inputCommentContainer);


        this.$container.appendChild(this.$cardHeader);
        this.$container.appendChild(this.$cardBody);
        this.getInfoUserPosts(dataItemPosts)
        
    }
    setIdPosts = (idPosts) => {
        this.activeIdPosts = idPosts;
    }
    getInfoUserPosts = (dataUserPosts) => {
        db.collection("users")
        .where("email", "==", dataUserPosts.email)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added")
                this.$imagesUserPost.src = change.doc.data().photoURL;
                this.$nameUserPost.innerHTML = change.doc.data().displayName;
            });
        });
    }
    getCommentPosts = (postsId) => { db.collection("comments")
        .where("postsId", "==", postsId)
        .orderBy('createAt')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added"){
                    console.log(change.doc.data().email)
                    const $commentItem = new CommentItem(change.doc.data().detail, change.doc.data().email);
                    this.$listComment.appendChild($commentItem.$container);
                }
            });
        });
    }
    handelComment = (event) => {
        event.preventDefault();
        if (!this.$inputComment.value || !firebase.auth().currentUser.email) return 
        db.collection('comments').add({
            email: firebase.auth().currentUser.email,
            postsId: this.activeIdPosts,
            detail: this.$inputComment.value,
            createAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            this.$inputComment.value = "";
        })
        
    }
    
}
export { PostsListItem }