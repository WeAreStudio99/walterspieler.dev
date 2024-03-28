import { ScrollArea } from "@/components/ScrollArea";
import { H1 } from "@/components/Typography";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { FC } from "react";
import { ProfilePage, WithContext } from "schema-dts";

type Params = {
	lang: Locale;
};

type Props = {
	params: Params;
};

const HomeLang: FC<Props> = async (props) => {
	const { params } = props;
	const { lang } = params;

	const dictionary = await getDictionary(lang);

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

	const jsonLd: WithContext<ProfilePage> = {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		name: "Thibault Walterspieler",
		mainEntity: {
			"@type": "Person",
			name: "Thibault Walterspieler",
			description: dictionary.home.metadata.description,
			jobTitle: dictionary.home.job,
			affiliation: "WeAreStudio99",
			url: "https://walterspieler.dev",
			email: "thibs@wearestudio99.fr",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Lyon",
				addressRegion: "Rhône-Alpes",
				addressCountry: "France",
			},
			worksFor: {
				"@type": "Organization",
				name: "WeAreStudio99",
				url: "https://www.instagram.com/wearestudio99/",
			},
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
					<div className="content animate-in fade-in duration-700">
						<H1 className="mb-4 md:mb-4 md:max-w-full text-spotlight max-w-[60vw]">
							Thibault Walterspieler
							<span
								className={
									"block text-stone-400 text-xl md:text-2xl font-normal mt-3"
								}
							>
								{dictionary.home.job}
							</span>
						</H1>
						<Separator className="my-6" />
						<SliceZone components={components} slices={page.data.slices} />
					</div>
				</div>
			</ScrollArea>
		</>
	);
};

export default HomeLang;
