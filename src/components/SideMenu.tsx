"use client";

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
				<div className="absolute top-6 right-6 md:hidden bg-eerie-dark/30 z-50 backdrop-blur rounded p-2">
					<Command onClick={openMenu} size={24} />
				</div>
			)}
			<div
				className={cn(
					"flex flex-col absolute w-screen z-30 justify-between h-screen md:relative bg-eerie-dark lg:flex",
					isInner
						? "hidden lg:w-80 xl:w-96 border-x border-grey"
						: "lg:w-60 xl:w-72",
					!isInner && !isMenuOpen && "hidden",
				)}
			>
				<div className="absolute top-6 right-6 md:hidden">
					<X onClick={closeMenu} size={24} />
				</div>
				{children}
			</div>
		</>
	);
};
