"use client";

import { Locale } from "@/lib/i18n/types";
import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { Simplify } from "../../../../prismicio-types";

import { A, H1 } from "@/components/Common/Typography";
import ArticleBreadcrumb from "@/components/Works/Article/ArticleBreadcrumb";
import { Separator } from "@/components/ui/separator";
import { components } from "@/slices";

type Props = {
	lang: Locale;
	uid: string;
	company: Simplify<Content.WorkDocumentDataCompanyItem>;
	page: Content.WorkPostDocument & {
		data: {
			work: {
				data: Pick<Content.WorkDocument["data"], "company">;
			};
		};
	};
};

const variants = {
	initial: { opacity: 0, y: 25, filter: "blur(15px)" },
	animate: { opacity: 1, y: 0, filter: "blur(0px)" },
	exit: { opacity: 0, y: -50 },
};

const Article: FC<Props> = ({ company, page, lang, uid }) => {
	const companyLink = asLink(company?.website);

	return (
		<div className="content">
			<ArticleBreadcrumb lang={lang} title={page.data.meta_title || uid} />
			<motion.article
				animate="animate"
				initial="initial"
				transition={{ duration: 0.7 }}
				variants={variants}
			>
				<div className="flex flex-col mb-8">
					<H1 className="mb-5">{company.name}</H1>
					{companyLink && (
						<A className="mb-2" href={companyLink} rel={"noopener nofollow"}>
							{companyLink.replace(/(^\w+:|^)\/\//, "")}
						</A>
					)}
					<span className="text-stone-400">
						<PrismicRichText field={company.description} />
					</span>
					<Separator className="mt-8" />
				</div>
				<SliceZone components={components} slices={page.data.slices} />
			</motion.article>
		</div>
	);
};

export default Article;
