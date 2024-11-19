import { FC } from "react";

import { Metadata } from "next";

import ContentWrapper from "@/components/Common/ContentWrapper";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

type Params = {
  lang: Locale;
};

type Props = Promise<{
  params: Params;
}>;

const NoticePage: FC<Props> = async (props) => {
  const { params } = await props;
  const { lang } = params;

  return <ContentWrapper></ContentWrapper>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = await props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  const { notice } = dictionary;

  const imagePath = `/images/og/notice_${lang}.png`;

  return {
    title: notice.metadata.title,
    description: notice.metadata.description,
    alternates: generateAlternates("open-source", lang),
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
