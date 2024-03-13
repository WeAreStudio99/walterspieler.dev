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
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								className={cn(
									"group flex items-center justify-between rounded-lg p-4",
									"bg-metal border-grey border hover:bg-eerie-light",
									isActive && "bg-chinese-black",
								)}
								href={
									lang !== "en-gb"
										? `/${lang}/works/${work.uid} `
										: `/works/${work.uid}`
								}
							>
								<div className="flex flex-col  gap-2 text-base">
									<span className="font-bold">{company && company.name}</span>

									{date1 && date2 && (
										<div className="text-sm flex items-center gap-1">
											<span>{formatDateToMonthYear(date1, lang)}</span>
											<span> - </span>
											<span>{formatDateToMonthYear(date2, lang)}</span>
										</div>
									)}
								</div>
								<ChevronRight />
							</Link>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default WorkMenuContent;
