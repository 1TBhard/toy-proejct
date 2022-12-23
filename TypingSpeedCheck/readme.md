# Check Typing Spped

<p align="center">
  <img src="./pic/TypingSpeedCheck.png" />
</p>

## 설명

키보드 속도를 체크하는 프로젝트

- `fetch()`를 사용하여 랜덤한 한 문장을 가져옴
- 타이핑이 맞고 틀린 경우 해당 글자의 배경색 변경(초록, 빨강)

**CodePen**: [https://codepen.io/1tbhard/pen/VwavVpV](https://codepen.io/1tbhard/pen/VwavVpV)

<br/>

## 이슈

### 1. `<input>` 이슈

`<input>`에 이벤트 등록을  `keydown`, `keyup` 으로 지정해서 하였는데  

- `keydown`: `<input>`의 `value`가 들어가기전 이벤트가 실행됨
- `keyup` : `<input>`의 `value`가 들어간후 이벤트 실행 그러나, 키를 계속 누르는 경우키를    땔때까지 이벤트 실행 안함
- `keypress` : shift, Ctrl, Alt 키를 못누름

해당 이슈는 `addEventListener("input", )` 으로 처리하였다.

- `input` : 입력되자 값이 `<input>`의 `value`에 바인딩 되고 이벤트 핸들러 실행

### 2. `data-*` 에 대해 잘못 이해

- `data-*="false"` 하는 것은 값이 `false` 가아닌 문자열 `"false"`로 매칭된다.

<br/>

## 새로 알게된 것

- `keydown`, `keyup` 이벤트 말고도 `input` 이벤트가 따로 있었다.

- [`insertAdjacentElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement) :  이를 이용하면 DOM의 특정 노드의 앞, 뒤 노드에 원하는 DOM 노드를 봍일 수 있다.

- `<progress>` : 진행 바를 위한 html 태그
