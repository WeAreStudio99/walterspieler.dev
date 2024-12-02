import type { CollectionConfig } from "payload";

export const Socials: CollectionConfig = {
  slug: "socials",
  admin: {
    useAsTitle: "label",
  },
  fields: [
    {
      name: "name",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "label",
      type: "text",
      required: true,
      defaultValue: "Instagram",
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
  ],
};
