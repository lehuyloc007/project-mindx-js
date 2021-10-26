import { commonJsCreateEl, commonJsAddClass } from "../shared/common.js";
import { WatchingItem } from "./watchingsItem.js";

class WatchingsList {
    $container = commonJsCreateEl("div");
    $titleWatchings = commonJsCreateEl("div");
    $listWatchings = commonJsCreateEl("div");

    itemWatchings = [];
    lstWatchings = null
    constructor() {

        commonJsAddClass(this.$titleWatchings, "h6", "text-secondary", "border-bottom", "text-center" ,"pb-1");
        this.$titleWatchings.innerHTML = "Đang theo dõi";
        commonJsAddClass(this.$container, "list-friend");
        this.$container.appendChild(this.$titleWatchings);
        this.$container.appendChild(this.$listWatchings);

    }
    addItemWatchings = (watchings, id) => {
        this.lstWatchings = watchings;
        watchings.forEach(el => {
            db.collection("users")
            .where("email", "==", el)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if(change.type == "added"){
                        const item = new WatchingItem(change.doc.data());
                        item.handelOnClickRemoveWatching((email) => {
                            this.handelClickRemoveWatchings(email, id);
                        })
                        this.$listWatchings.appendChild(item.$container);
                        this.itemWatchings.push(item);
                    }
                });
            });
        });
    }
    handelClickRemoveWatchings = (email, id) => {
        const indexEl = this.lstWatchings.indexOf(email)
        if (indexEl > -1) {
            this.lstWatchings.splice(indexEl,1)
            db.collection("users").doc(id).update({
                watchings: this.lstWatchings,
            })
            .then(() => {
                this.itemWatchings.forEach(item => {
                    if(item.email == email){
                        item.handelRemoveWatching()
                    }
                });
            })

        }
    }
    clearw = () => {
        this.$container.innerHTML = "";
    }
}
export { WatchingsList }