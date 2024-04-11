"use client";

import { Locale } from "@/lib/i18n/types";
import { Content, asLink } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { motion } from "framer-motion";
import { FC } from "react";

import ArticleBreadcrumb from "@/components/Articles/ArticleBreadcrumb";
import { A, H1, P } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";
import { components } from "@/slices";
import Image from "next/image";

type CommonProps = {
	lang: Locale;
	uid: string;
};

type WorkProps = {
	collection: "work";
	content: Content.WorkPostDocument;
};

type BlogProps = {
	collection: "blog";
	content: Content.BlogPostDocument;
};

type Props = (WorkProps | BlogProps) & CommonProps;

const variants = {
	initial: { opacity: 0, y: 25, filter: "blur(15px)" },
	animate: { opacity: 1, y: 0, filter: "blur(0px)" },
	exit: { opacity: 0, y: -50 },
};

const Article: FC<Props> = (props) => {
	const { lang, uid, content, collection } = props;

	let externalLink = null;
	if (collection === "work") {
		externalLink = asLink(content.data.externalLink);
	}

	return (
		<div className="content">
			<ArticleBreadcrumb
				lang={lang}
				title={content.data.title || uid}
				collection={collection}
			/>
			<motion.article
				animate="animate"
				initial="initial"
				transition={{ duration: 0.7 }}
				variants={variants}
			>
				<div className="flex flex-col mb-8">
					<H1 className="mb-5">{content.data.title}</H1>
					{externalLink && (
						<A className="mb-2" href={externalLink} rel={"noopener nofollow"}>
							{externalLink.replace(/(^\w+:|^)\/\//, "")}
						</A>
					)}
					<span className="text-stone-400 mb-5">
						<P>{content.data.description}</P>
					</span>
					{collection === "work" && <Separator />}
					{collection === "blog" && content.data.cover && (
						<Image
							className="lg:max-w-full lg:max-h-[550px] object-cover rounded-t-lg"
							sizes="(max-width: 768px) 90vw, (max-width: 1024px) 688px, 768px"
							height={content.data.cover.dimensions?.height}
							src={content.data.cover.url || ""}
							alt={
								content.data.cover.alt ||
								`Cover image for ${content.data.title}`
							}
							width={content.data.cover.dimensions?.width}
						/>
					)}
				</div>
				<SliceZone components={components} slices={content.data.slices} />
			</motion.article>
		</div>
	);
};

export default Article;
