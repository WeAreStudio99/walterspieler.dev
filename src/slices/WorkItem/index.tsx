"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateDiff, formatDateToMonthYear } from "@/lib/date";
import { Locale } from "@/lib/i18n/types";
import { Content, asDate, asLink } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { WorkDocumentData } from "../../../prismicio-types";

/**
 * Props for `WorkItem`.
 */
export type WorkItemProps = SliceComponentProps<
	Content.WorkItemSlice & {
		primary: {
			work: {
				lang: Locale;
				data: WorkDocumentData;
			};
		};
	}
>;

/**
 * Component for "WorkItem" Slices.
 */
const WorkItem = ({ slice }: WorkItemProps): JSX.Element => {
	if (!slice.primary.work || !slice.primary.work.data) {
		return <></>;
	}

	const lang = slice.primary.work.lang;
	const company = slice.primary.work.data.company[0];
	const companyLink = asLink(company?.website);

	if (!company) {
		return <></>;
	}

	if (!slice.primary.work.data.duration) {
		return <></>;
	}

	const date1 = asDate(slice.primary.work.data.duration[0]?.start);
	const date2 = asDate(slice.primary.work.data.duration[0]?.end);

	let difference = "";

	if (date1 && date2) {
		difference = formatDateDiff(date1, date2);
	}

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Card className="my-4">
				<CardHeader className="flex flex-row items-center gap-4">
					<PrismicNextImage className="w-8 max-h-8" field={company.logo} />
					<div className="grid gap-1">
						<CardTitle>{company.name}</CardTitle>
						<CardDescription>
							{companyLink && (
								<a
									className="hover:underline hover:text-pearl"
									href={companyLink}
									rel={"noopener nofollow"}
								>
									{companyLink.replace(/(^\w+:|^)\/\//, "")}
								</a>
							)}
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<PrismicRichText field={slice.primary.work.data.description} />
					<div className="flex flex-wrap gap-2 mt-4">
						{slice.primary.work.data.tags.map((tag, index) => (
							<Badge key={index} variant="outline">
								{tag.name}
							</Badge>
						))}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					{date1 && date2 && (
						<div className="text-sm flex items-center gap-1">
							<CalendarIcon className="h-4 w-4" />
							<span>{formatDateToMonthYear(date1, lang)}</span>
							<span> - </span>
							<span>{formatDateToMonthYear(date2, lang)}</span>
							<Separator className="h-4 mx-2" orientation="vertical" />
							<span>{difference}</span>
						</div>
					)}
					<Button asChild variant="default">
						<Link href={``}>Read more</Link>
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default WorkItem;
