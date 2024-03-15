"use client";

import { formatDateToMonthYear } from "@/lib/date";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { Content, asDate } from "@prismicio/client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type Props = {
	lang: Locale;
	workPages: (Content.WorkPostDocument & {
		data: {
			work: {
				data: Pick<Content.WorkDocument["data"], "duration" | "company">;
			};
		};
	})[];
};

const WorkMenuContent: FC<Props> = ({ lang, workPages }) => {
	const pathname = usePathname();
	const splitPathname = pathname.split("/");
	const currentWork = splitPathname[splitPathname.length - 1];

	return (
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

					const isActive = currentWork === work.uid;

					return (
						<motion.div
							key={work.id}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Link
								href={
									lang !== "en-gb"
										? `/${lang}/works/${work.uid} `
										: `/works/${work.uid}`
								}
							>
								<div
									className={cn(
										"group relative  overflow-hidden px-4 py-5  group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border hover:bg-eerie-light transition-colors shadow-duration-200",
										isActive && "[0_1000px_0_0_hsl(0_0%_20%)_inset]  ",
									)}
								>
									{isActive && (
										<>
											<span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-lg [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />

											<span className="backdrop absolute inset-px rounded-[8px] bg-chinese-black transition-colors duration-200" />
										</>
									)}
									<div className="space-y-2 z-10 flex flex-col text-base">
										<h3 className="font-bold">{company && company.name}</h3>
										{date1 && date2 && (
											<div className="text-sm flex items-center gap-1">
												<span>{formatDateToMonthYear(date1, lang)}</span>
												<span> - </span>
												<span>{formatDateToMonthYear(date2, lang)}</span>
											</div>
										)}
									</div>
									<ChevronRight className="z-10" />
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
