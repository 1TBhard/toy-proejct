export default function lazyLoad() {
	const lazyImages = [...document.querySelectorAll("img.lazy")];

	// 브라우저가 IntersectionObserver 을 지원하는지 확인
	if ("IntersectionObserver" in window) {
		let lazyImageObserver = new IntersectionObserver((entries) => {
			// entries 는 관찰 객체 중에서 보인 객체를 뜻함

			entries.forEach((entry) => {
				// entry가 사용자에게 보인 경우
				if (entry.isIntersecting) {
					// class="lazy" 인 이미지
					let lazyImage = entry.target;

					// 진짜 src로 적용
					lazyImage.src = lazyImage.dataset.src;
					lazyImage.classList.remove("lazy");
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});

		// lazy img 을 관찰함
		lazyImages.forEach(function (lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});
	}
}
