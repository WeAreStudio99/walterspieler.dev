import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { FC } from "react";

import ContentWrapper from "@/components/Common/ContentWrapper";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = {
  lang: Locale;
};

type Props = Promise<{
  params: Params;
}>;

const OpenSourcePage: FC<Props> = async (props) => {
  const { params } = await props;
  const { lang } = params;

  const client = createClient();
  const page = await client.getSingle("openSource", { lang });

  return (
    <ContentWrapper>
      <SliceZone components={components} slices={page.data.slices} />
    </ContentWrapper>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = await props;
  const { lang } = params;

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
