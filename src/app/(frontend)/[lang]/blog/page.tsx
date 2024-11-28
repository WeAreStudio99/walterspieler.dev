import { FC } from "react";

import { Metadata } from "next";
import { getPayload, TypedLocale } from "payload";

import EmptyLayout from "@/components/Common/EmptyLayout";
import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
  uid: string;
}>;

type Props = {
  params: Params;
};

const getBlogPage = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  const pages = await payload.find({
    collection: "pages",
    locale: lang,
    where: {
      slug: {
        equals: "blog",
      },
    },
  });

  return pages.docs[0];
};

const Blog: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <MenuInitializer isInnerMenuOpen />
      <EmptyLayout label={dictionary.selectABlogPost} />
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const blogPage = await getBlogPage(lang);

  return {
    title: blogPage.meta?.title || `${blogPage.title} | Thibault Walterspieler`,
    description: blogPage.meta?.description,
    alternates: await generateAlternates("blog", lang),
    twitter: {
      card: "summary_large_image",
      title:
        blogPage.meta?.title || `${blogPage.title} | Thibault Walterspieler`,
      description: blogPage.meta?.description || "",
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "article",
      title:
        blogPage.meta?.title || `${blogPage.title} | Thibault Walterspieler`,
      publishedTime: blogPage.createdAt,
      modifiedTime: blogPage.updatedAt,
      authors: blogPage.meta?.authors
        ?.map((author) => {
          if (typeof author.value !== "number") {
            return author.value.fullName;
          }
        })
        .filter((author): author is string => !!author),
      tags: blogPage.meta?.tags?.map((tag) => tag.tag || "") || [],
      url: `/`,
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default Blog;
