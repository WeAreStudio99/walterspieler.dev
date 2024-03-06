import { Breadcrumb } from "@/components/Breadcrumb";
import { ScrollArea } from "@/components/ScrollArea";
import { H1 } from "@/components/Typography";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, uid } = params;
	const dictionary = await getDictionary(lang);

	const { works } = dictionary;

	return {
		title: works.metadata.title,
		description: works.metadata.description,
		alternates: generateAlternates(`works/${uid}`, lang),
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
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
				// height: 1024,
				// width: 1024,
			},
		},
		openGraph: {
			type: "website",
			title: works.metadata.title,
			description: works.metadata.description,
			url: `/`,
			images: {
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
				// height: 1024,
				// width: 1955,
			},
		},
	};
}

const WorkPage: FC<Props> = async (props) => {
	const { params } = props;
	const { lang, uid } = params;

	const dictionary = await getDictionary(lang);

	const client = createClient();
	const page = await client
		.getByUID<
			Content.WorkPostDocument & {
				data: {
					work: {
						data: Pick<Content.WorkDocument["data"], "company">;
					};
				};
			}
		>("workPost", uid, {
			lang,
			fetchLinks: [
				"work.company",
				"work.description",
				"work.duration",
				"work.tags",
				"work.logo",
			],
		})
		.catch(() => notFound());

	const company = page?.data?.work?.data?.company[0];
	const companyLink = asLink(company?.website);

	return (
		<ScrollArea className="flex flex-col">
			<div className="content-wrapper">
				<article className="content">
					<Breadcrumb
						className={"mb-5"}
						dictionary={dictionary}
						lang={lang}
						paths={[
							{
								label: "Works",
								href: lang === "en-gb" ? "/works" : `/${lang}/works`,
							},
							{ label: company?.name || "" },
						]}
					/>
					{company && (
						<>
							<div className="flex flex-col gap-1 mb-8">
								<H1 className="mb-3">{company.name}</H1>
								{companyLink && (
									<a
										className="hover:underline hover:text-pearl"
										href={companyLink}
										rel={"noopener nofollow"}
									>
										{companyLink.replace(/(^\w+:|^)\/\//, "")}
									</a>
								)}
								<span className="text-stone-400">
									<PrismicRichText
										field={page.data.work.data.company[0]?.description}
									/>
								</span>
								<Separator className="mt-8" />
							</div>
							<SliceZone components={components} slices={page.data.slices} />
						</>
					)}
				</article>
			</div>
		</ScrollArea>
	);
};

export default WorkPage;
