import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { buildConfig } from "payload";
import sharp from "sharp";

import { BlogPosts } from "./collections/BlogPosts";
import { ExperiencePosts } from "./collections/ExperiencePosts";
import { Experiences } from "./collections/Experiences";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Socials } from "./collections/Socials";
import { Users } from "./collections/Users";
import { MainMenu } from "./globals/MainMenu";
import { Me } from "./globals/Me";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    BlogPosts,
    Pages,
    Experiences,
    ExperiencePosts,
    Socials,
  ],
  globals: [Me, MainMenu],
  localization: {
    locales: [
      {
        code: "en",
        label: "English 🇬🇧",
      },
      {
        code: "fr",
        label: "Français 🇫🇷",
      },
    ],
    defaultLocale: "en",
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ["blogPosts", "pages", "experiencePosts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `${doc.title} | Thibault Walterspieler`,
      generateDescription: ({ doc }) => doc.excerpt || doc.description || "",
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: "tags",
          type: "array",
          label: "Tags",
          fields: [
            {
              name: "tag",
              type: "text",
            },
          ],
        },
        {
          name: "authors",
          type: "relationship",
          relationTo: ["users"],
          hasMany: true,
        },
      ],
    }),
    payloadCloudPlugin(),
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: "public-read",
      },
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: "contact@walterspieler.dev",
    defaultFromName: "Payload CMS | Walterspieler",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
});
