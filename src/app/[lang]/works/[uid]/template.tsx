"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
	return (
		<motion.main
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -10, opacity: 0 }}
			initial={{ x: -300, opacity: 0 }}
			layout
			transition={{ duration: 0.4, ease: "easeInOut" }}
		>
			{children}
		</motion.main>
	);
}
