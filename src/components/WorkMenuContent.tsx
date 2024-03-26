"use client";

import { formatDateToMonthYear } from "@/lib/date";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { Content, asDate } from "@prismicio/client";
import { motion } from "framer-motion";
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

const WorkMenuContent: FC<Props> = ({ lang, workPages, title }) => {
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
			<div className="flex flex-col w-full p-4 gap-4">
				{workPages.map((work, idx) => {
					const workData = work.data.work.data;
					const company = workData.company[0];

					const duration = workData.duration[0];
					const date1 = asDate(duration?.start);
					const date2 = asDate(duration?.end);

					const isActive = isActiveArray[idx];

					return (
						<motion.div
							key={work.id}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Link
								href={
									lang !== I18N_CONFIG.defaultLocale
										? `/${lang}/works/${work.uid} `
										: `/works/${work.uid}`
								}
							>
								<div
									className={cn(
										"group relative   px-4 py-5  group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border hover:bg-eerie-light transition-colors shadow-duration-200",
										isActive && "[0_1000px_0_0_hsl(0_0%_20%)_inset]  ",
									)}
								>
									{isActive && (
										<>
											<span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%]  rounded-lg [mask:linear-gradient(#7ACCB8,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#7ACCB8_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />

											<span className="backdrop absolute inset-px rounded-lg bg-chinese-black transition-colors duration-200" />
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
									<ChevronRight className="z-10 text-pearl-light" />
								</div>
							</Link>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default WorkMenuContent;
