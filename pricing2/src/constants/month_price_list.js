import * as Option from "./options";

const MONTH_PRICE_LIST = [
	{
		plan: "intro",
		price: 19,
		term: "Month",
		description: "For most businesses that want to optimize web queries",
		options: [Option.ALL_LIMITED_LIKES, Option.OWN_ANALYTICS_PLATFORM],
	},
	{
		plan: "base",
		price: 39,
		term: "Month",
		description: "For most businesses that want to optimize web queries",
		options: [Option.ALL_LIMITED_LIKES, Option.OPTIMIZE_HASHTAGS],
	},
	{
		plan: "popular",
		popular: true,
		price: 99,
		term: "Month",
		description: "For most businesses that want to optimize web queries",
		options: [Option.ALL_LIMITED_LIKES, Option.OPTIMIZE_HASHTAGS],
	},
	{
		plan: "enterprise",
		price: 199,
		term: "Month",
		description: "For most businesses that want to optimize web queries",
		options: [
			Option.ALL_LIMITED_LIKES,
			Option.OWN_ANALYTICS_PLATFORM,
			Option.CHAT_SUPPEORT,
			Option.OPTIMIZE_HASHTAGS,
			Option.UNLIMITED_USERS,
		],
	},
];

export default MONTH_PRICE_LIST;
