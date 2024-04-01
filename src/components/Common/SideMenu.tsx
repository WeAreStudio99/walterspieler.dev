"use client";

import { MenuContext } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { FC, PropsWithChildren, useContext } from "react";

import ScrollArea from "@/components/Common/ScrollArea";
import { Command, X } from "lucide-react";

type Props = {
	isInner?: boolean;
} & PropsWithChildren;

const innerMenuVariants: Variants = {
	closed: { x: "-100%", opacity: 1 },
	animate: { x: "0%", opacity: 1 },
};

const iconVariants: Variants = {
	open: {
		scale: 1,
		opacity: 1,
	},
	closed: {
		scale: 0.3,
		opacity: 0,
	},
};

const SideMenu: FC<Props> = ({ children, isInner }) => {
	const { isMenuOpen, openMenu, closeMenu } = useContext(MenuContext) ?? {};

	const scrollAreaClasses = cn(
		" lg:flex lg:flex-col border-r border-grey z-50 justify-between",
		"dot-grid",
		{
			"lg:w-72 xl:w-72": isInner,
			"lg:w-60 xl:w-72": !isInner,
			hidden: !isMenuOpen,
		},
	);

	return (
		<>
			{!isMenuOpen ? (
				<div className="absolute top-8 right-4 lg:hidden bg-metal/5 z-50 backdrop-blur rounded-lg p-2 border-grey border">
					<motion.div
						animate={isMenuOpen ? "open" : "closed"}
						initial="closed"
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 17,
							duration: 0.5,
						}}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					>
						<Command onClick={openMenu} size={24} />
					</motion.div>
				</div>
			) : (
				<div className="absolute top-8 right-4 lg:hidden bg-metal/80 z-50 backdrop-blur rounded-lg p-2 border-grey border">
					<motion.div
						animate={isMenuOpen ? "open" : "closed"}
						initial="closed"
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 17,
							duration: 0.8,
						}}
						variants={iconVariants}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					>
						<X onClick={closeMenu} size={24} />
					</motion.div>
				</div>
			)}
			{isInner ? (
				<motion.div
					animate="animate"
					className="hidden md:block fixed z-10 bg-eerie-dark"
					initial="closed"
					transition={{
						duration: 0.5,
					}}
					variants={innerMenuVariants}
				>
					<ScrollArea className={scrollAreaClasses}>{children}</ScrollArea>
				</motion.div>
			) : (
				<>
					<AnimatePresence>
						{isMenuOpen && (
							<>
								<motion.div
									animate={{ opacity: 1 }}
									className="fixed z-40 w-screen md:hidden bg-eerie-dark/80 backdrop-blur-3xl"
									exit={{ opacity: 0 }}
									initial={{ opacity: 0 }}
									transition={{
										ease: [0.93, -0.01, 0.17, 1],
										duration: 0.6,
									}}
								>
									<ScrollArea className={cn(scrollAreaClasses)}>
										{children}
									</ScrollArea>
								</motion.div>
							</>
						)}
					</AnimatePresence>
					<ScrollArea
						className={cn(scrollAreaClasses, "hidden md:block bg-eerie-dark")}
					>
						{children}
					</ScrollArea>
				</>
			)}
		</>
	);
};

export default SideMenu;
