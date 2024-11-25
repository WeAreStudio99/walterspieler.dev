import { CodeBlock } from '../blocks/Code';
import { ImageBlock } from '../blocks/Image';
import { ParagraphBlock } from '../blocks/Paragraph';
import { QuoteBlock } from '../blocks/Quote';

import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "authors",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
    },
    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      localized: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "content",
      type: "blocks",
      blocks: [ParagraphBlock, ImageBlock, CodeBlock, QuoteBlock],
      localized: true,
    },
  ],
};
