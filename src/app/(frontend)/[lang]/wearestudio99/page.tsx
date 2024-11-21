import { FC } from "react";

import { Metadata } from "next";

import ScrollArea from "@/components/Common/ScrollArea";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import getSchemaOrganization from "@/lib/schema-dts/organization";
import { generateAlternates } from "@/lib/utils";

type Params = Promise<{
  lang: Locale;
}>;

type Props = {
  params: Params;
};

const WeAreStudio99Page: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  const jsonLd = getSchemaOrganization();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ScrollArea className="flex flex-col">
        <div className="content-wrapper">
          <article className="content duration-700 animate-in fade-in"></article>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const { weAreStudio99 } = dictionary;

  const imagePath = `/images/og/99_${lang}.png`;

  return {
    title: weAreStudio99.metadata.title,
    description: weAreStudio99.metadata.description,
    alternates: generateAlternates("wearestudio99", lang),
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: weAreStudio99.metadata.title,
      description: weAreStudio99.metadata.description,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: weAreStudio99.metadata.title,
      description: weAreStudio99.metadata.description,
      url: `/`,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default WeAreStudio99Page;
