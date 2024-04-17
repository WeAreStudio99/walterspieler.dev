"use client";

import { FC, use, useEffect } from "react";

import { MenuContext } from "@/contexts/MenuContext";

type Props = {
  isInnerMenuOpen?: boolean;
  isMainMenuOpen?: boolean;
};

const MenuInitializer: FC<Props> = (props) => {
  const { isInnerMenuOpen, isMainMenuOpen } = props;

  const { openMainMenu, openInnerMenu } = use(MenuContext) ?? {};

  useEffect(() => {
    if (!openMainMenu || !openInnerMenu) {
      return;
    }

    if (isInnerMenuOpen) {
      openInnerMenu();
    } else if (isMainMenuOpen) {
      openMainMenu();
    }
    // Only run on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default MenuInitializer;
