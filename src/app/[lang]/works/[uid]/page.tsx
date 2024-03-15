import { ScrollArea } from "@/components/ScrollArea";
import { H1 } from "@/components/Typography";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { ChevronDownIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
import { SoftwareApplication, WithContext } from "schema-dts";

type Params = {
	lang: Locale;
	uid: string;
};

type Props = {
	params: Params;
};

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

	const workPosts = await client.getAllByType<
		Content.WorkPostDocument & {
			data: {
				work: {
					data: Pick<Content.WorkDocument["data"], "duration" | "company">;
				};
			};
		}
	>("workPost", {
		lang,
		orderings: [
			{
				field: "my.work.duration.end",
				direction: "desc",
			},
		],
		fetchLinks: ["work.company", "work.duration"],
	});

	const company = page?.data?.work?.data?.company[0];
	const companyLink = asLink(company?.website);

	const jsonLd: WithContext<SoftwareApplication> = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: page.data.meta_title || uid,
		url: `https://walterspieler.dev/works/${uid}`,
		applicationCategory: "WebApplication",
		description: page.data.meta_description || "",
		headline: `${page.data.meta_title} | Thibault Walterspieler`,
		operatingSystem: "Web",
		author: {
			"@type": "Person",
			name: "Thibault Walterspieler",
			jobTitle: "Fullstack Engineer",
			affiliation: "WeAreStudio99",
			url: "https://walterspieler.dev",
		},
		datePublished: page.first_publication_date,
		dateModified: page.last_publication_date,
	};

	return (
		<>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<ScrollArea className="flex flex-col md:pl-72 z-0">
				<div className="content-wrapper">
					<article className="content">
						<Breadcrumb className="mb-5">
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href="/">
										{dictionary.firstLevelPages.home}
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator></BreadcrumbSeparator>
								<BreadcrumbItem>
									<DropdownMenu>
										<DropdownMenuTrigger className="flex items-center gap-1">
											<Link
												href={lang === "en-gb" ? "/works" : `/${lang}/works`}
											>
												{dictionary.firstLevelPages.works}
											</Link>
											<ChevronDownIcon />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="start">
											{workPosts.map((work, idx) => {
												const workData = work.data.work.data;
												const company = workData.company[0];

												if (work.uid === uid) {
													return null;
												}

												return (
													<DropdownMenuItem key={idx}>
														<Link
															href={
																lang !== "en-gb"
																	? `/${lang}/works/${work.uid}`
																	: `/works/${work.uid}`
															}
														>
															{company && company.name}
														</Link>
													</DropdownMenuItem>
												);
											})}
										</DropdownMenuContent>
									</DropdownMenu>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{page.data.meta_title || uid}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						{company && (
							<>
								<div className="flex flex-col mb-8">
									<H1 className="mb-5">{company.name}</H1>
									{companyLink && (
										<a
											className="hover:underline hover:text-pearl mb-2"
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
		</>
	);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, uid } = params;
	const dictionary = await getDictionary(lang);

	const client = createClient();
	const page = await client
		.getByUID("workPost", uid, {
			lang,
		})
		.catch(() => notFound());

	const { works } = dictionary;

	return {
		title: `${page.data.meta_title} | Thibault Walterspieler`,
		description: page.data.meta_description,
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
			title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
			description: page.data.meta_description || works.metadata.description,
			images: {
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
		openGraph: {
			type: "website",
			title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
			description: page.data.meta_description || works.metadata.description,
			url: `/`,
			images: {
				url: "/images/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/png",
			},
		},
	};
}

export default WorkPage;
