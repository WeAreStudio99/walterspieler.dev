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
import { getDictionary } from "@/lib/i18n/utils";
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
				data: WorkDocumentData & { workPost: { uid: string } };
			};
		};
	}
>;

/**
 * Component for "WorkItem" Slices.
 */
const WorkItem = async ({ slice }: WorkItemProps) => {
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

	const dictionary = await getDictionary(lang);

	const date1 = asDate(slice.primary.work.data.duration[0]?.start);
	const date2 = asDate(slice.primary.work.data.duration[0]?.end);

	let difference = "";

	if (date1 && date2) {
		difference = await formatDateDiff(date1, date2);
	}

	const relatedWorkPostLink = slice.primary.work.data?.workPost?.uid;

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Card className="my-8">
				<CardHeader className="flex flex-row items-center gap-4">
					<PrismicNextImage className="w-8 max-h-8" field={company.logo} />
					<div className="grid gap-1">
						<CardTitle>{company.name}</CardTitle>
						{date1 && date2 && (
							<div className="text-sm flex items-center md:gap-1">
								<CalendarIcon className="h-4 w-4 mr-1" />
								<span>{formatDateToMonthYear(date1, lang)}</span>
								<span> - </span>
								<span>{formatDateToMonthYear(date2, lang)}</span>
								<Separator
									className="hidden md:block h-4 mx-2"
									orientation="vertical"
								/>
								<span className="hidden md:block">{difference}</span>
							</div>
						)}
						<CardDescription>
							{companyLink && (
								<a
									aria-label={`${company.name} website`}
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
				<CardFooter className="flex items-start justify-between flex-col md:flex-row gap-5">
					{relatedWorkPostLink && (
						<div className="flex">
							<Button asChild variant="outline">
								<Link
									aria-label={`Read more about ${company.name}`}
									href={
										lang !== "en-gb"
											? `/${lang}/works/${relatedWorkPostLink}`
											: `/works/${relatedWorkPostLink}`
									}
								>
									{dictionary.home.buttons.readMore}
								</Link>
							</Button>
						</div>
					)}
				</CardFooter>
			</Card>
		</section>
	);
};

export default WorkItem;
