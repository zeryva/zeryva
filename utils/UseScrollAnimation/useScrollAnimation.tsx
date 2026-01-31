import { useEffect, useRef, useState } from "react";

const useScrollAnimation = (threshold = 0.3) => {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const currentElement = ref.current;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (currentElement) {
						observer.unobserve(currentElement);
					}
				}
			},
			{ threshold }
		);

		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				observer.disconnect();
			}
		};
	}, [threshold]);

	return [ref, isVisible];
};

export default useScrollAnimation;
