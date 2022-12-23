import React from "react";
import * as ALL_OPTIONS_LIST from "../constants/options";
import { FaCheckCircle } from "react-icons/fa";

const Card = ({
	popular,
	plan,
	price,
	term,
	description,
	options,
	multiply,
}) => {
	return (
		<div className={`card${popular ? " popular" : ""}`}>
			<div className="card__item">
				<h3 className="plan">{plan}</h3>
				<div className="price-wrapper">
					<span className="price">${price * multiply}</span> / {term}
				</div>
				<p className="description">{description}</p>
			</div>

			<div className="card__item">
				<ul className="options">
					{Object.entries(ALL_OPTIONS_LIST).map(([key, descrition], idx) => {
						const isHave = "options__item--" + options.includes(descrition);

						return (
							<li
								className={`options__item ${isHave}`}
								key={`${plan}-${idx}-option`}
							>
								<FaCheckCircle />
								<p className="options__item__description">{descrition}</p>
							</li>
						);
					})}
				</ul>
			</div>

			<div className="card__item">
				<button className="choose-plan-btn">Choose Plan</button>
			</div>
		</div>
	);
};

export default Card;
