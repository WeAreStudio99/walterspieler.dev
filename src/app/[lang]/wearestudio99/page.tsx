import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { FC } from "react";

import ScrollArea from "@/components/Common/ScrollArea";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import getSchemaOrganization from "@/lib/schema-dts/organization";
import { generateAlternates } from "@/lib/utils";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = {
  lang: Locale;
};

type Props = {
  params: Params;
};

const WeAreStudio99Page: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const client = createClient();
  const page = await client.getSingle("weAreStudio99", {
    lang,
    fetchLinks: ["social.label", "social.url", "social.type"],
  });

  const jsonLd = getSchemaOrganization();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ScrollArea className="flex flex-col">
        <div className="content-wrapper">
          <article className="content duration-700 animate-in fade-in">
            <SliceZone components={components} slices={page.data.slices} />
          </article>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
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
