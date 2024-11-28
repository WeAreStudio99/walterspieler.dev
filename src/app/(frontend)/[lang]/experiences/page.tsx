import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload, TypedLocale } from "payload";

import EmptyLayout from "@/components/Common/EmptyLayout";
import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
  uid: string;
}>;

type Props = {
  params: Params;
};

const getExperiencePage = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  const pages = await payload.find({
    collection: "pages",
    locale: lang,
    where: {
      slug: {
        equals: "experiences",
      },
    },
  });

  if (!pages.docs[0]) {
    notFound();
  }

  return pages.docs[0];
};

const Experiences: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <MenuInitializer isInnerMenuOpen />
      <EmptyLayout label={dictionary.selectAnExperience} />
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const experiencePage = await getExperiencePage(lang);

  return {
    title:
      experiencePage.meta?.title ||
      `${experiencePage.title} | Thibault Walterspieler`,
    description: experiencePage.meta?.description,
    alternates: await generateAlternates("experiences", lang),
    twitter: {
      card: "summary_large_image",
      title:
        experiencePage.meta?.title ||
        `${experiencePage.title} | Thibault Walterspieler`,
      description: experiencePage.meta?.description || "",
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "article",
      title:
        experiencePage.meta?.title ||
        `${experiencePage.title} | Thibault Walterspieler`,
      publishedTime: experiencePage.createdAt,
      modifiedTime: experiencePage.updatedAt,
      authors: experiencePage.meta?.authors
        ?.map((author) => {
          if (typeof author.value !== "number") {
            return author.value.fullName;
          }
        })
        .filter((author): author is string => !!author),
      tags: experiencePage.meta?.tags?.map((tag) => tag.tag || "") || [],
      url: `/`,
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default Experiences;
