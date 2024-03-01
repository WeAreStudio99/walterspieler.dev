import { H1 } from "@/components/Typography";
import { formatDateToMonthYear } from "@/lib/date";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Content, asDate } from "@prismicio/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Props = {
	lang: Locale;
};

const WorksList: FC<Props> = async (props) => {
	const { lang } = props;

	const client = createClient();
	const workPages = await client.getAllByType<
		Content.WorkPostDocument & {
			data: {
				work: {
					data: Pick<Content.WorkDocument["data"], "duration" | "company">;
				};
			};
		}
	>("workPost", {
		lang,
		fetchLinks: ["work.company", "work.duration"],
	});

	return (
		<div className="py-20 md:py-24 px-5 w-full wrapper">
			<div className="w-full mx-auto content">
				<H1 className="mb-8">Works</H1>
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
								lang !== "en-gb"
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
