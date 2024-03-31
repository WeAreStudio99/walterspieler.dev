import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { SocialDocumentData } from "../../../prismicio-types";

import Malt from "@/components/Icons/Company/Malt";
import { Button } from "@/components/ui/button";
import {
	InstagramLogoIcon,
	LinkedInLogoIcon,
	StackIcon,
} from "@radix-ui/react-icons";

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
			<div className="flex flex-wrap my-6 gap-4">
				{items.map((item: { social: { data: SocialDocumentData } }, idx) => {
					if (!item.social.data || !item.social.data.url) {
						return <></>;
					}

					const link =
						"url" in item.social.data.url ? item.social.data.url.url : "/";
					return (
						<Button className="" key={idx} variant="outline">
							{item.social.data.label === "Linkedin" && (
								<LinkedInLogoIcon className="mr-2 h-4 w-4" />
							)}
							{item.social.data.label === "StackOverflow" && (
								<StackIcon className="mr-2 h-4 w-4" />
							)}
							{item.social.data.label === "Instagram" && (
								<InstagramLogoIcon className="mr-2 h-4 w-4" />
							)}
							{item.social.data.label === "Malt" && <Malt className="mr-2" />}
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
