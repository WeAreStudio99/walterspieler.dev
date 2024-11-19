import { FC, PropsWithChildren, Suspense } from "react";

import { Metadata } from "next";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

type Params = {
  lang: Locale;
};

type Props = Promise<
  PropsWithChildren<{
    params: Params;
  }>
>;

const BlogLayout: FC<Props> = async (props) => {
  const { children, params } = await props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <SideMenu collection="blog" displayReturnButton isInner lang={lang}>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="blog"
            data={[]}
            lang={lang}
            title={dictionary.firstLevelPages.blog}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = await props;
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  const { blog } = dictionary;

  const imagePath = `/images/og/blog_${lang}.png`;

  return {
    title: blog.metadata.title,
    description: blog.metadata.description,
    alternates: generateAlternates("blog", lang),
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: blog.metadata.title,
      description: blog.metadata.description,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: blog.metadata.title,
      description: blog.metadata.description,
      url: `/`,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default BlogLayout;
