"use client";

import React from "react";

import { motion } from "motion/react";

import type { HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"article">;

const MotionArticle = React.forwardRef<HTMLHeadingElement, Props>(
  function MotionArticle({ children, ...props }, ref) {
    return (
      <motion.article ref={ref} {...props}>
        {children}
      </motion.article>
    );
  },
);

export default MotionArticle;
