import { Block } from 'payload';

export const ImageBlock: Block = {
  slug: "Image",
  fields: [{ name: "image", type: "upload", relationTo: "media" }],
};
