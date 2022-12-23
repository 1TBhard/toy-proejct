const $remeberCheckBox = document.getElementById("rember-me");
const $emailInput = document.getElementById("email");
const $loginBtn = document.getElementById("login");

const REMEMBER_ID = localStorage.getItem("remember-id");

$remeberCheckBox.textContent = REMEMBER_ID !== undefined ? REMEMBER_ID : "";

$remeberCheckBox.addEventListener("change", (e) => {
	if ($remeberCheckBox.checked) {
		localStorage.setItem("remember-id", $emailInput.value);
	} else {
		localStorage.removeItem("remember-id");
	}
});

$loginBtn.addEventListener("click", (e) => {
	e.defaultPrevented;

	if ($remeberCheckBox.checked)
		localStorage.setItem("remember-id", $emailInput.value);
});
