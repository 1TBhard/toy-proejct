const STORAGE_KEY = "user-color-scheme";

export default class DarkMode {
	constructor($target) {
		this.activeDarkMode =
			localStorage.getItem(STORAGE_KEY) == undefined ? false : true;

		document.documentElement.setAttribute(
			"data-user-color-scheme",
			this.activeDarkMode ? "dark" : "light"
		);

		this.darkModeBtn = document.createElement("span");
		this.darkModeBtn.className = "dark-mode-btn";
		this.darkModeBtn.textContent = this.activeDarkMode ? "🌜" : "🌞";

		this.darkModeBtn.addEventListener("click", () => {
			this.toggleDarkMode();
		});

		$target.appendChild(this.darkModeBtn);
	}

	toggleDarkMode() {
		document.body.style.transition =
			"background 0.5s ease-in-out, color 0.3s ease-in";

		this.activeDarkMode = !this.activeDarkMode;
		this.darkModeBtn.textContent = this.activeDarkMode ? "🌜" : "🌞";

		if (this.activeDarkMode) {
			document.documentElement.setAttribute("data-user-color-scheme", "dark");
			localStorage.setItem(STORAGE_KEY, "dark");
		} else {
			document.documentElement.setAttribute("data-user-color-scheme", "light");
			localStorage.setItem(STORAGE_KEY, "light");
		}
	}
}
