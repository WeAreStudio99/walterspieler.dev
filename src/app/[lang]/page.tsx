import { ScrollArea } from "@/components/ScrollArea";
import { H1 } from "@/components/Typography";
import { Locale } from "@/lib/i18n/types";
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
			description: "Fullstack engineer based in Lyon, France",
			jobTitle: "Fullstack engineer",
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
					<div className="content">
						<H1 className="max-w-36 mb-4 md:mb-8 md:max-w-full">
							Thibault Walterspieler
						</H1>
						<SliceZone components={components} slices={page.data.slices} />
					</div>
					{/* <div
						aria-hidden="true"
						className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48 animate-in fade-in"
					>
						<svg
							className="aspect-[801/1036] w-[50.0625rem] opacity-10"
							viewBox="0 0 200 200"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20.3,-28.9C33,-27.9,54.6,-35.9,53,-32.6C51.5,-29.3,26.9,-14.6,17.9,-5.2C8.8,4.2,15.3,8.4,19.1,15.6C22.8,22.8,23.9,32.9,20.2,46.9C16.6,60.8,8.3,78.5,-3.4,84.3C-15,90.2,-30.1,84.2,-32,69.3C-34,54.4,-22.8,30.5,-23.6,17.5C-24.3,4.5,-37,2.2,-47.5,-6.1C-58,-14.4,-66.4,-28.8,-65.7,-41.9C-65,-55,-55.2,-66.8,-42.7,-68C-30.3,-69.1,-15.1,-59.6,-5.7,-49.8C3.8,-40,7.6,-29.9,20.3,-28.9Z"
								fill="#7ACCB8"
								transform="translate(100 100)"
							/>
						</svg>
					</div> */}
				</div>
			</ScrollArea>
		</>
	);
};

export default HomeLang;
