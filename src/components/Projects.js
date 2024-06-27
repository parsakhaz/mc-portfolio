import { motion } from 'framer-motion';
import { ProjectBlock } from './ui';

const projects = [
	{
		title: 'Nether Portal VR',
		description:
			'A mind-bending VR experience that transports you to the Nether realm. Explore the fiery landscape, dodge ghasts, and collect rare resources in this immersive Minecraft-inspired virtual reality adventure.',
		emoji: '🌋',
	},
	{
		title: 'Enchanted Crafting Table',
		description:
			'An AI-powered tool that suggests optimal crafting recipes. This smart assistant analyzes your inventory and goals to provide the most efficient crafting strategies, helping you level up your Minecraft game.',
		emoji: '📘',
	},
	{
		title: 'Redstone Data Visualizer',
		description:
			'Turn complex data into interactive Redstone contraptions. This innovative tool transforms your datasets into functioning Minecraft mechanisms, bringing your data to life in a whole new way.',
		emoji: '🔴',
	},
	{
		title: 'Ender Dragon Flight Simulator',
		description:
			"Experience the thrill of being Minecraft's most formidable boss. This flight simulator lets you soar through the End, breathe fire, and face off against players in epic battles.",
		emoji: '🐉',
	},
	{
		title: 'Minecraft Biome Generator',
		description: 'Create custom Minecraft biomes with ease. This powerful tool allows you to design unique landscapes, complete with custom flora, fauna, and terrain features.',
		emoji: '🌳',
	},
	{
		title: 'Pixel Art Mod Maker',
		description:
			'Design your own Minecraft textures and see them come to life. This mod creation tool simplifies the process of making custom textures, allowing you to personalize your Minecraft experience.',
		emoji: '🎨',
	},
];

export default function Projects() {
	return (
		<section id='projects' className='min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8'>
			<h2 className='text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-white font-pixel'>Featured Builds</h2>
			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto'>
				{projects.map((project, index) => (
					<motion.div
						key={project.title}
						className='w-full flex justify-center'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
					>
						<div className='w-full sm:w-auto p-3 sm:p-4'>
							<ProjectBlock {...project} />
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
