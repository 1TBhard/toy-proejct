import * as Option from "./options";

const YEAR_PRICE_LIST = [
	{
		plan: "base",
		price: 420,
		term: "Yearly",
		description: "For most businesses that want to optimize web queries",
		options: [
			Option.ALL_LIMITED_LIKES,
			Option.CHAT_SUPPEORT,
			Option.OPTIMIZE_HASHTAGS,
		],
	},
	{
		plan: "popular",
		popular: true,
		price: 1050,
		term: "Yearly",
		description: "For most businesses that want to optimize web queries",
		options: [
			Option.ALL_LIMITED_LIKES,
			Option.OPTIMIZE_HASHTAGS,
			Option.OWN_ANALYTICS_PLATFORM,
			Option.CHAT_SUPPEORT,
		],
	},
	{
		plan: "enterprise",
		price: 2000,
		term: "Yearly",
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

export default YEAR_PRICE_LIST;
