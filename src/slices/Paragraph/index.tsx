import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import ParagraphBlock from "@/components/Common/Paragraph";

/**
 * Props for `Paragraph`.
 */
export type ParagraphProps = SliceComponentProps<Content.ParagraphSlice>;

/**
 * Component for "Paragraph" Slices.
 */
const Paragraph = ({ slice }: ParagraphProps): JSX.Element => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<ParagraphBlock field={slice.primary.text} />
		</section>
	);
};

export default Paragraph;
