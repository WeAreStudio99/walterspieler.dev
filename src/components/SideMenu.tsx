"use client";

import { ScrollArea } from "@/components/ScrollArea";
import { MenuContext } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";
import { Command, X } from "lucide-react";
import { FC, PropsWithChildren, useContext } from "react";

type Props = {
	isInner?: boolean;
} & PropsWithChildren;

export const SideMenu: FC<Props> = ({ children, isInner }) => {
	const { isMenuOpen, openMenu, closeMenu } = useContext(MenuContext) ?? {};

	return (
		<>
			{!isMenuOpen && (
				<div className="absolute top-10 right-4 lg:hidden bg-eerie-dark/30 z-50 backdrop-blur rounded p-2">
					<Command onClick={openMenu} size={24} />
				</div>
			)}
			{isMenuOpen && (
				<div className="absolute top-10 right-4 lg:hidden bg-eerie-dark/30 z-50 backdrop-blur rounded p-2">
					<X onClick={closeMenu} size={24} />
				</div>
			)}

			<ScrollArea
				className={cn(
					"bg-eerie-dark lg:flex lg:flex-col border-r border-grey z-40 justify-between",
					!isMenuOpen && "hidden",
					isInner ? "lg:w-72 xl:w-72" : "lg:w-60 xl:w-72",
				)}
			>
				{children}
			</ScrollArea>
		</>
	);
};
