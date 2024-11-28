import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload, TypedLocale } from "payload";

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

const getBlogPost = async (slug: string, lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  const blogPosts = await payload.find({
    collection: "blogPosts",
    locale: lang,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!blogPosts.docs[0]) {
    notFound();
  }

  return blogPosts.docs[0];
};

const BlogPostPage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang, slug } = await params;

  const blogPost = await getBlogPost(slug, lang);

  const jsonLd = getSchemaNewsArticle(
    blogPost.meta?.title || blogPost.title,
    blogPost.createdAt,
    blogPost.updatedAt,
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
              collection="blog"
              lang={lang}
              title={blogPost.title}
            />
            <Article
              collection="blog"
              content={blogPost}
              lang={lang}
              slug={slug}
            />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default BlogPostPage;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang, slug } = await params;

  const blogPost = await getBlogPost(slug, lang);

  return {
    title: blogPost.meta?.title || `${blogPost.title} | Thibault Walterspieler`,
    description: blogPost.meta?.description || blogPost.description,
    alternates: await generateAlternates(`blog/${slug}`, lang),
    twitter: {
      card: "summary_large_image",
      title:
        blogPost.meta?.title || `${blogPost.title} | Thibault Walterspieler`,
      description: blogPost.meta?.description || blogPost.description || "",
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "article",
      title:
        blogPost.meta?.title || `${blogPost.title} | Thibault Walterspieler`,
      publishedTime: blogPost.createdAt,
      modifiedTime: blogPost.updatedAt,
      authors: blogPost.meta?.authors
        ?.map((author) => {
          if (typeof author.value !== "number") {
            return author.value.fullName;
          }
        })
        .filter((author): author is string => !!author),
      tags: blogPost.meta?.tags?.map((tag) => tag.tag || "") || [],
      url: `/`,
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}
