const getItem = (key) => {
	const value = sessionStorage.getItem(key);

	// data 에는 지금까지 검색한 고양이 카드의 정보가 들어감
	if (key === "data") return value === null ? null : JSON.parse(value);
	// 지금까지 검색한 키워드 목록(고양이 breed가 있는 배열)
	else return value === null ? [] : JSON.parse(value);
};

const setItem = (key, itemArr) => {
	// key, itemArr 없는 경우 종료
	if (key === undefined || itemArr === undefined) return;

	const toJson = JSON.stringify(itemArr);

	sessionStorage.setItem(key, toJson);
};

export { getItem, setItem };
