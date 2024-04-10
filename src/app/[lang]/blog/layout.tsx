import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { createClient } from "@/prismicio";
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

export default BlogLayout;
