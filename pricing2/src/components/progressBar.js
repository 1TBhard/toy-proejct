import React, { useContext } from "react";
import { UserNumContext } from "../App";

const ProgressBar = () => {
	const {
		usersNum,
		setUsersNum,
		minUser,
		maxUser,
		progressBarStep,
	} = useContext(UserNumContext);

	const myInput = React.createRef();

	return (
		<form className="input-form">
			<output ref={myInput} className="input-form__person-capacity">
				{usersNum} Users
			</output>
			<input
				className="input-form__input-range"
				type="range"
				max={maxUser}
				min={minUser}
				value={usersNum}
				step={Math.ceil((maxUser - minUser) / progressBarStep)}
				onChange={(e) => {
					// output 의 새 위치
					const newVal = Math.ceil(
						(Number(e.target.value - minUser) * 100) / (maxUser - minUser)
					);

					setUsersNum(Number(e.target.value));

					myInput.current.style.left = `calc(${newVal}% + (${
						12 - newVal * 0.25
					}px))`;

					// CSS의 :root 의 변수 바꿈
					document.documentElement.style.setProperty("--to", `${newVal}%`);
				}}
			/>
			<div className="input-step">
				{Array(progressBarStep - 1)
					.fill()
					.map((_, idx) => (
						<div className="break-point" key={`break-${idx}`}></div>
					))}
			</div>
		</form>
	);
};

export default ProgressBar;
