"use client";

import { FC, use, useEffect } from "react";

import { motion, useAnimation } from "framer-motion";
import { TypedLocale } from "payload";

import NavigationLink from "@/components/NavigationLink";
import { MenuContext } from "@/contexts/MenuContext";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { MainMenu } from "@payload-types";

type Props = {
  items: MainMenu["menuItems"];
  lang: TypedLocale;
};

const getPath = (slug: string, lang: TypedLocale) => {
  if (slug === "home") {
    return "/";
  }

  return I18N_CONFIG.defaultLocale === lang
    ? `/${slug || ""}`
    : `/${lang}/${slug || ""}`;
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
        filter: "blur-sm(0px)",
        transition: { delay: i * 0.1 + 1.1 },
      }));
    } else {
      controls.start({
        opacity: 0,
        scale: 0.3,
        filter: "blur-sm(20px)",
      });
    }
  }, [controls, isMenuOpen]);

  if (!items) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between p-4 text-sm">
      <nav className="flex h-full flex-col gap-3 pt-20 md:hidden md:pt-0">
        {items.map((item, i) => {
          if (typeof item.page !== "number") {
            return (
              <motion.div animate={controls} custom={i} key={item.label}>
                <NavigationLink
                  external={item.external || false}
                  label={item.label || ""}
                  lang={lang}
                  path={getPath(item.page?.slug || "", lang)}
                  type={item.type || ""}
                />
              </motion.div>
            );
          }
        })}
      </nav>
      <nav className="hidden h-full flex-col gap-3 pt-20 md:flex md:pt-0">
        {items.map((item) => {
          if (typeof item.page !== "number") {
            return (
              <NavigationLink
                external={item.external || false}
                key={item.id}
                label={item.label || ""}
                lang={lang}
                path={getPath(item.page?.slug || "", lang)}
                type={item.type || ""}
              />
            );
          }
        })}
      </nav>
    </div>
  );
};

export default MainMenuItems;
