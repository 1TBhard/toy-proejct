export const throttling = () => {
	// throttleCheck
	let throttleCheck;

	return {
		// milliSecond 후 callback 실행
		throttle(callback, milliSecond) {
			if (!throttleCheck) {
				throttleCheck = setTimeout(() => {
					callback(...arguments);
					throttleCheck = false;
				}, milliSecond);
			}
		},
	};
};
