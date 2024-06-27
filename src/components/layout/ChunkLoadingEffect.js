import React from 'react';
import { motion } from 'framer-motion';

export default function ChunkLoadingEffect({ children, visibleChunks }) {
	return React.Children.map(children, (child) => {
		const id = child.props.id || '';
		return (
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: visibleChunks.includes(id) ? 1 : 0 }} transition={{ duration: 0.5 }}>
				{React.cloneElement(child, { ref: child.props.ref })}
			</motion.div>
		);
	});
}
