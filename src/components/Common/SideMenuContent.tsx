"use client";

import { MenuContext } from "@/contexts/MenuContext";
import { formatDateToMonthYear } from "@/lib/date";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { DateField, TimestampField, asDate } from "@prismicio/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, use, useMemo } from "react";

type Props = {
	lang: Locale;
	title: string;
	collection: "works" | "blog";
	data: {
		title: string;
		uid: string;
		startDate: DateField | TimestampField<"filled"> | undefined;
		endDate?: DateField | undefined;
	}[];
};

const SideMenuContent: FC<Props> = (props) => {
	const { lang, data, title, collection } = props;

	const { setIsInnerMenuOpen = () => {} } = use(MenuContext) ?? {};

	const pathname = usePathname();
	const splitPathname = pathname.split("/");
	const currentPage = splitPathname[splitPathname.length - 1];

	const isActiveArray = useMemo(
		() => data.map((item) => currentPage === item.uid),
		[data, currentPage],
	);

	return (
		<div className="w-full wrapper bg-eerie-dark h-screen">
			<div className="w-full px-4 pt-10 md:p-4">
				<span className="text-3xl md:text-lg font-bold">{title}</span>
			</div>
			<div className="w-full mx-auto content px-4 pt-10 md:p-4 flex flex-col gap-3">
				{data.map((item, idx) => {
					const href =
						lang !== I18N_CONFIG.defaultLocale
							? `/${lang}/${collection}/${item.uid}`
							: `/${collection}/${item.uid}`;

					const startDate = asDate(item.startDate);
					const endDate = asDate(item.endDate);

					const isActive = isActiveArray[idx];

					return (
						<Link
							href={href}
							key={item.uid}
							onClick={() => setIsInnerMenuOpen(false)}
						>
							<div
								className={cn(
									"group relative px-4 py-5 group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border hover:bg-eerie-light  shadow-duration-200 hover:scale-[1.01] active:scale-[0.98] active:bg-eerie-light transition-all",
									{
										"[0_1000px_0_0_hsl(0_0%_20%)_inset] overflow-hidden":
											isActive,
									},
								)}
							>
								{isActive && (
									<>
										<span className="spark mask-gradient animate-flip absolute inset-0 h-[100%] w-[100%]  rounded-lg [mask:linear-gradient(#7ACCB8,_transparent_50%)] before:absolute before:animate-rotate before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#7ACCB8_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] pointer-events-none" />
										<span className="backdrop absolute inset-px rounded-lg bg-chinese-black transition-colors duration-200 pointer-events-none" />
									</>
								)}
								<div className="space-y-2 z-10 flex flex-col text-base">
									<span className="font-bold text-lg md:text-base">
										{item.title}
									</span>
									{(startDate || (startDate && endDate)) && (
										<div className="text-sm flex items-center gap-1">
											<span>{formatDateToMonthYear(startDate, lang)}</span>
											{endDate && (
												<>
													<span> - </span>
													<span>{formatDateToMonthYear(endDate, lang)}</span>
												</>
											)}
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

export default SideMenuContent;
