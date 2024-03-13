import { ScrollArea } from "@/components/ScrollArea";
import { Locale } from "@/lib/i18n/types";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Person } from "schema-dts";

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
	const page = await client
		.getSingle("home", {
			lang,
			fetchLinks: [
				"work.company",
				"work.description",
				"work.duration",
				"work.workPost",
				"work.tags",
				"work.logo",
				"social.label",
				"social.url",
				"social.type",
			],
		})
		.catch(() => notFound());

	const jsonLd: Person = {
		"@type": "Person",
		name: "Thibault Walterspieler",
		jobTitle: "Fullstack engineer",
		url: "https://walterspieler.dev",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Lyon",
			addressRegion: "Rhône-Alpes",
			addressCountry: "France",
		},
		email: "thibs@wearestudio99.fr",
		worksFor: {
			"@type": "Organization",
			name: "WeAreStudio99",
			url: "https://www.instagram.com/wearestudio99/",
		},
		sameAs: [
			"https://www.linkedin.com/in/thibault-walterspieler-84881716b/",
			"https://github.com/ThibaultWalterspieler",
			"https://stackoverflow.com/users/10094877/thibault-walterspieler",
			"https://www.malt.fr/profile/thibaultwalterspieler",
		],
	};

	return (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<ScrollArea className="flex flex-col">
				<div className="content-wrapper">
					<div className="content">
						<SliceZone components={components} slices={page.data.slices} />
					</div>
				</div>
			</ScrollArea>
		</>
	);
};

export default HomeLang;
