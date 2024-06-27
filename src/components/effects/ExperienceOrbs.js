import React, { useEffect, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

// You can modify these emoji arrays to change the available emojis for day and night
const dayEmojis = ['✨', '💎', '🌟', '☀️', '🌈'];
const nightEmojis = ['🌙', '⭐', '🌠', '🌛', '🌜'];

// Adjust these values to change the speed and area of movement
const VELOCITY_FACTOR = 0.3; // Lower value = slower movement
const MOVEMENT_RADIUS = 150; // Half of the 300px area

const getRandomVelocity = () => ({
	x: (Math.random() - 0.5) * VELOCITY_FACTOR,
	y: (Math.random() - 0.5) * VELOCITY_FACTOR,
});

export default function ExperienceOrbs({ time }) {
	const [orbs, setOrbs] = useState([]);
	const isDaytime = time.hours >= 6 && time.hours < 18;

	const createOrb = useCallback(
		(x, y) => ({
			emoji: (isDaytime ? dayEmojis : nightEmojis)[Math.floor(Math.random() * 5)],
			size: Math.random() * 1.5 + 0.5,
			x,
			y,
			velocity: getRandomVelocity(),
			originalX: x,
			originalY: y,
			rotation: Math.random() * 360,
		}),
		[isDaytime]
	);

	useEffect(() => {
		if (orbs.length === 0) {
			// Initial creation of orbs
			const newOrbs = Array.from({ length: 15 }, () =>
				createOrb(Math.random() * (window.innerWidth - 2 * MOVEMENT_RADIUS) + MOVEMENT_RADIUS, Math.random() * (window.innerHeight - 2 * MOVEMENT_RADIUS) + MOVEMENT_RADIUS)
			);
			setOrbs(newOrbs);
		} else {
			// Update emojis when transitioning between day and night
			setOrbs((prevOrbs) =>
				prevOrbs.map((orb) => ({
					...orb,
					emoji: (isDaytime ? dayEmojis : nightEmojis)[Math.floor(Math.random() * 5)],
				}))
			);
		}
	}, [isDaytime, createOrb, orbs.length]);

	return (
		<div className='absolute inset-0 pointer-events-none overflow-hidden'>
			{orbs.map((orb, index) => (
				<OrbAnimation key={index} orb={orb} isDaytime={isDaytime} />
			))}
		</div>
	);
}

function OrbAnimation({ orb, isDaytime }) {
	const controls = useAnimation();

	useEffect(() => {
		let x = orb.x;
		let y = orb.y;
		let vx = orb.velocity.x;
		let vy = orb.velocity.y;
		let rotation = orb.rotation;

		const animate = () => {
			x += vx;
			y += vy;
			rotation += 0.1; // Adjust rotation speed here

			// Check boundaries and reverse velocity if needed
			if (Math.abs(x - orb.originalX) > MOVEMENT_RADIUS) vx = -vx;
			if (Math.abs(y - orb.originalY) > MOVEMENT_RADIUS) vy = -vy;

			controls.set({ x, y, rotate: rotation });
			requestAnimationFrame(animate);
		};

		animate();
	}, [orb, controls]);

	return (
		<motion.div
			className={`absolute ${isDaytime ? 'text-yellow-400' : 'text-blue-400'}`}
			style={{
				fontSize: `${orb.size}rem`,
				textShadow: `0 0 5px ${isDaytime ? '#FFA500' : '#4169E1'}`,
			}}
			animate={controls}
			transition={{ type: 'tween', duration: 0 }}
		>
			{orb.emoji}
		</motion.div>
	);
}
