import React, { useState, createContext } from "react";
import Header from "./components/header";
import Card from "./components/card";
import { MONTH_PRICE_LIST, YEAR_PRICE_LIST } from "./constants";
import "./style/style.scss";

const UserNumContext = createContext();

const App = () => {
	const [term, setTerm] = useState("Month");
	const [usersNum, setUsersNum] = useState(20);
	const [minUser, maxUser] = [20, 100];
	const progressBarStep = 4;

	return (
		<UserNumContext.Provider
			value={{ usersNum, setUsersNum, minUser, maxUser, progressBarStep }}
		>
			<main>
				<Header {...{ term, setTerm }} />

				<div className="card-wrapper">
					{/* term이 Month 또는 Year 에 따라서 바뀌어짐 */}
					{(term === "Month" ? MONTH_PRICE_LIST : YEAR_PRICE_LIST).map(
						(item_props, idx) => {
							// multiply : 값 * 인원 식에에서 '인원'
							return (
								<Card
									{...item_props}
									multiply={Number((usersNum / minUser).toFixed(1))}
									key={`card-${item_props.term}-${idx}`}
								/>
							);
						}
					)}
				</div>
			</main>
		</UserNumContext.Provider>
	);
};

export { App, UserNumContext };
