import EmptyWork from "@/components/EmptyWork";
import WorksList from "@/components/WorksList";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import { Metadata } from "next";
import { FC } from "react";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
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

const Works: FC<Props> = (props) => {
	const { params } = props;
	const { lang } = params;

	return (
		<>
			<EmptyWork lang={lang} />
			<div className="flex-1 lg:hidden">
				<WorksList lang={lang} />
			</div>
		</>
	);
};

export default Works;
