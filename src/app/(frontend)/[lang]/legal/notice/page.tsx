import { FC } from "react";

import { Metadata } from "next";
import { TypedLocale } from "payload";

import ContentWrapper from "@/components/Common/ContentWrapper";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = {
  params: Params;
};

const NoticePage: FC<Props> = async () => {
  return <ContentWrapper></ContentWrapper>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);
  const { notice } = dictionary;

  const imagePath = `/images/og/notice_${lang}.png`;

  return {
    title: notice.metadata.title,
    description: notice.metadata.description,
    alternates: await generateAlternates("open-source", lang),
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: notice.metadata.title,
      description: notice.metadata.description,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: notice.metadata.title,
      description: notice.metadata.description,
      url: `/`,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default NoticePage;
