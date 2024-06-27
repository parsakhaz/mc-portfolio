import { motion } from 'framer-motion';

export default function MinecraftButton({ children, onClick, href, className = '' }) {
	const buttonProps = {
		className: `px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 text-white font-pixel border-2 border-b-4 border-gray-900 hover:bg-gray-600 transition-colors ${className}`,
		whileHover: { scale: 0.95 },
		whileTap: { scale: 0.9 },
	};

	if (href) {
		return (
			<motion.a href={href} target='_blank' rel='noopener noreferrer' {...buttonProps}>
				{children}
			</motion.a>
		);
	}

	return (
		<motion.button onClick={onClick} {...buttonProps}>
			{children}
		</motion.button>
	);
}
