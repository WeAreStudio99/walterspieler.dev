import { CodeBlock } from "../blocks/Code";
import { ImageBlock } from "../blocks/Image";
import { ParagraphBlock } from "../blocks/Paragraph";
import { QuoteBlock } from "../blocks/Quote";

import type { CollectionConfig } from "payload";

export const ExperiencePosts: CollectionConfig = {
  slug: "experiencePosts",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "experience",
  },
  fields: [
    {
      name: "experience",
      type: "relationship",
      relationTo: "experiences",
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
