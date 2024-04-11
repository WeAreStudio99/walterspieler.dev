import ContentWrapper from "@/components/Common/ContentWrapper";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = params;

	const dictionary = await getDictionary(lang);
	const { notice } = dictionary;

	const imagePath = `/images/og/notice_${lang}.png`;

	return {
		title: notice.metadata.title,
		description: notice.metadata.description,
		alternates: generateAlternates("open-source", lang),
		icons: [
			{
				rel: "icon",
				url: "/favicon.ico",
				sizes: "any",
			},
		],
		twitter: {
			card: "summary_large_image",
			title: notice.metadata.title,
			description: notice.metadata.description,
			images: {
				url: imagePath,
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
		openGraph: {
			type: "website",
			title: notice.metadata.title,
			description: notice.metadata.description,
			url: `/`,
			images: {
				url: imagePath,
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
	};
}

export default NoticePage;
