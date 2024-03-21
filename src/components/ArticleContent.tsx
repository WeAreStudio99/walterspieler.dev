import { H1 } from "@/components/Typography";
import { Separator } from "@/components/ui/separator";
import { components } from "@/slices";
import { Content, asLink } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { FC } from "react";
import { Simplify } from "../../prismicio-types";

type Props = {
	company: Simplify<Content.WorkDocumentDataCompanyItem>;
	page: Content.WorkPostDocument & {
		data: {
			work: {
				data: Pick<Content.WorkDocument["data"], "company">;
			};
		};
	};
};

const ArticleContent: FC<Props> = ({ company, page }) => {
	const companyLink = asLink(company?.website);
	return (
		<>
			<div className="flex flex-col mb-8">
				<H1 className="mb-5">{company.name}</H1>
				{companyLink && (
					<a
						className="hover:underline hover:text-pearl-light mb-2"
						href={companyLink}
						rel={"noopener nofollow"}
					>
						{companyLink.replace(/(^\w+:|^)\/\//, "")}
					</a>
				)}
				<span className="text-stone-400">
					<PrismicRichText field={company.description} />
				</span>
				<Separator className="mt-8" />
			</div>
			<SliceZone components={components} slices={page.data.slices} />
		</>
	);
};

export default ArticleContent;
