import Header from '../Header';
import { FloatingBlocks, ExperienceOrbs, EasterEggMobs, CustomCursor } from '../effects';

export default function Layout({ children }) {
	return (
		<div className='min-h-screen bg-gray-900 text-white font-pixel'>
			<FloatingBlocks />
			<ExperienceOrbs />
			<Header />
			<main>{children}</main>
			<EasterEggMobs />
			<CustomCursor />
		</div>
	);
}
