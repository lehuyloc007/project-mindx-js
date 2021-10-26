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
    this.$keyword.innerText = "Minh Hiếu";

    this.$keywordContainer.appendChild(this.$title);
    this.$keywordContainer.appendChild(this.$keyword);
    this.$searchResultContainer.appendChild(this.$keywordContainer);
    this.$searchResultContainer.appendChild(this.$listResultContainer);
    this.$rowDiv.appendChild(this.$searchResultContainer);

    this.$container.appendChild(this.$rowDiv);
  }

  setKeyword = (keyword) => {
    console.log(keyword);
    db.collection("users")
      .where("displayName", "==", keyword)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.doc.data());
          const searchResultItem = new SearchResultItem(change.doc.data());
          this.$listResultContainer.appendChild(searchResultItem.$container);
        });
      });
  }
}

export { Search };
