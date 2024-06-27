import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mobs = [
	{ name: 'Creeper', emoji: '🧨', sound: 'Ssss...' },
	{ name: 'Zombie', emoji: '🧟', sound: 'Brains...' },
	{ name: 'Skeleton', emoji: '💀', sound: 'Rattle rattle...' },
];

export default function EasterEggMobs({ time }) {
	const [visibleMob, setVisibleMob] = useState(null);
	const [lastShownDay, setLastShownDay] = useState(-1);

	useEffect(() => {
		const currentDay = Math.floor(time.hours / 24);
		const currentMinute = time.hours * 60 + time.minutes;

		if (currentDay !== lastShownDay) {
			const showTime = Math.floor(Math.random() * 1440); // Random minute in the day

			if (currentMinute === showTime) {
				const randomMob = mobs[Math.floor(Math.random() * mobs.length)];
				setVisibleMob(randomMob);
				setLastShownDay(currentDay);

				setTimeout(() => {
					setVisibleMob(null);
				}, 3000 / 72); // 3 Minecraft seconds (about 41.67 real-world milliseconds)
			}
		}
	}, [time, lastShownDay]);

	if (!visibleMob) return null;

	return (
		<AnimatePresence>
			<motion.div
				key={visibleMob.name}
				className='fixed text-2xl sm:text-3xl md:text-4xl cursor-pointer z-40'
				style={{
					top: `${Math.random() * 80 + 10}%`,
					left: `${Math.random() * 80 + 10}%`,
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1 / 72 }} // Adjusted for Minecraft time
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => console.log(visibleMob.sound)} // Replace with actual sound playing logic
			>
				{visibleMob.emoji}
			</motion.div>
		</AnimatePresence>
	);
}
