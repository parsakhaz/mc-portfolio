import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';

// Array of block emojis. Add or remove blocks here to change the variety.
const blocks = [
	'🟩',
	'🟩',
	'🟩',
	'🟩', // Grass blocks (more common)
	'⬜',
	'⬜',
	'⬜', // Stone blocks
	'🟫',
	'🟫',
	'🟫', // Dirt blocks
	'🧱',
	'🧱', // Brick blocks
	'🟦',
	'🟦', // Water blocks
	'⬛', // Coal block
	'🌳', // Leaves block
	'🍄', // Mushroom block
	'🔥', // Fire block (for Netherrack)
	'💎', // Diamond block
	'🟨', // Gold block
	'🟥', // Redstone block
	'🟪', // Obsidian block
	'❄️', // Snow block
];

export default function FloatingBlocks() {
	const [resetKey, setResetKey] = useState(0);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const { scrollY } = useScroll();
	const [pressStartTime, setPressStartTime] = useState(null);
	const [remainingTime, setRemainingTime] = useState(2);
	const [timerBlocks, setTimerBlocks] = useState([]);

	const handlePressStart = useCallback(() => {
		setPressStartTime(Date.now());
		setTimerBlocks(Array.from({ length: 2 }, () => Math.floor(Math.random() * blocks.length)));
	}, []);

	const handlePressEnd = useCallback(() => {
		setPressStartTime(null);
		setRemainingTime(2);
		setTimerBlocks([]);
	}, []);

	useEffect(() => {
		let intervalId;
		if (pressStartTime) {
			intervalId = setInterval(() => {
				const elapsedTime = (Date.now() - pressStartTime) / 1000;
				const remaining = Math.max(0, 2 - elapsedTime);
				setRemainingTime(remaining);
				if (remaining === 0) {
					setResetKey((prevKey) => prevKey + 1);
					setPressStartTime(null);
					setRemainingTime(2);
					setTimerBlocks([]);
				}
			}, 100);
		}
		return () => clearInterval(intervalId);
	}, [pressStartTime]);

	useEffect(() => {
		const handleMouseMove = (event) => {
			mouseX.set(event.clientX);
			mouseY.set(event.clientY);
		};

		const handleKeyPress = (event) => {
			if (event.key === 'e' || event.key === 'E') {
				setResetKey((prevKey) => prevKey + 1);
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mousedown', handlePressStart);
		window.addEventListener('mouseup', handlePressEnd);
		window.addEventListener('touchstart', handlePressStart);
		window.addEventListener('touchend', handlePressEnd);
		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mousedown', handlePressStart);
			window.removeEventListener('mouseup', handlePressEnd);
			window.removeEventListener('touchstart', handlePressStart);
			window.removeEventListener('touchend', handlePressEnd);
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [mouseX, mouseY, handlePressStart, handlePressEnd]);

	return (
		<div className='fixed inset-0 overflow-hidden pointer-events-none'>
			{blocks.map((block, index) => (
				<FloatingBlock
					key={`${index}-${resetKey}`}
					block={block}
					mouseX={mouseX}
					mouseY={mouseY}
					scrollY={scrollY}
					showTimer={timerBlocks.includes(index)}
					remainingTime={remainingTime}
				/>
			))}
		</div>
	);
}

function FloatingBlock({ block, mouseX, mouseY, scrollY, showTimer, remainingTime }) {
	const x = useMotionValue(Math.random() * window.innerWidth);
	const y = useMotionValue(Math.random() * window.innerHeight);

	const mouseInfluenceX = useTransform(mouseX, (value) => (value - window.innerWidth / 2) * 0.005);
	const mouseInfluenceY = useTransform(mouseY, (value) => (value - window.innerHeight / 2) * 0.005);

	const scale = useTransform(scrollY, [0, 100], [1, 1.05], { clamp: false });

	return (
		<motion.div
			className='absolute text-4xl'
			style={{
				x: x,
				y: y,
				opacity: 0.1,
				scale: scale,
			}}
			animate={{
				x: [x.get(), Math.random() * window.innerWidth],
				y: [y.get(), Math.random() * window.innerHeight],
				rotate: 360,
			}}
			transition={{
				duration: 40 + Math.random() * 20,
				repeat: Infinity,
				repeatType: 'reverse',
				ease: 'linear',
			}}
		>
			<motion.div
				style={{
					x: mouseInfluenceX,
					y: mouseInfluenceY,
				}}
			>
				{block}
				{showTimer && remainingTime < 3 && (
					<div className='absolute top-0 left-0 text-lg font-bold text-white bg-black bg-opacity-75 px-2 py-1 rounded shadow-lg'>{remainingTime.toFixed(1)}s</div>
				)}
			</motion.div>
		</motion.div>
	);
}
