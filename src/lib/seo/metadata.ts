import { Metadata } from "next";
import { getPayload, TypedLocale } from "payload";

import { I18N_CONFIG } from "@/lib/i18n/config";
import { BlogPost, ExperiencePost, Page } from "@/payload-types";
import config from "@payload-config";

import { BASE_URL } from "../../../next.constants.mjs";

const getMe = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  return payload.findGlobal({ slug: "me", locale: lang });
};

const getMetadata = async (
  pageMeta: Page["meta"] | ExperiencePost["meta"] | BlogPost["meta"],
  lang: TypedLocale,
): Promise<Metadata> => {
  const me = await getMe(lang);

  let image;

  if (typeof pageMeta?.image !== "number" && pageMeta && pageMeta?.image) {
    image = pageMeta.image;
  }

  return {
    title: pageMeta?.title || me?.fullName || "Thibault Walterspieler",
    description: pageMeta?.description || "Portfolio of Thibault Walterspieler",
    metadataBase: new URL(BASE_URL),
    creator: me?.fullName || "Thibault Walterspieler",
    publisher: me?.fullName || "Thibault Walterspieler",
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: pageMeta?.title || "",
      description: pageMeta?.description || "",
      images: {
        url: image?.url || `/images/og/main_${lang}.png`,
        alt: image?.alt || "",
        type: image?.mimeType || "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: pageMeta?.title || "",
      siteName: "Portfolio of Thibault Walterspieler",
      description: pageMeta?.description || "",
      locale: lang,
      url: lang === I18N_CONFIG.defaultLocale ? "/" : `/${lang}`,
      images: {
        url: image?.url || `/images/og/main_${lang}.png`,
        alt: image?.alt || "",
        type: image?.mimeType || "image/png",
      },
    },
  };
};

export default getMetadata;
