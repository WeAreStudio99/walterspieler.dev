"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// const variants = {
// 	hidden: { opacity: 0, x: -200, y: 0 },
// 	enter: { opacity: 1, x: 0, y: 0 },
// 	exit: { opacity: 0, x: 200, y: 0 },
// };

export default function Template({ children }: { children: ReactNode }) {
	return (
		<motion.main
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -100, opacity: 0 }}
			initial={{ y: 0, opacity: 0 }}
			transition={{ duration: 0.4 }}
		>
			{children}
		</motion.main>
	);
}
