import { CommonJsCreateEl } from "./shared/common.js";

class Chat{
    $container = CommonJsCreateEl("div");
    $btnLogout = CommonJsCreateEl("button");

    constructor(){
        this.$container.innerHTML = "Chat";

        this.$btnLogout.innerHTML = "Log Out";
        this.$btnLogout.addEventListener("click", this.handleLogout);

        this.$container.appendChild(this.$btnLogout);

        

    }

    handleLogout = () => {
        firebase.auth().signOut();
    }
}

export {Chat};