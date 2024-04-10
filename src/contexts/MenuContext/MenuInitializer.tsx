"use client";

import { MenuContext } from "@/contexts/MenuContext";
import { FC, use, useEffect } from "react";

type Props = {
	isInnerMenuOpen?: boolean;
	isMainMenuOpen?: boolean;
};

const MenuInitializer: FC<Props> = (props) => {
	const { isInnerMenuOpen, isMainMenuOpen } = props;

	const { openMainMenu = () => {}, setIsInnerMenuOpen = () => {} } =
		use(MenuContext) ?? {};

	useEffect(() => {
		if (isInnerMenuOpen) {
			setIsInnerMenuOpen(true);
		} else if (isMainMenuOpen) {
			openMainMenu();
		}
	}, [isInnerMenuOpen, isMainMenuOpen]);

	return <></>;
};

export default MenuInitializer;
