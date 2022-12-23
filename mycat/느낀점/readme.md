# 느낀점 정리

## SearchResult.js

마우스 클릭 이벤트로 전파하는 것이 신기함..

이를 사용하여 성능 개선함

본인은 `{cpature: true}`로 하향식 전파를함

`e.path` 로 해당 element를 찾는 게 신기 했음

`e.path`로 되어 있는데 `composedPath()` 가 표준

## lazyLoad.js

**Intersection Observer** 해서 구현

이에 **card**를 `img.src=""` 를 하고 진짜 `src`를 `data-src`에 넣음

## scrollFetch.js

- `document.documentElement`
  - 루트 엘리먼트를 가져옴
  - 읽기 전용

- 나머지 `element.속성` 은 아래 그림 참고

  <br/>

  <p align="center">
    <img src="./pic/widthHeight.PNG" />
  </p>

  - **client** : `border`, `padding`, `margin` 포함 안함
  - **offset** : `border`, `padding` 포함한 크기
  - **scroll** : 보이지 않은 부분까지 포함

  <br/>

  > 사진 출처: https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively

---

<br/>

# 다크모드

## :root

`:root` 은 document의 **루트 엘리먼트**를 가리킨다.

- 전역 CSS 변수를 설정할 수 있다.
  - `--`을 시작하는 변수명을 가진다.
  - `:root` 에 변수를 선언해야 모든 엘리먼트에서 이를 접근할 수 있다.
  - `var(--변수명)`으로 사용된다.

<br/>

## documentElement

`document.documentElement` 읽기 전용 속성으로 루트 요소를 나타내는 엘리먼트를 반환

이를 이용하여 darkMode 인지 아닌지를 설정할 수 있었음

- **예시**

  ```js
  if (this.activeDarkMode) {
      document.documentElement.setAttribute("data-user-color-scheme", "dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      document.documentElement.setAttribute("data-user-color-scheme", "light");
      localStorage.setItem(STORAGE_KEY, "light");
    }
  }
  ```

<br/>

## getComputedStyle()

`Window.getComputedStyle(DomElement)`

- 속성 값을 얻는 메서드
- 반환되는 속성값은 요소의 스타일이 변경될 때 자동으로 업데이트 되는 실시간 **CSSStyleDeclaration 객체**

  > [**CSSStyleDeclaration 객체**](https://www.w3schools.com/JSREF/obj_cssstyledeclaration.asp) : CSS 속성-값을 모은 객체이다.

<br/>

- **예시**

  ```js
  const p = document.querySelector("p");
  const p_style = window.getComputedStyle
  ```

<br/>

## getPropertyPriority()

`style.getPropertyPriority()`

- **예시**

  ```js
  var declaration = document.styleSheets[0].cssRules[0].style;
  var isImportant = declaration.getPropertyPriority('margin') === 'important';
  ```

<br/>

## 기타 CSS 요소

- `@media (prefers-color-scheme: dark)`
  - 이 미디어 쿼리는 시스템이 _라이트 테마_ 나 _다크 테마_ 를 사용하는지 탐지한다.
  - 다크모드를 원하는 사람들에게 미리 설정된 테마를 제공함으로서 **접근성**을 높인다.

- `:not(X)`
  - **가상 클래스**이며 인수와 일치하는 요소가 없는 것을 선택할 때 쓰인다.

  ```css
  /* classy 클래스 없는 p를 선택 */
  p:not(.classy) { color: red; }

  /* body 의 자손들중 p가 아닌 것 선택 */
  body :not(p) { color: green; }
  ```
