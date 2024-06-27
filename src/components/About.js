import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function About() {
  const scrollAnimation = useScrollAnimation();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-brown-700 relative px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 text-6xl sm:text-9xl">🟫🟫🟫</div>
      <motion.div {...scrollAnimation} className="max-w-2xl text-center z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white font-pixel">About Me</h2>
        <p className="text-xl sm:text-3xl text-white font-pixel">
          I&apos;m a passionate designer and developer with a keen eye for detail and a love for creating immersive digital experiences. My work blends cutting-edge technology with
          intuitive design, bringing ideas to life through motion and interactivity.
        </p>
      </motion.div>
    </section>
  );
}