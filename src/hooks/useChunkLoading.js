import { useState, useEffect, useCallback } from 'react';

export default function useChunkLoading() {
	const [visibleChunks, setVisibleChunks] = useState(['hero']);

	const chunkRef = useCallback((id) => {
		return (node) => {
			if (node && id !== 'hero') {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								setVisibleChunks((prev) => {
									if (!prev.includes(id)) {
										return [...prev, id];
									}
									return prev;
								});
							}
						});
					},
					{ rootMargin: '200px', threshold: 0 }
				);

				observer.observe(node);

				return () => {
					observer.disconnect();
				};
			}
		};
	}, []);

	useEffect(() => {
		return () => {
			setVisibleChunks(['hero']);
		};
	}, []);

	return { visibleChunks, chunkRef };
}
