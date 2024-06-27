import ReactMarkdown from 'react-markdown';

const resourcesContent = `
# Crafting Resources

## Tools of the Trade
- 🪓 **Diamond Axe**: For efficient coding
- 🔨 **Golden Hammer**: Bug-squashing made easy
- 🧪 **Potion of Debugging**: Reveals hidden errors

## Learning Materials
- 📘 **Book of JavaScript**: Master the arcane arts of JS
- 📗 **Tome of React**: Harness the power of components
- 📙 **Scroll of CSS**: Style your creations with flair

## Power-Ups
- ⚡ **Redstone Dust**: Boost your productivity
- 🍎 **Golden Apple**: Restore energy during long coding sessions
- 🔮 **Ender Pearl**: Quickly navigate through complex codebases
`;

export default function Resources() {
	return (
		<section id='resources' className='min-h-screen py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
			<h2 className='text-3xl sm:text-4xl font-bold mb-8 text-center text-white font-pixel' style={{ textShadow: '2px 2px #000000' }}>
				Resources
			</h2>
			<div className='max-w-2xl mx-auto bg-gray-800 p-4 sm:p-6 rounded-lg border-4 border-gray-700'>
				<ReactMarkdown
					components={{
						h1: ({ node, ...props }) => <h1 className='text-2xl sm:text-3xl font-bold mb-4 text-yellow-300 font-pixel' {...props} />,
						h2: ({ node, ...props }) => <h2 className='text-xl sm:text-2xl font-bold mt-6 mb-2 text-green-300 font-pixel' {...props} />,
						ul: ({ node, ...props }) => <ul className='list-disc list-inside mb-4' {...props} />,
						li: ({ node, ...props }) => <li className='text-sm sm:text-base text-white font-pixel mb-2' {...props} />,
					}}
				>
					{resourcesContent}
				</ReactMarkdown>
			</div>
		</section>
	);
}
