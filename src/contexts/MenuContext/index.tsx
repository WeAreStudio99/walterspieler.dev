"use client";

import { StateSetter } from "@/lib/types";
import { FC, PropsWithChildren, createContext, useState } from "react";

type MenuContextValue = {
	isMenuOpen: boolean;
	setIsMenuOpen: StateSetter<boolean>;
	closeMenu: () => void;
	openMenu: () => void;
};

export const MenuContext = createContext<MenuContextValue | undefined>(
	undefined,
);

export const MenuContextProvider: FC<PropsWithChildren> = (props) => {
	const { children } = props;

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => {
		setIsMenuOpen(false);

		document.body.classList.remove("overflow-hidden", "h-screen");
	};

	const openMenu = () => {
		if (setIsMenuOpen === undefined) {
			return;
		}

		setIsMenuOpen(true);
		document.body.classList.add("overflow-hidden", "h-screen");
	};

	const contextValue: MenuContextValue = {
		isMenuOpen,
		setIsMenuOpen,
		closeMenu,
		openMenu,
	};

	return (
		<MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
	);
};
