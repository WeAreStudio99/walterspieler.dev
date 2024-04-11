"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC } from "react";

type Props = {
	label: string;
};

const variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
};

const textVariants = {
	initial: { opacity: 0, y: 25 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -50 },
};

const EmptyLayout: FC<Props> = (props) => {
	const { label } = props;

	return (
		<motion.div
			animate="animate"
			className={cn("hidden w-full h-full lg:flex justify-center items-center")}
			initial="initial"
			transition={{ duration: 0.5 }}
			variants={variants}
		>
			<motion.span
				animate="animate"
				className={cn(
					"text-3xl font-bold inline-flex animate-text-gradient bg-gradient-to-r from-stone-400 via-metal to-stone-400 bg-[200%_auto] text-center text-transparent bg-clip-text pl-72",
				)}
				exit="exit"
				initial="initial"
				transition={{ delay: 0.5, duration: 0.7 }}
				variants={textVariants}
			>
				{label}
			</motion.span>
		</motion.div>
	);
};

export default EmptyLayout;
