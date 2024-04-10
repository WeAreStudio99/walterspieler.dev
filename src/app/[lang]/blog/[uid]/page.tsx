import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import getSchemaNewsArticle from "@/lib/schema-dts/news-article";
import { generateAlternates } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Metadata } from "next";
import { FC } from "react";

import Article from "@/components/Articles/Article";
import ScrollArea from "@/components/Common/ScrollArea";
import { notFound } from "next/navigation";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
};

const BlogPostPage: FC<Props> = async (props) => {
	const { params } = props;
	const { lang, uid } = params;

	const client = createClient();
	const page = await client
		.getByUID("blog_post", uid, {
			lang,
		})
		.catch(() => notFound());

	const jsonLd = getSchemaNewsArticle(
		page.data.meta_title || uid,
		page.first_publication_date,
		page.last_publication_date,
	);

	return (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<ScrollArea className="flex flex-col lg:pl-72 z-0 blueprint-layout">
				<div className="content-wrapper mt-14 lg:mt-0">
					<Article lang={lang} uid={uid} collection="blog" content={page} />
				</div>
			</ScrollArea>
		</>
	);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, uid } = params;
	const dictionary = await getDictionary(lang);

	const client = createClient();
	const page = await client.getByUID("blog_post", uid, {
		lang,
	});

	const { works } = dictionary;

	return {
		title: `${page.data.meta_title} | Thibault Walterspieler`,
		description: page.data.meta_description,
		alternates: generateAlternates(`works/${uid}`, lang),
		icons: [
			{
				rel: "icon",
				url: "/favicon.ico",
				sizes: "any",
			},
		],
		twitter: {
			card: "summary_large_image",
			title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
			description: page.data.meta_description || works.metadata.description,
			images: {
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
		openGraph: {
			type: "website",
			title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
			description: page.data.meta_description || works.metadata.description,
			url: `/`,
			images: {
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
	};
}

export default BlogPostPage;
