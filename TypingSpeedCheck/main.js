const sentenceWrapper = document.getElementById("sentence-wrapper");
const input = document.getElementById("input-buffer");
const progress = document.getElementById("progress");
const modalWrapper = document.getElementById("modal-wrapper");

let middleSaveProgress = 0;             // 지금까지 맞은 단어 수
let allSentenceNodes = [];              // sentenceWrapper 안의 모든 span 노드들

// 단어의 경계(lastChar)까지 알맞게 입력했는지 체크함
function check_Current_Input_End(lastChar) {
	// 마지막 입력이 lastChar 인지 확인
	if (allSentenceNodes[input.value.length - 1].textContent !== lastChar)
		return false;

	// 알맞게 입력 안된 곳 찾음
	for (var i = 0; i < input.value.length; i++) {
		if (allSentenceNodes[i].dataset.pressCorrect === "false") return false;
	}
	return true;
}

// 키 입력시
input.addEventListener("input", (e) => {
	switch (e.data) {
		// " "를 누른 경우
		case " ":
			if (check_Current_Input_End(" ")) {
				allSentenceNodes.splice(0, input.value.length);
				middleSaveProgress += input.value.length;
				input.value = "";
			}
			break;

		case ".":
			if (check_Current_Input_End(".")) {
				endTyping();
			}
			break;

		// 백스페이스시 현재까지 누를 글자중 맨 뒤의 문자를 아무것도 안누른 상태로 복귀
		case null:
			allSentenceNodes[input.value.length].dataset.pressCorrect = "";
			break;
	}

	let count = 0;

	input.value.split("").forEach((input_char, idx) => {
		if (input_char === allSentenceNodes[idx].textContent) {
			allSentenceNodes[idx].dataset.pressCorrect = "true";
			count++;
		} else {
			allSentenceNodes[idx].dataset.pressCorrect = "false";
		}
	});

	progress.value = count + middleSaveProgress;
});

// 문장의 문자들을 하나씩 span 으로 만듬
function sentenceToSpan(str) {
	return str.split("").map((c) => {
		const span = document.createElement("span");

		span.className = "character";
		span.dataset.pressCorrect = "";
		span.innerText = c;
		return span;
	});
}

// 새로운 문장 하나 가져옴
async function loadNewSentence() {
	const url =
		"https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1";

	const response = await fetch(url, {
		method: "GET",
		mode: "cors",
	});
	const data = (await response.json())[0];                  // 서버에서 가져온 문장
	allSentenceNodes = sentenceToSpan(data);                  // allSentenceNodes 최신화

	progress.max = data.length;                               // progress의 최대값 설정

	const newSetence = document.createElement("div");         // 새로운 span 들을 감쌀 새로운 문장
	newSetence.id = "sentence-wrapper";                       // id="sentence-wrapper"

	allSentenceNodes.forEach((node) => newSetence.appendChild(node));

	// insertAdjacentElement 사용!!
	document
		.getElementById("title")
		.insertAdjacentElement("afterend", newSetence);
}

// ============================= 타이머 관련 =============================

let myTimer = "";

function startTimer() {
	let second = 0;

	myTimer = setInterval(() => {
		document.getElementById("timer").innerText = `Time: ${++second}s`;
		document.getElementById("speed").innerText = `Time: ${
			Math.floor(progress.value / second * 60) 
		}/min`;
	}, 1000);
}

function stopTimer() {
	clearInterval(myTimer);
	myTimer = "";
}

// ============================= 타이핑 관련 =============================

// 타이핑 시작
function stratTyping() {
  progress.value = 0;                           // progress 값 초기화
  middleSaveProgress = 0;                       // 지금까지 맞은 단어 수 초기화
	input.disabled = false;
  input.focus();
  clearSentence();
	loadNewSentence();
	modalWrapper.classList.remove("active");

	// 키를 눌러야 타이머 시작, 한번만 호출됨
	input.addEventListener("keydown", startTimer, {once: true});
}

// 타이핑 끝
function endTyping() {
	stopTimer();
	input.value = "";
	input.disabled = true;
  modalWrapper.classList.add("active");

  // 모달에 타이핑 속도 결과 넣음
  modalWrapper.querySelector("#result-speed").innerText 
    = "Result: " + document.getElementById("speed").innerText.match(/\d+\/min/);
  
  document.getElementById("reload").innerText = "restart";
}

// 문장 전체 지우기
function clearSentence() {
  allSentenceNodes = [];
  document.getElementById("sentence-wrapper").remove();
}

document.getElementById("reload").addEventListener("click", () => {
  stratTyping()
});
