"use client";

import { FC, PropsWithChildren, use } from "react";

import { ChevronLeft, Command, X } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import Link from "next/link";
import { TypedLocale } from "payload";

import ScrollArea from "@/components/Common/ScrollArea";
import { MenuContext } from "@/contexts/MenuContext";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  lang: TypedLocale;
  isInner?: boolean;
  collection?: "blog" | "experiences";
  displayReturnButton?: boolean;
} & PropsWithChildren;

const innerMenuVariants: Variants = {
  closed: { x: "-100%", opacity: 1 },
  animate: { x: "0%", opacity: 1 },
};

const iconVariants: Variants = {
  open: {
    scale: 1,
    opacity: 1,
  },
  closed: {
    scale: 0.3,
    opacity: 0,
  },
};

const SideMenu: FC<Props> = (props) => {
  const { children, isInner, lang, displayReturnButton, collection } = props;

  const {
    isMainMenuOpen,
    openMainMenu,
    closeMainMenu,
    isInnerMenuOpen,
    openInnerMenu,
  } = use(MenuContext) ?? {};

  const scrollAreaClasses = cn(
    "lg:flex lg:flex-col border-r border-grey z-50 justify-between",
    "dot-grid",
    {
      "w-screen lg:w-72 xl:w-72": isInner,
      "lg:w-60 xl:w-72": !isInner,
    },
  );

  return (
    <>
      {!isMainMenuOpen ? (
        <>
          <div className="border-grey bg-metal/5 absolute top-8 right-4 z-50 rounded-lg border p-2 backdrop-blur lg:hidden">
            <motion.div
              animate={isMainMenuOpen ? "open" : "closed"}
              initial="closed"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                duration: 0.5,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Command onClick={openMainMenu} size={24} />
            </motion.div>
          </div>
          {displayReturnButton && (
            <Link
              className={cn("block", {
                hidden: isMainMenuOpen || isInnerMenuOpen,
              })}
              href={
                lang === I18N_CONFIG.defaultLocale
                  ? `/${collection}`
                  : `/${lang}/${collection}`
              }
              onClick={openInnerMenu}
            >
              <div className="border-grey bg-metal/5 fixed top-8 left-4 z-50 rounded-lg border p-2 backdrop-blur lg:hidden">
                <ChevronLeft size={24} />
              </div>
            </Link>
          )}
        </>
      ) : (
        <div className="border-grey bg-metal/80 absolute top-8 right-4 z-50 rounded-lg border p-2 backdrop-blur lg:hidden">
          <motion.div
            animate={isMainMenuOpen ? "open" : "closed"}
            initial="closed"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
              duration: 0.8,
            }}
            variants={iconVariants}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <X onClick={closeMainMenu} size={24} />
          </motion.div>
        </div>
      )}
      {isInner ? (
        <motion.div
          animate="animate"
          className={cn("bg-eerie-dark fixed z-10", {
            hidden: !isInnerMenuOpen,
            "md:block": !isInnerMenuOpen || isInnerMenuOpen,
          })}
          initial="closed"
          transition={{
            duration: 0.5,
          }}
          variants={innerMenuVariants}
        >
          <ScrollArea className={scrollAreaClasses}>{children}</ScrollArea>
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {isMainMenuOpen && (
              <>
                <motion.div
                  animate={{ opacity: 1 }}
                  className="bg-eerie-dark/80 fixed z-40 w-screen backdrop-blur-3xl md:hidden"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{
                    ease: [0.93, -0.01, 0.17, 1],
                    duration: 0.6,
                  }}
                >
                  <ScrollArea className={cn(scrollAreaClasses)}>
                    {children}
                  </ScrollArea>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <ScrollArea
            className={cn(scrollAreaClasses, "bg-eerie-dark hidden md:block")}
          >
            {children}
          </ScrollArea>
        </>
      )}
    </>
  );
};

export default SideMenu;
