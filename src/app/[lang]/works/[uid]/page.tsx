import { Content } from "@prismicio/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

import Article from "@/components/Articles/Article";
import ArticleBreadcrumb from "@/components/Articles/ArticleBreadcrumb";
import ScrollArea from "@/components/Common/ScrollArea";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import getSchemaNewsArticle from "@/lib/schema-dts/news-article";
import { generateAlternates } from "@/lib/utils";

import { createClient } from "@/prismicio";

type Params = {
  lang: Locale;
  uid: string;
};

type Props = {
  params: Params;
};

const WorkPage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang, uid } = params;

  const client = createClient();
  const page = await client
    .getByUID<
      Content.WorkPostDocument & {
        data: {
          work: {
            data: Pick<Content.WorkDocument["data"], "company">;
          };
        };
      }
    >("workPost", uid, {
      lang,
      fetchLinks: [
        "work.company",
        "work.description",
        "work.duration",
        "work.tags",
        "work.logo",
      ],
    })
    .catch(() => notFound());

  const jsonLd = getSchemaNewsArticle(
    page.data.meta_title || uid,
    page.first_publication_date,
    page.last_publication_date,
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ScrollArea className="z-0 flex flex-col lg:pl-72">
        <div className="content-wrapper mt-14 lg:mt-0">
          <div className="content">
            <ArticleBreadcrumb
              collection="work"
              lang={lang}
              title={page.data.title || uid}
            />
            <Article collection="work" content={page} lang={lang} uid={uid} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, uid } = params;
  const dictionary = await getDictionary(lang);

  const client = createClient();
  const page = await client
    .getByUID("workPost", uid, {
      lang,
    })
    .catch(() => notFound());

  const { works } = dictionary;

  return {
    title: `${page.data.meta_title} | Thibault Walterspieler`,
    description: page.data.meta_description,
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
      title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
      description: page.data.meta_description || works.metadata.description,
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "article",
      title: `${page.data.meta_title || uid} | Thibault Walterspieler`,
      publishedTime: page.first_publication_date,
      modifiedTime: page.last_publication_date,
      authors: "Thibault Walterspieler",
      tags: ["Web development"],
      description: page.data.meta_description || works.metadata.description,
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
