import SideMenuContent from "@/components/Common/SideMenuContent";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { FC } from "react";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
};

const Blog: FC<Props> = async (props) => {
	const { params } = props;
	const { lang } = params;

	const dictionary = await getDictionary(lang);

	return (
		<>
			<div className="flex-1 lg:hidden">
				<SideMenuContent
					lang={lang}
					title={dictionary.firstLevelPages.works}
					collection="blog"
					data={[
						{
							title: "Blog Post 1",
							uid: "blog-post-1",
							startDate: undefined,
							endDate: undefined,
						},
					]}
				/>
			</div>
		</>
	);
};

export default Blog;
