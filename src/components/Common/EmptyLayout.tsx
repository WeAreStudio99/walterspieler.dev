"use client";

import { FC } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
};

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const textVariants = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const EmptyLayout: FC<Props> = (props) => {
  const { label } = props;

  return (
    <motion.div
      animate="animate"
      className={cn("hidden h-full w-full items-center justify-center lg:flex")}
      initial="initial"
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <motion.span
        animate="animate"
        className={cn(
          "inline-flex animate-text-gradient bg-linear-to-r from-stone-400 via-metal to-stone-400 bg-[200%_auto] bg-clip-text pl-72 text-center text-3xl font-bold text-transparent",
        )}
        exit="exit"
        initial="initial"
        transition={{ delay: 0.5, duration: 0.7 }}
        variants={textVariants}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

export default EmptyLayout;
