export default class DetailModal {
	constructor($target) {
		this.$modalWrapper = document.createElement("div");
		this.$modalWrapper.className = "modal-wrapper hidden";

		// 모달
		this.modal = document.createElement("div");
		this.modal.className = "modal-wrapper__modal";

		// 모달 배경
		const modalBackground = document.createElement("div");
		modalBackground.className = "modal-wrapper__background";
		// 모달 배경 누르면 모달 토글
		modalBackground.addEventListener("click", () => this.onClose());
		this.$modalWrapper.appendChild(modalBackground);

		this.state = {
			name: "",
			cfa_url: "",
			country_code: "",
			temperament: "",
			weight: "",
		};

		this.$modalWrapper.appendChild(this.modal);
		$target.appendChild(this.$modalWrapper);
	}

	// react의 setState() 와 같음
	setState(newData) {
		this.state = newData;
		this.repaintModal();
	}

	toggleModal() {
		const modalWapper = document.querySelector(".modal-wrapper");
		modalWapper.classList.toggle("hidden");
	}

	onClose() {
		this.toggleModal();
		this.data = null;
		this.modal.innerHTML = "";
	}

	repaintModal() {
		const { url } = this.state;

		// 모달 고양이 정보
		const { name, origin, temperament } = this.state.breeds[0]
			? this.state.breeds[0]
			: { name: "정보없음", origin: "정보없음", temperament: "정보없음" };
		const { imperial, metric } = this.state.breeds[0]
			? this.state.breeds[0]?.weight
			: { imperial: "정보없음", metric: "정보없음" };

		// 모달 이름
		const modal_name = document.createElement("div");
		modal_name.className = "modal__name";
		modal_name.textContent = name;

		// 클로즈 버튼
		const closeBtn = document.createElement("div");
		closeBtn.className = "btn";
		closeBtn.textContent = "X";
		closeBtn.addEventListener("click", () => this.onClose());

		// 모달 이름과 클로즈 버튼을 wrap
		const modal_header = document.createElement("div");
		modal_header.className = "modal__header";
		modal_header.appendChild(modal_name);
		modal_header.appendChild(closeBtn);

		// 모달 고양이 이미지
		const modal_img = document.createElement("img");
		modal_img.className = "modal__img";
		modal_img.src = url;

		// 모달 고양이 origin
		const modal_origin = document.createElement("p");
		modal_origin.className = "modal__origin";
		modal_origin.textContent = origin;

		// 모달 고양이 특징
		const modal_temperament = document.createElement("p");
		modal_temperament.className = "modal__temperament";
		modal_temperament.textContent = temperament;

		// 모달 고양이 무게
		const modal_weight = document.createElement("p");
		modal_weight.className = "modal__weight";
		modal_weight.textContent = `imperial: ${imperial} / metric: ${metric}`;

		this.modal.appendChild(modal_header);
		this.modal.appendChild(modal_img);
		this.modal.appendChild(modal_origin);
		this.modal.appendChild(modal_temperament);
		this.modal.appendChild(modal_weight);
	}
}
