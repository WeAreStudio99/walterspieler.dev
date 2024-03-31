import { formatDateDiff } from "@/lib/date";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { Content, asDate, asLink } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { WorkDocumentData } from "../../../prismicio-types";

import WorkCard from "@/components/Works/WorkCard";

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
		difference = await formatDateDiff(date1, date2, lang);
	}

	const relatedWorkPostLink = slice.primary.work.data?.workPost?.uid;

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<WorkCard
				buttonLabel={dictionary.home.buttons.readMore}
				description={slice.primary.work.data.description}
				duration={{
					start: date1,
					end: date2,
					difference,
				}}
				lang={lang}
				link={companyLink || ""}
				logo={company.logo}
				relatedWorkPostLink={relatedWorkPostLink}
				tags={slice.primary.work.data.tags || []}
				title={company.name || ""}
			/>
		</section>
	);
};

export default WorkItem;
