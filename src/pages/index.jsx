// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Resources from '../components/Resources';
import MinecraftButton from '../components/ui/MinecraftButton';
import { FloatingBlocks, ExperienceOrbs, EasterEggMobs, CustomCursor, FloatingSunMoon } from '../components/effects';
import { ChunkLoadingEffect } from '../components/layout';
import { LoadingScreen } from '../components/screens';
import useDayNightCycle from '../hooks/useDayNightCycle';
import useChunkLoading from '../hooks/useChunkLoading';

export default function Home() {
	const [showLoadingScreen, setShowLoadingScreen] = useState(true);
	const { time, daysPassed, bgColor, addMinutes } = useDayNightCycle();
	const { visibleChunks, chunkRef } = useChunkLoading();

	const formatTime = (time) => {
		const hours = time.hours % 12 || 12; // Convert to 12-hour format
		const ampm = time.hours >= 12 ? 'PM' : 'AM';
		return `${hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')} ${ampm}`;
	};

	const handleTimeClick = () => {
		const randomMinutes = Math.floor(Math.random() * (150 - 90 + 1)) + 90;
		addMinutes(randomMinutes);
	};

	useEffect(() => {
		const timer = setTimeout(() => setShowLoadingScreen(false), 700);
		return () => clearTimeout(timer);
	}, []);

	const seoData = {
		title: 'John Doe - Minecraft-Inspired Interactive Designer & Developer Portfolio',
		description:
			'Explore the innovative work of John Doe, a passionate interactive designer and developer creating immersive digital experiences with a unique Minecraft-inspired twist. Created by Parsa Khazaeepoul.',
		image: 'https://www.johndoe.com/minecraft-og-image.jpg',
	};

	return (
		<>
			<Head>
				<title>{seoData.title}</title>
				<meta name='description' content={seoData.description} />
				<meta property='og:title' content={seoData.title} />
				<meta property='og:description' content={seoData.description} />
				<meta property='og:image' content={seoData.image} />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={seoData.title} />
				<meta name='twitter:description' content={seoData.description} />
				<meta name='twitter:image' content={seoData.image} />
				{/* <link rel='icon' href='/favicon.ico' /> */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>" />
			</Head>

			<div style={{ backgroundColor: bgColor, transition: 'background-color 5s' }}>
				<div className={`min-h-screen text-white font-pixel ${time.hours >= 6 && time.hours < 18 ? 'bg-opacity-0' : 'bg-opacity-50 bg-gray-900'}`}>
					{showLoadingScreen ? (
						<LoadingScreen />
					) : (
						<>
							<FloatingSunMoon time={time} />
							<FloatingBlocks />
							<ExperienceOrbs time={time} />
							<Header />

							<main>
								<ChunkLoadingEffect visibleChunks={visibleChunks}>
									<section id='hero' ref={chunkRef('hero')}>
										<Hero />
									</section>
									<section id='about' ref={chunkRef('about')}>
										<About />
									</section>
									<section id='projects' ref={chunkRef('projects')}>
										<Projects />
									</section>
									<section id='skills' ref={chunkRef('skills')}>
										<Skills />
									</section>
									<section id='resources' ref={chunkRef('resources')}>
										<Resources />
									</section>
								</ChunkLoadingEffect>
							</main>

							<div className='fixed bottom-4 left-4 z-50 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'>
								<MinecraftButton onClick={handleTimeClick}>🕰️ {formatTime(time)}</MinecraftButton>
								<MinecraftButton>📅 Days: {daysPassed}</MinecraftButton>
							</div>

							<div className='fixed bottom-4 right-4 z-50 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'>
								<MinecraftButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⬆️ Top</MinecraftButton>
								<MinecraftButton href='https://parsas.studio/'>🧍 More</MinecraftButton>
							</div>

							<EasterEggMobs time={time} />
							<CustomCursor />
						</>
					)}
				</div>
			</div>
		</>
	);
}
