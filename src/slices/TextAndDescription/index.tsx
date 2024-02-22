import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextAndDescription`.
 */
export type TextAndDescriptionProps =
  SliceComponentProps<Content.TextAndDescriptionSlice>;

/**
 * Component for "TextAndDescription" Slices.
 */
const TextAndDescription = ({
  slice,
}: TextAndDescriptionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for text_and_description (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default TextAndDescription;
