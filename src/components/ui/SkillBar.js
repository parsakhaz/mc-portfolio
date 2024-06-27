import { motion } from 'framer-motion';

export default function SkillBar({ skill, level, emoji }) {
	return (
		<div className='mb-4 sm:mb-6'>
			<div className='flex items-center mb-2'>
				<span className='mr-2 sm:mr-3 text-xl sm:text-2xl md:text-3xl' style={{ textShadow: '2px 2px #000000' }}>
					{emoji}
				</span>
				<span className='text-white font-pixel text-sm sm:text-base md:text-xl' style={{ textShadow: '2px 2px #000000' }}>
					{skill}
				</span>
			</div>
			<div
				className='h-6 sm:h-8 md:h-10 bg-gray-700 border-2 sm:border-4 border-gray-900 overflow-hidden relative'
				style={{ boxShadow: 'inset -1px -1px 0 1px rgba(0,0,0,0.3), inset 1px 1px 0 1px rgba(255,255,255,0.2)' }}
			>
				<motion.div
					className='h-full bg-emerald-500'
					initial={{ width: 0 }}
					whileInView={{ width: `${level}%` }}
					transition={{ duration: 1, ease: 'easeInOut' }}
					style={{
						boxShadow: 'inset -1px -1px 0 1px rgba(0,0,0,0.3), inset 1px 1px 0 1px rgba(255,255,255,0.2)',
						backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
						backgroundSize: '6px 6px',
					}}
				/>
			</div>
		</div>
	);
}
