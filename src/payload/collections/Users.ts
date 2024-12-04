import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "fullName",
  },
  auth: true,
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      defaultValue: "Peter Griffin",
    },
    {
      name: "role",
      type: "text",
      localized: true,
      required: false,
    },
    {
      name: "website",
      type: "text",
      required: false,
    },
    {
      name: "owner",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
