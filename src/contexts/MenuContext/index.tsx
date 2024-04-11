"use client";

import { StateSetter } from "@/lib/types";
import { FC, PropsWithChildren, createContext, useState } from "react";

type MenuContextValue = {
	isMainMenuOpen: boolean;
	isInnerMenuOpen: boolean;
	setIsMainMenuOpen: StateSetter<boolean>;
	setIsInnerMenuOpen: StateSetter<boolean>;
	closeMainMenu: () => void;
	openMainMenu: () => void;
};

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const MenuContextProvider: FC<PropsWithChildren> = (props) => {
	const { children } = props;

	const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
	const [isInnerMenuOpen, setIsInnerMenuOpen] = useState(false);

	const closeMainMenu = () => {
		setIsMainMenuOpen(false);

		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) {
			meta.setAttribute("content", "dark");
		}

		document.body.classList.remove("overflow-hidden", "h-screen");
	};

	const openMainMenu = () => {
		setIsMainMenuOpen(true);

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
		isMainMenuOpen,
		setIsMainMenuOpen,
		isInnerMenuOpen,
		setIsInnerMenuOpen,
		closeMainMenu,
		openMainMenu,
	};

	return (
		<MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
	);
};

export { MenuContext, MenuContextProvider };
