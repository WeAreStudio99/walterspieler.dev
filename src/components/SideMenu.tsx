"use client";

import { ScrollArea } from "@/components/ScrollArea";
import { MenuContext } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Command, X } from "lucide-react";
import { FC, PropsWithChildren, useContext } from "react";

type Props = {
	isInner?: boolean;
} & PropsWithChildren;

const variants: Variants = {
	open: { x: "100%", opacity: 1 },
	closed: { x: "0%", opacity: 0 },
	exit: { x: "100%", opacity: 1 },
};

const iconVariants: Variants = {
	open: { opacity: 1 },
	closed: { opacity: 0 },
};

export const SideMenu: FC<Props> = ({ children, isInner }) => {
	const { isMenuOpen, openMenu, closeMenu } = useContext(MenuContext) ?? {};

	const scrollAreaClasses = cn(
		"bg-eerie-dark lg:flex lg:flex-col border-r border-grey z-40 justify-between",
		isInner ? "lg:w-72 xl:w-72" : "lg:w-60 xl:w-72 flex flex-col",
		!isMenuOpen && "hidden",
	);

	return (
		<>
			{!isMenuOpen && (
				<div className="absolute top-10 right-4 lg:hidden bg-metal/5 z-50 backdrop-blur rounded-lg p-2 border-grey border">
					<Command onClick={openMenu} size={24} />
				</div>
			)}

			{isMenuOpen && (
				<motion.div
					animate={isMenuOpen ? "open" : "closed"}
					className="absolute top-10 right-4 lg:hidden bg-metal/5 z-50 backdrop-blur rounded-lg p-2 border-grey border"
					exit="closed"
					initial="closed"
					transition={{
						type: "spring",
						stiffness: 200,
						damping: 40,
						delay: 0.5,
					}}
					variants={iconVariants}
				>
					<div>
						<X onClick={closeMenu} size={24} />
					</div>
				</motion.div>
			)}

			{!isInner && (
				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							animate={isMenuOpen ? "open" : "closed"}
							className="md:hidden fixed top-0 left-0 z-40 w-screen"
							exit="exit"
							initial="closed"
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 40,
							}}
							variants={variants}
						>
							<ScrollArea className={scrollAreaClasses}>{children}</ScrollArea>
						</motion.div>
					)}
				</AnimatePresence>
			)}

			<ScrollArea
				className={cn(scrollAreaClasses, isInner && "hidden md:block")}
			>
				{children}
			</ScrollArea>
		</>
	);
};
