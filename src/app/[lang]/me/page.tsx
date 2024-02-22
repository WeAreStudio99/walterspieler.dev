import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";

import { Locale } from "@/lib/i18n/types";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { FC } from "react";

type Params = {
	lang: Locale;
};

type Props = {
	params: Params;
};

const MePage: FC<Props> = async (props) => {
	const { params } = props;
	const { lang } = params;

	const client = createClient();
	const page = await client.getSingle("aboutMe", { lang });

	return <SliceZone components={components} slices={page.data.slices} />;
};

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("aboutMe");

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}

export default MePage;
