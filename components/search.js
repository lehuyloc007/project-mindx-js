import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { SearchResultItem } from "./search/searchResultItem.js";

class Search {
  $container = commonJsCreateEl("div");
  $rowDiv = commonJsCreateEl("div");
  $searchResultContainer = commonJsCreateEl("div");
  $keywordContainer = commonJsCreateEl("div");
  $title = commonJsCreateEl("span");
  $keyword = commonJsCreateEl("span");
  $listResultContainer = commonJsCreateEl("div");

  currentUserInfo = null;
  currentUserId = null;
  constructor() {
    commonJsAddClass(
      this.$container,
      "container",
      "mt-5",
      "pt-3",
      "text-dark"
    );
    commonJsAddClass(this.$rowDiv, "row");
    commonJsAddClass(
      this.$searchResultContainer,
      "col-12",
      "col-md-6",
      "offset-md-1"
    );
    commonJsAddClass(this.$keywordContainer, "h4", "text-secondary");
    commonJsAddClass(this.$keyword, "text-dark");
    commonJsAddClass(this.$listResultContainer, "list-search");

    this.$title.innerText = "Kết quả tìm kiếm: ";

    this.$keywordContainer.appendChild(this.$title);
    this.$keywordContainer.appendChild(this.$keyword);
    this.$searchResultContainer.appendChild(this.$keywordContainer);
    this.$searchResultContainer.appendChild(this.$listResultContainer);
    this.$rowDiv.appendChild(this.$searchResultContainer);
    this.$container.appendChild(this.$rowDiv);
  }
  setCurrentUserInfo = (user, idUser) => {
    this.currentUserInfo = user;
    this.currentUserId = idUser;
  }
  setKeyword = (keyword) => {
    this.$keyword.innerText = keyword;
  }
  setDisplayResult = (dataResult) => {
    const searchResultItem = new SearchResultItem(dataResult);
    const indexEl = this.currentUserInfo.watchings.indexOf(dataResult.email);
    if (indexEl == -1) {
      searchResultItem.setActiveBtnWatchings();
      searchResultItem.setCurrentUserInfo(this.currentUserInfo, this.currentUserId)
    }
    this.$listResultContainer.appendChild(searchResultItem.$container);
  }
  setDisplayResultRemove = () => {
    this.$listResultContainer.innerHTML = "";
  }
}

export { Search };
