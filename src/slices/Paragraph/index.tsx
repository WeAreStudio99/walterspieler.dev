import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
			<PrismicRichText
				components={{
					heading1: ({ children }) => (
						<h1 className="text-3xl font-bold mb-5">{children}</h1>
					),
					paragraph: ({ children }) => <p>{children}</p>,
				}}
				field={slice.primary.text}
			/>
		</section>
	);
};

export default Paragraph;
