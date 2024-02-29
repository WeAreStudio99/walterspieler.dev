import ContentWrapper from "@/components/ContentWrapper";
import { H1 } from "@/components/Typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/lib/i18n/types";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { FC } from "react";

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

	const company = page.data.work.data.company[0];
	const companyLink = asLink(company?.website);

	return (
		<ScrollArea className="h-screen">
			<ContentWrapper>
				{company && (
					<>
						<div className="flex flex-col gap-1 mb-8">
							<H1 className="mb-3">{page.data.work.data.company[0]?.name}</H1>
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
			</ContentWrapper>
		</ScrollArea>
	);
};

export default WorkPage;
