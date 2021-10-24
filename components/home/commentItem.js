import { commonJsAddClass, commonJsCreateEl } from "../shared/common.js";

class CommentItem {
    $container = commonJsCreateEl("div");
    $txtUserComment = commonJsCreateEl("div");
    $txtContentComment = commonJsCreateEl("div");

    constructor(content,sender) {
        this.getUserInfo(sender);
        this.$txtContentComment.innerHTML = content;
        commonJsAddClass(this.$container, "d-flex", "align-items-start", "mt-2");
        commonJsAddClass(this.$txtUserComment, "h6", "me-1");
        this.$container.appendChild(this.$txtUserComment);
        this.$container.appendChild(this.$txtContentComment);
    }
    getUserInfo = (sender) => {
        db.collection("users")
        .where("email", "==", sender)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type == "added")
                console.log(change.doc.data().displayName)
                this.$txtUserComment.innerHTML = change.doc.data().displayName;
            });
        });
    }
}
export {CommentItem}