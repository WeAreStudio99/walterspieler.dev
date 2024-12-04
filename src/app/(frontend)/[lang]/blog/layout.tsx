import { FC, PropsWithChildren, Suspense } from "react";

import { getPayload, TypedLocale } from "payload";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";
import { getDictionary } from "@/lib/i18n/utils";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = PropsWithChildren<{
  params: Params;
}>;

const getBlogPosts = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  return payload.find({
    collection: "blogPosts",
    locale: lang,
  });
};

const BlogLayout: FC<Props> = async (props) => {
  const { children, params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const blogPosts = await getBlogPosts(lang);

  return (
    <>
      <SideMenu collection="blog" displayReturnButton isInner lang={lang}>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="blog"
            data={blogPosts.docs.map((post) => ({
              title: post.title,
              uid: post.slug,
              startDate: post.createdAt,
            }))}
            lang={lang}
            title={dictionary.firstLevelPages.blog}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

export default BlogLayout;
