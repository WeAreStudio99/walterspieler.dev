import { Block } from "payload";

export const ButtonBlock: Block = {
  slug: "button",
  fields: [
    { name: "label", type: "text", localized: true },
    {
      name: "isExternal",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "page",
      type: "relationship",
      relationTo: "pages",
    },
    {
      name: "externalUrl",
      type: "text",
    },
  ],
};
