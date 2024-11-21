import { GlobalConfig } from "payload";

export const Me: GlobalConfig = {
  slug: "me",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "fullName",
          type: "text",
          required: true,
          defaultValue: "Thibault Walterspieler",
        },
        {
          name: "role",
          type: "text",
          required: true,
          defaultValue: "Software Engineer",
        },
      ],
    },
  ],
};
