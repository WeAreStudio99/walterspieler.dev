"use client";

import { FC } from "react";

import { motion } from "motion/react";

import type { HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"article">;

const MotionArticle: FC<Props> = ({ children, ...props }) => {
  return <motion.article {...props}>{children}</motion.article>;
};

export default MotionArticle;
