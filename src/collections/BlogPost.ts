import type { Block, CollectionConfig } from "payload";

const ParagraphBlock: Block = {
  slug: "Paragraph",
  fields: [{ name: "paragraph", type: "richText" }],
};

const ImageBlock: Block = {
  slug: "Image",
  fields: [{ name: "image", type: "upload", relationTo: "media" }],
};

const CodeBlock: Block = {
  slug: "Code",
  fields: [{ name: "code", type: "code" }],
};

const QuoteBlock: Block = {
  slug: "Quote",
  fields: [{ name: "quote", type: "richText" }],
};

export const BlogPost: CollectionConfig = {
  slug: "blog-post",
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
