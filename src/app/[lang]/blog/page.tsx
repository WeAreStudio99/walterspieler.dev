import EmptyLayout from "@/components/Common/EmptyLayout";
import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";
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
			<MenuInitializer isInnerMenuOpen />
			<EmptyLayout label={dictionary.selectABlogPost} />
		</>
	);
};

export default Blog;
