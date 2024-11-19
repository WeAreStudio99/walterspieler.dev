"use client";

import { FC, use, useEffect } from "react";

import { motion, useAnimation } from "framer-motion";

import NavigationLink from "@/components/NavigationLink";
import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";

type Props = {
  items: { label: string; path: string; type: string; external?: boolean }[];
  lang: Locale;
};

const MainMenuItems: FC<Props> = (props) => {
  const { items, lang } = props;

  const { isMainMenuOpen: isMenuOpen } = use(MenuContext) ?? {};
  const controls = useAnimation();

  useEffect(() => {
    if (isMenuOpen) {
      controls.start((i) => ({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { delay: i * 0.1 + 1.1 },
      }));
    } else {
      controls.start({
        opacity: 0,
        scale: 0.3,
        filter: "blur(20px)",
      });
    }
  }, [controls, isMenuOpen]);

  return (
    <div className="flex h-full w-full flex-col justify-between p-4 text-sm">
      <nav className="flex h-full flex-col gap-3 pt-20 md:hidden md:pt-0">
        {items.map((item, i) => {
          return (
            <motion.div animate={controls} custom={i} key={item.label}>
              <NavigationLink
                external={item.external}
                label={item.label || ""}
                lang={lang}
                path={item.path}
                type={item.type}
              />
            </motion.div>
          );
        })}
      </nav>
      <nav className="hidden h-full flex-col gap-3 pt-20 md:flex md:pt-0">
        {items.map((item) => {
          return (
            <NavigationLink
              external={item.external}
              key={item.label}
              label={item.label || ""}
              lang={lang}
              path={item.path}
              type={item.type}
            />
          );
        })}
      </nav>
    </div>
  );
};

export default MainMenuItems;
