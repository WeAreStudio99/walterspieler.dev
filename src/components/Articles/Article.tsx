"use client";

import { FC } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { TypedLocale } from "payload";

import { A, H1, P } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";

type CommonProps = {
  lang: TypedLocale;
  uid: string;
};

type WorkProps = {
  collection: "work";
  content: "";
};

type BlogProps = {
  collection: "blog";
  content: "";
};

type Props = (WorkProps | BlogProps) & CommonProps;

const variants = {
  initial: { opacity: 0, y: 25, filter: "blur(15px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -50 },
};

const Article: FC<Props> = (props) => {
  const { uid, collection } = props;

  const externalLink = null;

  return (
    <motion.article
      animate="animate"
      initial="initial"
      transition={{ duration: 0.7 }}
      variants={variants}
    >
      <div className="mb-8 flex flex-col">
        <H1 className="mb-5">{uid}</H1>
        {externalLink && (
          <A className="mb-2" href={externalLink} rel={"noopener nofollow"}>
            LINK
          </A>
        )}
        <span className="mb-5 text-stone-400">
          <P>DESCRIPTION</P>
        </span>
        {collection === "work" && <Separator />}
        {collection === "blog" && (
          <Image
            alt={""}
            className="rounded-t-lg object-cover lg:max-h-[550px] lg:max-w-full"
            height={0}
            priority={true}
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 688px, 768px"
            src={""}
            width={0}
          />
        )}
      </div>
    </motion.article>
  );
};

export default Article;
