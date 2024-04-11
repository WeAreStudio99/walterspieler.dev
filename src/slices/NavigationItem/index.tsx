import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

export type Props = SliceComponentProps<Content.NavigationItemSlice>;

const NavigationItem: FC<Props> = (props) => {
	const { slice } = props;

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			Placeholder component for navigation_item (variation: {slice.variation})
			Slices
		</section>
	);
};

export default NavigationItem;
