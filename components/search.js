import { commonJsAddClass, commonJsCreateEl } from "./shared/common.js";
import { Menu } from "./shared/menu.js";
import { SearchResultItem } from "./search/searchResultItem.js";

class Search {
  $container = commonJsCreateEl("div");
  $menuContainer = new Menu();
  $contentWrapper = commonJsCreateEl("div");
  $rowDiv = commonJsCreateEl("div");
  $searchResultContainer = commonJsCreateEl("div");
  $keywordContainer = commonJsCreateEl("div");
  $title = commonJsCreateEl("span");
  $keyword = commonJsCreateEl("span");
  $listResultContainer = commonJsCreateEl("div");
  $SearchResultItem = new SearchResultItem();

  constructor() {
    commonJsAddClass(
      this.$contentWrapper,
      "container",
      "mt-5",
      "pt-3",
      "text-dark"
    );
    commonJsAddClass(this.$rowDiv, "row");
    commonJsAddClass(
      this.$searchResultContainer,
      "col",
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
    this.$listResultContainer.appendChild(this.$SearchResultItem.$container);
    this.$searchResultContainer.appendChild(this.$listResultContainer);
    this.$rowDiv.appendChild(this.$searchResultContainer);
    this.$contentWrapper.appendChild(this.$rowDiv);

    this.$container.appendChild(this.$menuContainer.$container);
    this.$container.appendChild(this.$contentWrapper);
  }
}

export { Search };
