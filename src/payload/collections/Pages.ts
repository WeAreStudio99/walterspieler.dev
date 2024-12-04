import { CollectionConfig } from "payload";

import { ButtonBlock } from "../blocks/Button";
import { CodeBlock } from "../blocks/Code";
import { ExperienceBlock } from "../blocks/Experience";
import { ImageBlock } from "../blocks/Image";
import { MySocialsBlock } from "../blocks/MySocials";
import { ParagraphBlock } from "../blocks/Paragraph";
import { QuoteBlock } from "../blocks/Quote";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      unique: true,
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "content",
      type: "blocks",
      blocks: [
        ParagraphBlock,
        ImageBlock,
        CodeBlock,
        QuoteBlock,
        ExperienceBlock,
        MySocialsBlock,
        ButtonBlock,
      ],
      localized: true,
    },
  ],
};
