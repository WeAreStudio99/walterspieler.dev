import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Metadata } from "next";
import { FC, PropsWithChildren, Suspense } from "react";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";

type Params = {
	lang: Locale;
};

type Props = PropsWithChildren<{
	params: Params;
}>;

const BlogLayout: FC<Props> = async (props) => {
	const { children, params } = props;
	const { lang } = params;

	const dictionary = await getDictionary(lang);

	const client = createClient();
	const blogPosts = await client.getAllByType("blog_post", {
		lang,
	});

	return (
		<>
			<SideMenu isInner lang={lang} collection="blog" displayReturnButton>
				<Suspense fallback={<LoadingSpinner />}>
					<SideMenuContent
						lang={lang}
						title={dictionary.firstLevelPages.blog}
						collection="blog"
						data={blogPosts.map((post) => {
							return {
								title: post.data.title || "",
								uid: post.uid,
								startDate: post?.first_publication_date,
							};
						})}
					/>
				</Suspense>
			</SideMenu>
			<div className="flex-1 relative">{children}</div>
		</>
	);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = params;
	const dictionary = await getDictionary(lang);

	const { blog } = dictionary;

	const imagePath = `/images/og/blog_${lang}.png`;

	return {
		title: blog.metadata.title,
		description: blog.metadata.description,
		alternates: generateAlternates("blog", lang),
		icons: [
			{
				rel: "icon",
				url: "/favicon.ico",
				sizes: "any",
			},
		],
		twitter: {
			card: "summary_large_image",
			title: blog.metadata.title,
			description: blog.metadata.description,
			images: {
				url: imagePath,
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
		openGraph: {
			type: "website",
			title: blog.metadata.title,
			description: blog.metadata.description,
			url: `/`,
			images: {
				url: imagePath,
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
	};
}

export default BlogLayout;
