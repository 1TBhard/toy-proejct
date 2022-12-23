export default class Error {
	constructor($target) {
		this.errorWrapper = document.createElement("div");
		this.errorWrapper.className = "error-wrapper";
		this.data = null;

		$target.appendChild(this.errorWrapper);
	}

	setState(newData) {
		this.data = newData;
		this.render();
	}

	render() {
		if (!this.data) return;

		this.errorWrapper.innerHTML = "";

		const errorImg = document.createElement("img");
		errorImg.className = "error-img";
		errorImg.src = "./src/img/squarecat.jpg";

		const errorMsg = document.createElement("h2");
		errorMsg.className = "error-msg";
		errorMsg.textContent = this.data;

		const returnBtn = document.createElement("button");
		returnBtn.className = "error-btn";
		returnBtn.textContent = "돌아가기";
		returnBtn.addEventListener("click", () => {
			location.reload();
		});

		this.errorWrapper.appendChild(errorImg);
		this.errorWrapper.appendChild(errorMsg);
		this.errorWrapper.appendChild(returnBtn);
	}
}
