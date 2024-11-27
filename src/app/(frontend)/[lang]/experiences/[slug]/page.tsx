import { FC } from "react";

import { Metadata } from "next";
import { TypedLocale, getPayload } from "payload";

import Article from "@/components/Articles/Article";
import ArticleBreadcrumb from "@/components/Articles/ArticleBreadcrumb";
import ScrollArea from "@/components/Common/ScrollArea";
import getSchemaNewsArticle from "@/lib/schema-dts/news-article";
import { generateAlternates } from "@/lib/utils";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
  slug: string;
}>;

type Props = {
  params: Params;
};

const getExperience = async (slug: string, lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  const experiencesPosts = await payload.find({
    collection: "experiencePosts",
    locale: lang,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return experiencesPosts.docs[0];
};

const WorkPage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang, slug } = await params;

  const experiencesPost = await getExperience(slug, lang);

  const jsonLd = getSchemaNewsArticle(
    experiencesPost.title,
    experiencesPost.createdAt,
    experiencesPost.updatedAt,
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
              title={experiencesPost.title}
            />
            <Article
              collection="work"
              content={experiencesPost}
              lang={lang}
              slug={slug}
            />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang, slug } = await params;

  const experiencesPost = await getExperience(slug, lang);

  return {
    title:
      experiencesPost.meta?.title ||
      `${experiencesPost.title} | Thibault Walterspieler`,
    description:
      experiencesPost.meta?.description || experiencesPost.description,
    alternates: await generateAlternates(`experiences/${slug}`, lang),
    twitter: {
      card: "summary_large_image",
      title:
        experiencesPost.meta?.title ||
        `${experiencesPost.title} | Thibault Walterspieler`,
      description:
        experiencesPost.meta?.description || experiencesPost.description || "",
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "article",
      title:
        experiencesPost.meta?.title ||
        `${experiencesPost.title} | Thibault Walterspieler`,
      publishedTime: experiencesPost.createdAt,
      modifiedTime: experiencesPost.updatedAt,
      authors: experiencesPost.meta?.authors
        ?.map((author) => {
          if (typeof author.value !== "number") {
            return author.value.fullName;
          }
        })
        .filter((author): author is string => !!author),
      tags: experiencesPost.meta?.tags?.map((tag) => tag.tag || "") || [],
      url: `/`,
      images: {
        url: "/image s/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default WorkPage;
