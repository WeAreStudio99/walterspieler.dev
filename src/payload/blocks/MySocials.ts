import { Block } from "payload";

export const MySocialsBlock: Block = {
  slug: "MySocials",
  fields: [
    {
      name: "socials",
      type: "relationship",
      relationTo: "socials",
      hasMany: true,
    },
  ],
};
