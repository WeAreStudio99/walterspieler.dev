import { formatDateToMonthYear } from "@/lib/date";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Content, asDate } from "@prismicio/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

import { H1 } from "@/components/Common/Typography";
import { ChevronRight } from "lucide-react";

type Props = {
	lang: Locale;
};

const WorksList: FC<Props> = async (props) => {
	const { lang } = props;
	const dictionary = await getDictionary(lang);

	const client = createClient();
	const workPages = await client
		.getAllByType<
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
		})
		.catch(() => notFound());

	return (
		<div className="py-10 md:py-24 px-5 w-full wrapper bg-eerie-dark h-screen">
			<H1 className="mb-8 sticky top-10 z-30">
				{dictionary.firstLevelPages.works}
			</H1>
			<div className="w-full mx-auto content">
				{workPages.map((work) => {
					const workData = work.data.work.data;
					const company = workData.company[0];

					const duration = workData.duration[0];
					const date1 = asDate(duration?.start);
					const date2 = asDate(duration?.end);

					return (
						<Link
							className={cn(
								"group flex items-center justify-between rounded-lg p-5 mb-4",
								"bg-metal",
								"border-grey border",
							)}
							href={
								lang !== I18N_CONFIG.defaultLocale
									? `/${lang}/works/${work.uid} `
									: `/works/${work.uid}`
							}
							key={work.id}
						>
							<div className="flex flex-col gap-2 text-base">
								<span className="font-bold text-lg">
									{company && company.name}
								</span>
								{date1 && date2 && (
									<div className="text-sm flex items-center gap-1">
										<span>{formatDateToMonthYear(date1, lang)}</span>
										<span> - </span>
										<span>{formatDateToMonthYear(date2, lang)}</span>
									</div>
								)}
							</div>
							<div>
								<ChevronRight />
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default WorksList;
