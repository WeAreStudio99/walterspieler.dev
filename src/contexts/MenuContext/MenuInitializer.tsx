"use client";

import { FC, use, useEffect } from "react";

import { MenuContext } from "@/contexts/MenuContext";

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
  }, [isInnerMenuOpen, isMainMenuOpen, openMainMenu, setIsInnerMenuOpen]);

  return <></>;
};

export default MenuInitializer;
