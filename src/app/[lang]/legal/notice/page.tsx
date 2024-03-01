import ContentWrapper from "@/components/ContentWrapper";
import { Locale } from "@/lib/i18n/types";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { FC } from "react";

type Params = {
	lang: Locale;
};

type Props = {
	params: Params;
};

const NoticePage: FC<Props> = async (props) => {
	const { params } = props;
	const { lang } = params;

	const client = createClient();
	const page = await client.getSingle("legalNotice", { lang });

	return (
		<ContentWrapper>
			<SliceZone components={components} slices={page.data.slices} />
		</ContentWrapper>
	);
};

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("legalNotice");

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}

export default NoticePage;
