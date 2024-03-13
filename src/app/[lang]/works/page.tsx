import EmptyWork from "@/components/EmptyWork";
import WorksList from "@/components/WorksList";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import { Metadata } from "next";
import Script from "next/script";
import { FC } from "react";
import { CollectionPage } from "schema-dts";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
};

const Works: FC<Props> = async (props) => {
	const { params } = props;
	const { lang } = params;

	const dictionary = await getDictionary(lang);
	const { works } = dictionary;

	const jsonLd: CollectionPage = {
		"@type": "CollectionPage",
		name: works.metadata.title,
		url: `https://walterspieler.dev/works`,
		description: works.metadata.description,
		author: {
			"@type": "Person",
			name: "Thibault Walterspieler",
			jobTitle: "Fullstack Engineer",
			affiliation: "WeAreStudio99",
			url: "https://walterspieler.dev",
		},
	};

	return (
		<>
			<Script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				id="json-ld-works"
				type="application/ld+json"
			/>
			<EmptyWork lang={lang} />
			<div className="flex-1 lg:hidden">
				<WorksList lang={lang} />
			</div>
		</>
	);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = params;
	const dictionary = await getDictionary(lang);

	const { works } = dictionary;

	return {
		title: works.metadata.title,
		description: works.metadata.description,
		alternates: generateAlternates("works", lang),
		icons: [
			{
				rel: "icon",
				url: "/favicon.ico",
				sizes: "any",
			},
		],
		twitter: {
			card: "summary_large_image",
			title: works.metadata.title,
			description: works.metadata.description,
			images: {
				url: `/images/og/works_${lang}.png`,
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
		openGraph: {
			type: "website",
			title: works.metadata.title,
			description: works.metadata.description,
			url: `/`,
			images: {
				url: `/images/og/works_${lang}.png`,
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
	};
}

export default Works;
