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

import { BlogPosts } from "@/payload/collections/BlogPosts";
import { ExperiencePosts } from "@/payload/collections/ExperiencePosts";
import { Experiences } from "@/payload/collections/Experiences";
import { Media } from "@/payload/collections/Media";
import { Pages } from "@/payload/collections/Pages";
import { Socials } from "@/payload/collections/Socials";
import { Users } from "@/payload/collections/Users";
import { MainMenu } from "@/payload/globals/MainMenu";
import { Me } from "@/payload/globals/Me";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload", "payload-types.ts"),
  },
  collections: [
    Users,
    Pages,
    BlogPosts,
    ExperiencePosts,
    Experiences,
    Socials,
    Media,
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
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    migrationDir: path.resolve(dirname, "payload/migrations"),
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
