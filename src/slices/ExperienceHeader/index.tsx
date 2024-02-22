import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ExperienceHeader`.
 */
export type ExperienceHeaderProps =
  SliceComponentProps<Content.ExperienceHeaderSlice>;

/**
 * Component for "ExperienceHeader" Slices.
 */
const ExperienceHeader = ({ slice }: ExperienceHeaderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for experience_header (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ExperienceHeader;
