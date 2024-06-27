import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 text-xl sm:text-2xl hidden sm:block"
      style={{
        x: position.x - 12,
        y: position.y - 12,
      }}
    >
      ⛏️
    </motion.div>
  );
}