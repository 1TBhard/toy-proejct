import Card from "./Card.js";
import lazyLoad from "../util/lazyLoad.js";
import { scrollFetch } from "../util/scrollFetch.js";

export default class SearchResult {
	constructor({ $target, data, cardClick, onScroll }) {
		this.data = data;

		this.cardClick = cardClick;
		this.onScroll = onScroll;

		this.cardGroupWrapper = document.createElement("div");
		this.cardGroupWrapper.className = "card-group-wrapper";

		$target.appendChild(this.cardGroupWrapper);

		this.render();
		lazyLoad();
		scrollFetch(this.onScroll);
	}

	updateData(data) {
		this.data = data;
		this.render();
		lazyLoad();
	}

	findCatById(id) {
		const result = this.data.find((cat) => cat.id == id);
		return result;
	}

	render() {
		if (!this.data) return;

		this.cardGroupWrapper.innerHTML = "";

		const cardGroup = document.createElement("div");
		cardGroup.className = "card-group";

		// Event Deligation을 위해서 cardContainer에 이벤트를 추가한다.
		cardGroup.addEventListener(
			"click",
			(e) => {
				// e.path로 되어 있는데 composedPath() 가 표준임
				const path = e.composedPath();
				const card = path.find((comp) => comp.className == "cat-card");

				if (card) {
					const id = card.dataset.id;
					const catInfo = this.findCatById(id);

					this.cardClick(catInfo);
				}
			},
			{ capture: true }
		);

		this.data.map((cat) => {
			new Card(cardGroup, cat);
		});

		this.cardGroupWrapper.appendChild(cardGroup);
	}
}
