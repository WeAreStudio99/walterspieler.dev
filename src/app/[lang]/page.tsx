import ContentWrapper from "@/components/ContentWrapper";
import { Locale } from "@/lib/i18n/types";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { FC } from "react";

type Params = {
	lang: Locale;
};

type Props = {
	params: Params;
};

const HomeLang: FC<Props> = async (props) => {
	const { params } = props;
	const { lang } = params;

	const client = createClient();
	const page = await client.getSingle("home", { lang });

	return (
		<ContentWrapper>
			<SliceZone components={components} slices={page.data.slices} />
		</ContentWrapper>
	);
};

export default HomeLang;
