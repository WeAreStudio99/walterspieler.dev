"use client";

import { StateSetter } from "@/lib/types";
import { FC, PropsWithChildren, createContext, useState } from "react";

type MenuContextValue = {
	isMenuOpen: boolean;
	isInnerMenuOpen: boolean;
	setIsMenuOpen: StateSetter<boolean>;
	setIsInnerMenuOpen: StateSetter<boolean>;
	closeMenu: () => void;
	openMenu: () => void;
};

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const MenuContextProvider: FC<PropsWithChildren> = (props) => {
	const { children } = props;

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isInnerMenuOpen, setIsInnerMenuOpen] = useState(true);

	const closeMenu = () => {
		setIsMenuOpen(false);

		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) {
			meta.setAttribute("content", "dark");
		}

		document.body.classList.remove("overflow-hidden", "h-screen");
	};

	const openMenu = () => {
		setIsMenuOpen(true);

		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) {
			meta.setAttribute("content", "#16181b");
		} else {
			const newMeta = document.createElement("meta");
			newMeta.name = "theme-color";
			newMeta.content = "#16181b";
			document.head.appendChild(newMeta);
		}

		document.body.classList.add("overflow-hidden", "h-screen");
	};

	const contextValue: MenuContextValue = {
		isMenuOpen,
		setIsMenuOpen,
		isInnerMenuOpen,
		setIsInnerMenuOpen,
		closeMenu,
		openMenu,
	};

	return (
		<MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
	);
};

export { MenuContext, MenuContextProvider };
