import { CollectionConfig } from "payload";

import { CodeBlock } from "../blocks/Code";
import { ImageBlock } from "../blocks/Image";
import { ParagraphBlock } from "../blocks/Paragraph";
import { QuoteBlock } from "../blocks/Quote";

export const Pages: CollectionConfig = {
  slug: "pages",
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
      blocks: [ParagraphBlock, ImageBlock, CodeBlock, QuoteBlock],
      localized: true,
    },
  ],
};
