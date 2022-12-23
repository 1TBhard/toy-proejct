const GET_RAND_PERSON_API = "https://randomuser.me/api";

const fetctData = (url) => {
	return fetch(url)
		.then((res) => res.json())
		.then((result) => result)
		.catch((err) => new Error(err));
};

// deboucer 추가
// debouncer로 인해 연속 입력에도 마지막 입력 후 time 시간 지나고 콜백을 진행하게함
const makeDebounce = () => {
	let isGoing;
	return function debouncer(callback, time) {
		if (isGoing) {
			clearTimeout(isGoing);
		}

		isGoing = setTimeout(() => {
			callback(arguments);
		}, time);
	};
};

const myDebouncer = makeDebounce();

const Card = ({ name, picture, location }) => {
	const { first, last } = name;
	const { city, country } = location;
	const { thumbnail } = picture;

	return (
		<a className="card" href="#">
			<div className="card__item img-container">
				<img className="img-container__img" src={thumbnail} />
			</div>

			<div className="card__item description-container">
				<h3 className="description-container__name">{`${last} ${first}`}</h3>
				<p className="description-container__location">{`${city}, ${country}`}</p>
			</div>
		</a>
	);
};

const App = () => {
	// 로딩 중인지
	const [isLoading, setisLoading] = React.useState(true);

	// 처음 init 하는 데이터
	let [initData, setInitData] = React.useState([]);

	// 보여줄 freinds 데이터 목록
	const [friends, setFriends] = React.useState([]);

	// search input 의 검색어
	const [searchInput, setSearchInput] = React.useState("");

	// 처음 렌더링시 한번 진행됨
	React.useEffect(() => {
		(async () => {
			try {
				const data = await fetctData(`${GET_RAND_PERSON_API}/?results=${50}`);

				setInitData(data.results);
				setFriends(data.results);
				setisLoading(false);
			} catch (err) {
				console.error(new Error(err));
				setFriends([]);
			}
		})();
	}, []);

	// searchInput이 바뀔 때마다 진행됨
	React.useEffect(() => {
		myDebouncer(() => {
			setisLoading(true);

			if (searchInput === "") {
				setFriends(initData);
			} else {
				const filterResult = initData.filter((friend) => {
					// 정규식 사용, 글로벌하게 대소문자 구분 안한채로 매칭
					const regex = new RegExp(searchInput, "gi");
					const { first, last } = friend.name;
					const { city, country } = friend.location;

					return regex.test(`${first} ${last} ${city} ${country}`);
				});
				setFriends(filterResult);
			}

			setisLoading(false);
		}, 500);
	}, [searchInput]);

	return (
		<main>
			<section className="filter">
				<h2 className="filter__title">Live User Filter</h2>
				<p className="filter__sub-title">Search by name and / or location</p>
				<input
					className="filter__search--input"
					placeholder={`Search`}
					value={searchInput}
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
				/>
			</section>

			<section className="friends-container">
				{isLoading && (
					<div>
						<h2>Loading...</h2>
					</div>
				)}
				{!isLoading &&
					friends.map((friend, idx) => {
						const { name, picture, location } = friend;

						return (
							<Card
								key={idx}
								name={name}
								picture={picture}
								location={location}
							/>
						);
					})}
			</section>
		</main>
	);
};

ReactDOM.render(<App />, document.querySelector(".app"));
