export default class Card {
	constructor($target, data) {
		this.data = data;

		this.card = document.createElement("article");
		this.card.className = "cat-card";
		this.card.dataset.id = data.id;

		$target.appendChild(this.card);

		this.render();
	}

	render() {
		const url = this.data.url;
		const { origin, name } =
			this.data.breeds.length > 0
				? this.data.breeds[0]
				: { origin: "정보없음", name: "정보없음" };

		const cardImg = document.createElement("img");
		cardImg.className = "card-img lazy";
		cardImg.src = "";

		// lazyload를 위해 src=url 을 data 속성으로 옮김
		cardImg.dataset.src = url;

		// Descript wrapper
		const cardDescription = document.createElement("div");
		cardDescription.className = "card-description";

		// 고양이 명
		const cardName = document.createElement("p");
		cardName.className = "card-name";
		cardName.innerText = name;

		// 고양이 원산지?
		const cardOrigin = document.createElement("p");
		cardOrigin.className = "card-origin";
		cardOrigin.innerText = origin;

		cardDescription.appendChild(cardName);
		cardDescription.appendChild(cardOrigin);

		this.card.appendChild(cardImg);
		this.card.appendChild(cardDescription);
	}
}
