import { motion } from 'framer-motion';
import { PixelatedText } from './ui';
import { useState } from 'react';

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const inventorySlot = {
	width: '64px',
	height: '64px',
	backgroundColor: '#8B8B8B', // Minecraft inventory slot color
	border: '2px solid #373737', // Minecraft inventory border color
	boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.25), inset -2px -2px 0 rgba(0,0,0,0.25)', // Inner shadow for 3D effect
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '2rem',
	margin: '2px', // Add small gap between slots
	position: 'relative', // For item count positioning
};

const itemCount = {
	position: 'absolute',
	bottom: '2px',
	right: '2px',
	fontSize: '0.8rem',
	color: 'white',
	textShadow: '1px 1px 0 #000', // Text outline for visibility
};

const tooltip = {
	position: 'absolute',
	bottom: '100%',
	left: '50%',
	transform: 'translateX(-50%)',
	backgroundColor: 'rgba(0, 0, 0, 0.8)',
	color: 'white',
	padding: '4px 8px',
	borderRadius: '4px',
	fontSize: '0.8rem',
	whiteSpace: 'nowrap',
	pointerEvents: 'none',
	opacity: 0,
	transition: 'opacity 0.3s',
};

const InventoryItem = ({ emoji, count, tooltipText }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<div style={inventorySlot} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
			{emoji}
			<span style={itemCount}>{count}</span>
			<div style={{ ...tooltip, opacity: showTooltip ? 1 : 0 }}>{tooltipText}</div>
		</div>
	);
};

export default function Hero() {
	return (
		<section className='min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8'>
			<div className='absolute inset-0 flex items-center justify-center opacity-20 text-6xl sm:text-9xl'>🌳🏔️🌊</div>
			<motion.div {...fadeInUp} className='text-center z-10'>
				<motion.div
					className='bg-gray-800 bg-opacity-70 p-6 rounded-lg border-4 border-gray-700'
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
				>
					<motion.h1
						className='text-4xl sm:text-6xl font-bold mb-4 text-white font-pixel'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
					>
						John Doe
					</motion.h1>
					<motion.h2
						className='text-2xl sm:text-3xl text-green-400 font-pixel'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
					>
						Interactive Designer & Developer
					</motion.h2>
					<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}>
						<PixelatedText className='text-xl sm:text-2xl text-yellow-300 mt-4'>Crafting Digital Experiences</PixelatedText>
					</motion.div>
					<motion.div
						className='flex justify-center mt-6'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
					>
						<InventoryItem emoji='💻' count='64' tooltipText='Press E or hold your finger down for a surprise' />
						<InventoryItem emoji='🎨' count='32' tooltipText='Pixel Perfect Designer' />
						<InventoryItem emoji='🚀' count='16' tooltipText="Made by Parsa's Studio" />
						<InventoryItem emoji='🔧' count='8' tooltipText='Try clicking the clock' />
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	);
}
