import { Button } from "@/components/ui/button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { SocialDocumentData } from "../../../prismicio-types";

/**
 * Props for `SocialsList`.
 */
export type SocialsListProps = SliceComponentProps<
	Content.SocialsListSlice & {
		items: {
			social: {
				data: SocialDocumentData;
			};
		}[];
	}
>;

/**
 * Component for "SocialsList" Slices.
 */
const SocialsList = ({ slice }: SocialsListProps): JSX.Element => {
	const { items } = slice;

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="flex my-6">
				{items.map((item: { social: { data: SocialDocumentData } }, idx) => {
					if (!item.social.data || !item.social.data.url) {
						return <></>;
					}

					const link =
						"url" in item.social.data.url ? item.social.data.url.url : "/";
					return (
						<Button
							asChild
							className="pr-4 py-0 pl-0"
							key={idx}
							variant={"link"}
						>
							<a href={link} rel="noreferrer" target="_blank">
								{item.social.data.label}
							</a>
						</Button>
					);
				})}
			</div>
		</section>
	);
};

export default SocialsList;
