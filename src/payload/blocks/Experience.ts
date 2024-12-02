import { Block } from "payload";

export const ExperienceBlock: Block = {
  slug: "Experience",
  fields: [
    {
      name: "experiencePost",
      type: "relationship",
      relationTo: "experiencePosts",
      hasMany: true,
    },
  ],
};
