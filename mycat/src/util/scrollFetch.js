import { throttling } from "./throttle.js";

const throttler = throttling();

function scrollFetch(fetchData) {
	window.addEventListener("scroll", () => {
		// throttler 를 이용하여 과도한 이벤트 발생을 방지함
		throttler.throttle(() => {
			// window.innerHeight : 현재 브라우저에서 딱 보이는 스크린 높이(검색바 제외)
			if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;

			fetchData();
		}, 700);
	});
}

// 현재 스크롤 위치
function getScrollTop() {
	// 스크롤이 있는지 확인 후 없으면 루트 엘리먼트 혹은 body의 scrollTop을 반환
	return window.pageYOffset !== undefined
		? window.pageYOffset
		: (document.documentElement || document.body.parentElement || document.body)
				.scrollTop;
}

// 현재 document의 높이
function getDocumentHeight() {
	const body = document.body;
	const html = document.documentElement;

	return Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);
}

export { scrollFetch };
