"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDateToMonthYear } from "@/lib/date";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import {
	Content,
	GroupField,
	ImageFieldImage,
	RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Simplify } from "../../prismicio-types";

type Props = {
	title: string;
	description: RichTextField;
	logo: ImageFieldImage;
	link: string;
	duration: {
		start: Date | null;
		end: Date | null;
		difference: string;
	};
	relatedWorkPostLink: string;
	lang: Locale;
	buttonLabel: string;
	tags: GroupField<Simplify<Content.WorkDocumentDataTagsItem>>;
};

const WorkCard: FC<Props> = ({
	title,
	description,
	logo,
	duration,
	link,
	lang,
	relatedWorkPostLink,
	buttonLabel,
	tags,
}) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	return (
		<div
			className="group relative w-full overflow-hidden rounded-xl bg-metal my-8"
			onMouseMove={(e) => {
				const { left, top } = e.currentTarget.getBoundingClientRect();

				mouseX.set(e.clientX - left);
				mouseY.set(e.clientY - top);
			}}
		>
			<div
				className={cn(
					"absolute right-5  h-px w-80 bg-gradient-to-l from-transparent bottom-0 left-0 via-white/30 via-10% to-transparent",
				)}
			/>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
				style={{
					background: useMotionTemplate`
						radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(22, 24, 27, 0.4), transparent 80%)
					`,
				}}
			/>
			<div className="relative flex flex-col rounded-xl border border-white/10">
				<div className="space-y-2 flex flex-row items-center gap-4 p-6">
					<PrismicNextImage
						className="w-8 max-h-8"
						field={logo}
						sizes="(max-width: 640px) 32px, (max-width: 768px) 32px, (max-width: 1024px) 32px, 32px"
					/>
					<div className="grid gap-1">
						<h3 className="text-xl font-semibold ">{title}</h3>
						<div className="text-sm flex items-center md:gap-1">
							{duration.start && duration.end && (
								<>
									<CalendarIcon className="h-4 w-4 mr-1" />
									<span>{formatDateToMonthYear(duration.start, lang)}</span>
									<span> - </span>
									<span>{formatDateToMonthYear(duration.end, lang)}</span>
									<Separator
										className="hidden md:block h-4 mx-2"
										orientation="vertical"
									/>
									<span className="hidden md:block">{duration.difference}</span>
								</>
							)}
						</div>
						{link && (
							<a
								aria-label={`${title} website`}
								className="hover:underline hover:text-pearl text-sm text-stone-400"
								href={link}
								rel={"noopener nofollow"}
							>
								{link.replace(/(^\w+:|^)\/\//, "")}
							</a>
						)}
					</div>
				</div>
				<div className="text-sm leading-[1.5] p-6 pt-0">
					<PrismicRichText field={description} />
					<div className="flex flex-wrap gap-2 mt-4">
						{tags.map((tag, idx) => (
							<div
								className="relative inline-flex overflow-hidden rounded-full p-px"
								key={idx}
							>
								<span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
								<span className="inline-flex h-full w-full items-center justify-center rounded-full  px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl">
									{tag.name}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="p-6 pt-0 flex items-start justify-between flex-col md:flex-row gap-5">
					{relatedWorkPostLink && (
						<div className="flex">
							<Button asChild variant="outline">
								<Link
									aria-label={`Read more about ${title}`}
									href={
										lang !== "en-gb"
											? `/${lang}/works/${relatedWorkPostLink}`
											: `/works/${relatedWorkPostLink}`
									}
								>
									{buttonLabel} {title}
								</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WorkCard;
