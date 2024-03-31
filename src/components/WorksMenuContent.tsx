"use client";

import { formatDateToMonthYear } from "@/lib/date";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { Content, asDate } from "@prismicio/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";

type Props = {
	lang: Locale;
	title: string;
	workPages: (Content.WorkPostDocument & {
		data: {
			work: {
				data: Pick<Content.WorkDocument["data"], "duration" | "company">;
			};
		};
	})[];
};

const WorksMenuContent: FC<Props> = ({ lang, workPages, title }) => {
	const pathname = usePathname();
	const splitPathname = pathname.split("/");
	const currentWork = splitPathname[splitPathname.length - 1];

	const isActiveArray = useMemo(
		() => workPages.map((work) => currentWork === work.uid),
		[workPages, currentWork],
	);

	return (
		<div className="flex w-full flex-col">
			<div className="w-full p-4">
				<span className={cn("font-bold text-lg")}>{title}</span>
			</div>
			<div className="flex flex-col w-full p-4 gap-4 ">
				{workPages.map((work, idx) => {
					const workData = work.data.work.data;
					const company = workData.company[0];

					const duration = workData.duration[0];
					const date1 = asDate(duration?.start);
					const date2 = asDate(duration?.end);

					const isActive = isActiveArray[idx];
					const href =
						lang !== I18N_CONFIG.defaultLocale
							? `/${lang}/works/${work.uid} `
							: `/works/${work.uid}`;

					return (
						<Link href={href} key={work.id}>
							<div
								className={cn(
									"group relative px-4 py-5 group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border hover:bg-eerie-light  shadow-duration-200 hover:scale-[1.01] active:scale-[0.98] active:bg-eerie-light transition-color",
									isActive &&
										"[0_1000px_0_0_hsl(0_0%_20%)_inset] overflow-hidden",
								)}
							>
								{isActive && (
									<>
										<span className="spark mask-gradient animate-flip absolute inset-0 h-[100%] w-[100%]  rounded-lg [mask:linear-gradient(#7ACCB8,_transparent_50%)] before:absolute before:animate-rotate before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#7ACCB8_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] pointer-events-none" />
										<span className="backdrop absolute inset-px rounded-lg bg-chinese-black transition-colors duration-200 pointer-events-none" />
									</>
								)}
								<div className="space-y-2 z-10 flex flex-col text-base">
									<h3 className="font-bold text-stone-50">
										{company && company.name}
									</h3>
									{date1 && date2 && (
										<div className="text-sm flex items-center gap-1 text-stone-400">
											<span>{formatDateToMonthYear(date1, lang)}</span>
											<span> - </span>
											<span>{formatDateToMonthYear(date2, lang)}</span>
										</div>
									)}
								</div>
								<ChevronRight
									className="z-10 text-pearl-light"
									height={22}
									strokeLinecap="square"
									strokeWidth={1}
								/>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default WorksMenuContent;
