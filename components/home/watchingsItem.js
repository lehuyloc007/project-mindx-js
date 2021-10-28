import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";

class WatchingItem {
    $container = commonJsCreateEl("div");
    $itemImages = commonJsCreateEl("img");
    $itemName = commonJsCreateEl("div");
    $ItemRemove = commonJsCreateEl("div");

    email;
    constructor(item, id) {
        this.email = item.email;
        this.idCurentUser = id;
        commonJsAddClass(this.$container, "bg-white", "p-3", "rounded-3", "d-flex", "align-items-center", "mt-3");
        commonJsAddClass(this.$itemImages, "rounded-circle");
        this.$itemImages.src = item.photoURL;
        commonJsAddClass(this.$itemName, "ms-1", "h5", "me-auto");
        this.$itemName.innerHTML = item.displayName;
        commonJsAddClass(this.$ItemRemove, "icon-del-friend", "cursor-pointer");
        this.$container.appendChild(this.$itemImages);
        this.$container.appendChild(this.$itemName);
        this.$container.appendChild(this.$ItemRemove);

    }
    handelOnClickRemoveWatching = (listener) => {
        this.$ItemRemove.onclick = () => {
            listener(this.email);
        };
    }
    handelRemoveWatching = () => {
        this.$container.innerHTML = "";
    }

}
export { WatchingItem }