import { motion } from 'framer-motion';
import { MinecraftButton } from './ui';

export default function Header() {
	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: 'spring', stiffness: 200, damping: 20 }}
			className='fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 bg-gray-800 border-b-4 border-gray-900'
		>
			<nav className='flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto'>
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='text-4xl mb-4 sm:mb-0'>
					📦
				</motion.div>
				<ul className='flex flex-wrap justify-center space-x-2 sm:space-x-4'>
					{['About', 'Projects', 'Skills', 'Resources'].map((item) => (
						<li key={item} className='mb-2 sm:mb-0'>
							<MinecraftButton>
								<a href={`#${item.toLowerCase()}`} className='text-sm sm:text-base'>
									{item}
								</a>
							</MinecraftButton>
						</li>
					))}
				</ul>
			</nav>
		</motion.header>
	);
}
