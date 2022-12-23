import React from "react";
import ProgressBar from "./progressBar";

const Header = ({ term, setTerm }) => {
	const $selectCircle = React.createRef();

	return (
		<div className="header">
			<div className="header__item title-wrapper">
				<h1 className="title-wrapper__title">Simple, transparent pricing</h1>
				<p className="title-wrapper__sub-title">
					No contracts. No surpise fees.
				</p>
			</div>

			<div className="header__item term-wrapper">
				<div className="term">
					<span
						onClick={() => {
							if (term === "Month") return;
							setTerm("Month");
							$selectCircle.current.style.left = "0";
						}}
						className={`term--month${term === "Month" ? " selected" : ""}`}
					>
						Monthly
					</span>
					<span
						onClick={() => {
							if (term === "Year") return;
							setTerm("Year");
							$selectCircle.current.style.left = "50%";
						}}
						className={`term--year${term === "Year" ? " selected" : ""}`}
					>
						Yearly
					</span>
					<span className="term--select-circle" ref={$selectCircle}></span>
				</div>
			</div>
			<ProgressBar />
		</div>
	);
};

export default Header;
