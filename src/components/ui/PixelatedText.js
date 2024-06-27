export default function PixelatedText({ children, className }) {
	return (
		<div className={`font-pixel ${className}`} style={{ imageRendering: 'pixelated' }}>
			{children}
		</div>
	);
}

// components/screens/LoadingScreen.js
import { motion } from 'framer-motion';

export function LoadingScreen() {
	return (
		<div className='fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50'>
			<motion.div className='text-4xl sm:text-5xl md:text-6xl' animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
				🧱
			</motion.div>
			<p className='text-white font-pixel mt-4 text-sm sm:text-base md:text-lg'>Loading Minecraft Portfolio...</p>
		</div>
	);
}
