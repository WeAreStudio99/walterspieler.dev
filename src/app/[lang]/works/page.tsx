import { Metadata } from "next";
import { FC } from "react";

import EmptyLayout from "@/components/Common/EmptyLayout";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";

type Params = {
  lang: Locale;
  uid: string;
};

type Props = {
  params: Params;
};

const Works: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <MenuInitializer isInnerMenuOpen />
      <EmptyLayout label={dictionary.selectAWork} />
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  const { works } = dictionary;

  const imagePath = `/images/og/works_${lang}.png`;

  return {
    title: works.metadata.title,
    description: works.metadata.description,
    alternates: generateAlternates("works", lang),
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: works.metadata.title,
      description: works.metadata.description,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: works.metadata.title,
      description: works.metadata.description,
      url: `/`,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default Works;
