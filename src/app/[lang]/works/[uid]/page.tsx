import { FC } from "react";

import { Metadata } from "next";

import ArticleBreadcrumb from "@/components/Articles/ArticleBreadcrumb";
import ScrollArea from "@/components/Common/ScrollArea";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

type Params = Promise<{
  lang: Locale;
  uid: string;
}>;

type Props = {
  params: Params;
};

const WorkPage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang, uid } = await params;

  // const jsonLd = getSchemaNewsArticle(
  //   page.data.meta_title || uid,
  //   page.first_publication_date,
  //   page.last_publication_date,
  // );

  return (
    <>
      {/* <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      /> */}
      <ScrollArea className="z-0 flex flex-col lg:pl-72">
        <div className="content-wrapper mt-14 lg:mt-0">
          <div className="content">
            <ArticleBreadcrumb collection="work" lang={lang} title={uid} />
            {/* <Article collection="work" content={page} lang={lang} uid={uid} /> */}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang, uid } = await params;

  const dictionary = await getDictionary(lang);

  const { works } = dictionary;

  return {
    title: `Thibault Walterspieler`,
    // description: page.data.meta_description,
    alternates: generateAlternates(`works/${uid}`, lang),
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      // title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
      // description: page.data.meta_description || works.metadata.description,
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "article",
      // title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
      // publishedTime: page.first_publication_date,
      // modifiedTime: page.last_publication_date,
      authors: "Thibault Walterspieler",
      tags: ["Web development"],
      // description: page.data.meta_description || works.metadata.description,
      url: `/`,
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default WorkPage;
