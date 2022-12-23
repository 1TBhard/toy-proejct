const API_ENDPOINT = "https://api.thecatapi.com/v1";

const request = async (url) => {
	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const errorData = await response.json();
			return errorData;
		}
	} catch (e) {
		console.warn(e);
		throw result.json();
	}
};

const api = {
	fetchImages: async (keyword) => {
		try {
			// 키워드로 해당하는 breed 를 찾음
			const breeds = await request(
				`${API_ENDPOINT}/breeds/search?q=${keyword}`
			);

			if (breeds.length === 0) {
				throw `${keyword} search result is none...`;
			}

			// breed 에 따른 결과들 가져옴 [[cat_1 결과], [cat_2 결과], ...]
			const requests = breeds.map(async (breed) => {
				return await request(
					`${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`
				);
			});

			// request를 전부 resolved 한 결과 도출
			const response = await Promise.all(requests);
			const result = response.reduce((acc, cur) => acc.concat(cur), []);

			return {
				isError: false,
				data: result,
			};
		} catch (e) {
			return {
				isError: true,
				data: e,
			};
		}
	},

	fetchRandomImages: async () => {
		try {
			const result = await request(`${API_ENDPOINT}/images/search?limit=20`);
			return {
				isError: false,
				data: result,
			};
		} catch (e) {
			return {
				isError: true,
				data: e,
			};
		}
	},
};

export { api };
