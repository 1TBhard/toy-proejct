
export default class 컴포넌트명 {
  // $target : 이 컴포넌트의 부모
	constructor({ $target }) {
    this.멤버변수 = 값;
    this.DOM_조작할_HTML_요소 = document.createElement(태그명);

    // react 처럼 render() 를 사용
		this.render();
	}

	멤버함수() {
		// ...
	}

	render() {
    // ...
	}
}
