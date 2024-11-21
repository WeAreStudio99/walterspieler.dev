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

import { BlogPost } from "./collections/BlogPost";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
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
  collections: [Users, Media, BlogPost],
  globals: [Me],
  localization: {
    locales: ["en", "fr"],
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
      collections: ["blog-post"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `${doc.title} — Thibault Walterspieler`,
      generateDescription: ({ doc }) => doc.excerpt,
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
