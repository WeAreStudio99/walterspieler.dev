import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TypedLocale, getPayload } from "payload";

import Article from "@/components/Articles/Article";
import ArticleBreadcrumb from "@/components/Articles/ArticleBreadcrumb";
import ScrollArea from "@/components/Common/ScrollArea";
import getSchemaNewsArticle from "@/lib/schema-dts/news-article";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
  slug: string;
}>;

type Props = {
  params: Params;
};

const getExperiencePost = async (slug: string, lang: TypedLocale) => {
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

  if (!experiencesPosts.docs[0]) {
    notFound();
  }

  return experiencesPosts.docs[0];
};

const ExperiencePage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang, slug } = await params;

  const experiencesPost = await getExperiencePost(slug, lang);

  const jsonLd = getSchemaNewsArticle(
    experiencesPost.meta?.title || experiencesPost.title,
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
              collection="experiences"
              lang={lang}
              title={experiencesPost.title}
            />
            <Article
              collection="experiences"
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

  const page = await getExperiencePost(slug, lang);

  return getMetadata(page.meta, lang);
}

export default ExperiencePage;
