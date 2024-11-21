import { FC } from "react";

import { Metadata } from "next";

import ContentWrapper from "@/components/Common/ContentWrapper";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

type Params = Promise<{
  lang: Locale;
}>;

type Props = {
  params: Params;
};

const OpenSourcePage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  return <ContentWrapper></ContentWrapper>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const { openSource } = dictionary;

  const imagePath = `/images/og/open_${lang}.png`;

  return {
    title: openSource.metadata.title,
    description: openSource.metadata.description,
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
      title: openSource.metadata.title,
      description: openSource.metadata.description,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: openSource.metadata.title,
      description: openSource.metadata.description,
      url: `/`,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default OpenSourcePage;
