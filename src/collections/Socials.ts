import type { CollectionConfig } from "payload";

export const Socials: CollectionConfig = {
  slug: "socials",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
  ],
};
