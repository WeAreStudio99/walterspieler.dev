import { Block } from "payload";

export const QuoteBlock: Block = {
  slug: "Quote",
  fields: [{ name: "quote", type: "richText", localized: true }],
};
