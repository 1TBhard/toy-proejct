export default class SearchBar {
  constructor({ $target, onSearch, randomSearch }) {
    this.wrapper = document.createElement("div");
    this.wrapper.className = "wrapper";
    $target.appendChild(this.wrapper);

    this.onSearch = onSearch;
    this.randomSearch = randomSearch;
    this.keyWords = [];
    this.render();
  }

  addKeyword(word) {
    if (this.keyWords.includes(word)) return;

    // 키워드는 5개까지 저장
    if (this.keyWords.length >= 5) this.keyWords.shift();
    this.keyWords.push(word);

    this.render();
  }

  render() {
    this.wrapper.innerHTML = "";

    const logo = document.createElement("span");
    logo.className = "logo";
    logo.textContent = "😺";
    logo.addEventListener("click", (e) => {
      this.randomSearch();
    });

    const searchBox = document.createElement("input");
    searchBox.className = "search-box";
    searchBox.placeholder = "고양이를 검색하세요.";
    searchBox.autofocus = true;
    searchBox.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        const keyword = searchBox.value;
        this.onSearch(keyword);
        this.addKeyword(keyword);
      }
    });

    const keywordBox = document.createElement("div");
    keywordBox.className = "keyword-box";

    this.keyWords.map((keyword) => {
      const keyWordBoxItem = document.createElement("span");

      keyWordBoxItem.className = "keyword-box__item";
      keyWordBoxItem.textContent = keyword;
      keyWordBoxItem.addEventListener("click", () => {
        this.onSearch(keyword);
      });
      keywordBox.appendChild(keyWordBoxItem);
    });

    const searchWrapper = document.createElement("div");
    searchWrapper.className = "search-wrapper";
    searchWrapper.appendChild(searchBox);
    searchWrapper.appendChild(keywordBox);

    this.wrapper.appendChild(logo);
    this.wrapper.appendChild(searchWrapper);
  }
}
