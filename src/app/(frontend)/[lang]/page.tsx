import { FC } from "react";

import { Metadata } from "next";
import { getPayload, TypedLocale } from "payload";

import Content from "@/components/Common/Content";
import ScrollArea from "@/components/Common/ScrollArea";
import { H1 } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";
import { I18N_CONFIG } from "@/lib/i18n/config";
import getSchemaProfilePage from "@/lib/schema-dts/profile-page";
import { generateAlternates } from "@/lib/utils";
import config from "@payload-config";

import { BASE_URL } from "../../../../next.constants.mjs";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = {
  params: Params;
};

const getMe = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  return payload.findGlobal({ slug: "me", locale: lang });
};

const getHomePage = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: "home" } },
    locale: lang,
  });

  return pages.docs[0];
};

const HomeLang: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  const me = await getMe(lang);
  const homePage = await getHomePage(lang);

  const jsonLd = getSchemaProfilePage(
    me.fullName,
    me.email,
    me.description,
    me.role,
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ScrollArea className="flex flex-col">
        <div className="content-wrapper">
          <div className="content animate-in fade-in duration-700">
            <H1 className="text-spotlight mb-4 max-w-[60vw] md:mb-4 md:max-w-full">
              {me.fullName}
              <span
                className={
                  "mt-3 block text-xl font-normal text-stone-400 md:text-2xl"
                }
              >
                {me.role}
              </span>
            </H1>
            <Separator className="my-6" />
            <Content content={homePage.content} lang={lang} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const me = await getMe(lang);
  const homePage = await getHomePage(lang);

  let image;

  if (
    typeof homePage.meta?.image !== "number" &&
    homePage.meta &&
    homePage.meta?.image
  ) {
    image = homePage.meta.image;
  }

  return {
    metadataBase: new URL(BASE_URL),
    publisher: me.fullName,
    creator: me.fullName,
    title: homePage.meta?.title,
    description: homePage.meta?.description,
    alternates: await generateAlternates("", lang),
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: homePage.meta?.title || "",
      description: homePage.meta?.description || "",
      images: {
        url: image?.url || `/images/og/main_${lang}.png`,
        alt: image?.alt || "",
        type: image?.mimeType || "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: homePage.meta?.title || "",
      siteName: "Portfolio of Thibault Walterspieler",
      description: homePage.meta?.description || "",
      locale: lang,
      url: lang === I18N_CONFIG.defaultLocale ? "/" : `/${lang}`,
      images: {
        url: image?.url || `/images/og/main_${lang}.png`,
        alt: image?.alt || "",
        type: image?.mimeType || "image/png",
      },
    },
  };
}

export default HomeLang;
