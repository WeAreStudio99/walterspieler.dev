import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

import ParagraphBlock from "@/components/Common/Paragraph";

export type Props = SliceComponentProps<Content.ParagraphSlice>;

const Paragraph: FC<Props> = (props) => {
  const { slice } = props;

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
