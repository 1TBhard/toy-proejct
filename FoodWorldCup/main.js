const RANDOM_MEAL_API = "https://www.themealdb.com/api/json/v1/1/random.php";
const DETAIL_MEAL_BY_ID_API =
	"https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

// =================================== api ===================================
// api로 fetch 하여 데이터를 얻음
const request = (api) =>
	fetch(api)
		.then((res) => res.json())
		.then((data) => {
			return data;
		})
		.catch((err) => {
			// 이렇게 새로운 에러 객체를 만들어서 에러를 발생해야 디버깅시 에러 위치 찾기 쉬움
			throw new Error(err);
		});

// 랜덤으로 하나의 음식 데이터 얻기
const getRandomMeal = async () => {
	try {
		const { meals } = await request(RANDOM_MEAL_API);
		const { idMeal, strMeal, strMealThumb } = meals[0];

		return {
			id: idMeal, // 음식 id
			name: strMeal, // 음식 명
			preview: strMealThumb, // 썸네일 src
		};
	} catch (err) {
		console.error(err);
	}
};

// =================================== throttle ============================
// 이를 사용하여 하나의 동작만을 받게 함
const makeThrottle = () => {
	let throttleCheck = false;

	return function throttling(callback, milleSeconds) {
		if (!throttleCheck) {
			throttleCheck = true;

			callback(...arguments);
			setTimeout(() => {
				throttleCheck = false;
			}, milleSeconds);
		}
	};
};

const throttler = makeThrottle();

// ================================ 음식 카드 ================================
class FoodCard {
	constructor({ $target, handleClick, uniqueList = [] }) {
		this.wrapper = document.createElement("div");
		this.wrapper.className = "select-wrapper__card";

		this.data = {
			id: "",
			name: "",
			preview: "",
			win: 0,
		};

		// 현재까지 지면서 바뀌었던 음식 넣음
		// 중복을 검사하기 위해 선언함
		this.uniqueList = uniqueList;

		this.button = document.createElement("button");
		this.button.className = "food-btn";

		// 마우스 클릭시
		this.button.addEventListener("click", (e) => {
			throttler(() => {
				// 매개변수로 받은 handleClick 실행
				handleClick();
				this.data.win++;
				this.button.textContent = `win: ${this.data.win}`;
			}, 500);
		});

		$target.appendChild(this.wrapper);
		this.changeRandomMeal();
	}

	// target_id 가 uniqueList에 있는지 검사함
	// 중복을 검사
	// 반환값 true : 중복
	// 반환값 false : 미중복
	isInUniqueList(target_id) {
		return this.uniqueList.includes(target_id);
	}

	pushUniqueList(target_id) {
		// 같은 것 없으면 taget_id를 winList에 넣음
		if (!this.isInUniqueList(target_id)) {
			this.uniqueList.push(target_id);
		}
	}

	// 이 카드가 지는 경우 음식 정보가 새로 바뀌니
	// 중복을 위해 저장한 uniqueList를 바꿈
	initUniqueList(target_id) {
		this.uniqueList = [target_id];
	}

	// 가져온 음식 정보를 설정
	async changeRandomMeal() {
		let newData = await getRandomMeal();

		// uniqueList 와 중복안될때 까지 새 데이터(랜덤 음식) 가져옴
		while (this.isInUniqueList(newData.id)) {
			newData = await getRandomMeal();
		}

		this.data = { ...newData, win: 0 };

		this.render();
	}

	render() {
		this.wrapper.innerHTML = `
    <a href="#" title='${this.data.name}' data-id='${this.data.id}'>
      <img class="food-thumbnail" src=${this.data.preview}>
    </a>
    <h2 class="food-title">${this.data.name}</h2>
    `;

		// 버튼의 text 설정
		this.button.textContent = `win: ${this.data.win}`;
		// 마지막 버튼을 wrapper 에 붙이기
		this.wrapper.appendChild(this.button);
	}
}

// 좌측 음식 카드
const left = new FoodCard({
	$target: document.querySelector(".select-wrapper"),
	handleClick: (e) => {
		if (right.data.win > 0) {
			Table.addItem(right.data);
		}
		left.initUniqueList(left.data.id); // left에 있었던 uniqueList를 초기화
		right.pushUniqueList(right.data.id); // right의 data id 넣음
		right.changeRandomMeal(); // right에서 랜덤으로 음식 정보 가져옴
	},
});

// 우측 음식 카드
const right = new FoodCard({
	$target: document.querySelector(".select-wrapper"),
	handleClick: (e) => {
		if (left.data.win > 0) {
			Table.addItem(left.data);
		}
		right.initUniqueList(right.data.id);
		left.pushUniqueList(left.data.id);
		left.changeRandomMeal();
	},
	uniqueList: [left.data.id], // 이로 인해 right 선언시 좌측 음식과 중복 안됨
});

