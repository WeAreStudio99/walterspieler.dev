import { FC } from "react";

import { Metadata } from "next";
import { TypedLocale } from "payload";

import { I18N_CONFIG } from "@/lib/i18n/config";
import { generateAlternates } from "@/lib/utils";

type Params = Promise<{
  lang: TypedLocale;
  uid: string;
}>;

type Props = {
  params: Params;
};

const BlogPostPage: FC = async (props) => {
  // const { params } = props;
  // const { lang, uid } = await params;

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
      {/* <ScrollArea className="z-0 flex flex-col lg:pl-72">
        <div className="content-wrapper mt-14 lg:mt-0">
          <div className="content">
            <ArticleBreadcrumb collection="blog" lang={lang} title={uid} /> */}
      {/* <Article collection="blog" content={page} lang={lang} uid={uid} /> */}
      {/* </div>
        </div>
      </ScrollArea> */}
    </>
  );
};

export default BlogPostPage;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang, uid } = await params;

  return {
    title: `${uid} | Thibault Walterspieler`,
    description: "",
    alternates: await generateAlternates(`blog/${uid}`, lang),
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: `${uid} | Thibault Walterspieler`,
      description: "",
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "article",
      title: `${uid} | Thibault Walterspieler`,
      description: "",
      url:
        lang !== I18N_CONFIG.defaultLocale
          ? `/blog/${lang}/${uid}`
          : `/blog/${uid}`,
      images: {
        url: "/images/og/default.png",
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}
