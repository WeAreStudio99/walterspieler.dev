import { Separator } from "@/components/ui/separator";
import { formatDateDiff, formatDateToMonthYear } from "@/lib/date";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { createClient } from "@/prismicio";
import { Content, asDate } from "@prismicio/client";
import Link from "next/link";
import { FC } from "react";

type Props = {
	lang: Locale;
};

const WorkMenuContent: FC<Props> = async ({ lang }) => {
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
		<>
			<div className="flex w-full flex-col">
				<div className="w-full p-4">
					<span className={cn("font-bold text-lg")}>My works</span>
				</div>
				<div className="flex flex-col w-full p-4 gap-4">
					{workPages.map((work) => {
						const workData = work.data.work.data;
						const company = workData.company[0];

						const duration = workData.duration[0];
						const date1 = asDate(duration?.start);
						const date2 = asDate(duration?.end);

						let difference = "";

						if (date1 && date2) {
							difference = formatDateDiff(date1, date2);
						}

						return (
							<Link
								className={cn(
									"group flex items-center justify-between rounded-lg p-2",
									"hover:bg-metal",
								)}
								href={
									lang !== "en-gb"
										? `/${lang}/works/${work.uid} `
										: `/works/${work.uid}`
								}
								key={work.id}
							>
								<span className="flex flex-col  gap-2 text-base">
									<span className="font-bold">{company && company.name}</span>
									{date1 && date2 && (
										<div className="text-sm flex items-center gap-1">
											<span>{formatDateToMonthYear(date1, lang)}</span>
											<span> - </span>
											<span>{formatDateToMonthYear(date2, lang)}</span>
											<Separator className="h-4 mx-2" orientation="vertical" />
											<span>{difference}</span>
										</div>
									)}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default WorkMenuContent;