// ================================ 랭크 테이블 ================================
class RankingTable {
	constructor($target) {
		this.table = document.createElement("table");
		this.table.className = "ranking-table";

		this.table.innerHTML = `
    <tr class="ranking-table__header">
      <th class="table__item">Ranking</th>
      <th class="table__item">Image</th>
      <th class="table__item">Name</th>
      <th class="table__item">Point</th>
    </tr>`;

		$target.appendChild(this.table);
	}

	// 아이템 추가
	addItem({ id, preview, name, win = 0 }) {
		// 새로운 <tr>
		const new_tr = document.createElement("tr");

		new_tr.className = "ranking-table__row";
		new_tr.dataset.win = win;

		new_tr.innerHTML = `
    <td class="table__item column-rank"></td>
    <td class="table__item column-img" >
      <a href="#" data-id=${id}>
        <img class="table-img" src=${preview} alt=${name} data-modal=${right.data.id} />
      </a>
    </td>
    <td class="table__item column-name">${name}</td>
    <td class="table__item column-win">${win}</td>`;

		// win (점수)에 따라 테이블에 들어갈 위치 달라짐
		for (var node of [...this.table.querySelectorAll(".ranking-table__row")]) {
			if (win >= node.dataset.win) {
				node.insertAdjacentElement("beforebegin", new_tr);
				this.rankCalculate();
				return;
			}
		}

		this.table.appendChild(new_tr);
		this.rankCalculate();
	}

	// 랭크를 다시 계산
	rankCalculate() {
		let rank = 1;

		[...this.table.querySelectorAll(".column-rank")].forEach((node) => {
			// 1~3 위는 순위 항목을 메달 아이콘으로 나타냄
			if (rank <= 3) {
				node.innerHTML = `<i class="fas fa-medal medal"></i>`;
			} else node.textContent = rank;
			rank++;
		});
	}
}

const Table = new RankingTable(document.querySelector(".you-choices"));

// ================================ 모달 ================================

class ModalWrapper {
	constructor($target) {
		this.active = false;
		this.modalWrapper = document.createElement("div");
		this.modalWrapper.className = "modal-wrapper hidden";

		this.modalBackground = document.createElement("div");
		this.modalBackground.className = "modal-background";

		this.modalWrapper.appendChild(this.modalBackground);
		$target.appendChild(this.modalWrapper);
	}

	openModal(target_modal) {
		this.modalWrapper.appendChild(target_modal);

		// 해당 이벤트 한번만 실행됨
		this.modalBackground.addEventListener(
			"click",
			(e) => {
				this.modalWrapper.classList.add("hidden");
				this.modalWrapper.removeChild(target_modal);
				this.active = false;
			},
			"once"
		);

		this.modalWrapper.classList.remove("hidden");
		this.active = true;
	}
}

class Modal {
	constructor(id) {
		this.modal = document.createElement("div");

		// 데이터 가져고 렌더링
		this.getDataRender(id);
	}

	async getDataRender(id) {
		const { meals } = await request(DETAIL_MEAL_BY_ID_API + id);
		const {
			strMeal: name,
			strMealThumb: img,
			strCategory: category,
			strArea: country,
			strYoutube: vedioURL,
		} = meals[0];

		this.modal.className = "modal";
		this.modal.innerHTML = `<div class="modal__item modal__title bold">${name}</div>
    <div class="modal__item modal__img-wrapper">
      <img class="modal-img" src=${img} alt=${name} />
    </div>
    <div class="modal__item modal__category"><span class="bold">Main Ingredient</span>: ${category}</div>
    <div class="modal__item modal__country"><span class="bold">Country</span>: ${country}</div>
    <div class="modal__item modal__vedioURL"><a class="youtube-btn" href=${vedioURL} target="_blank" class="bold">Youtube</a></div>
    `;
	}
}

const myModalWrapper = new ModalWrapper(document.body);

// 이벤트 위임!!!
// 모든 a 태그중 data-id 있는 경우 data-id 값을 통해
// 모달을 띄움(모달은 data-id 값으로 음식의 상세 정보 가져옴)
document.querySelector("main").addEventListener("click", async (e) => {
	e.preventDefault();

	const callModalTags = [...e.composedPath()].filter(
		(node) => node.nodeName === "A" && node.dataset.id != undefined
	);

	if (callModalTags.length > 0) {
		const newModal = await new Modal(callModalTags[0].dataset.id);
		myModalWrapper.openModal(newModal.modal);
	}
});
