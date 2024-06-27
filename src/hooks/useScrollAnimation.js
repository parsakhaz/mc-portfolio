import { useInView } from 'react-intersection-observer';

export default function useScrollAnimation() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return {
		ref,
		variants: {
			hidden: { opacity: 0, y: 50 },
			visible: { opacity: 1, y: 0 },
		},
		initial: 'hidden',
		animate: inView ? 'visible' : 'hidden',
		transition: { duration: 0.5 },
	};
}
