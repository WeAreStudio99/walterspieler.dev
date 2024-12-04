import { FC } from "react";

import { Metadata } from "next";
import { getPayload, TypedLocale } from "payload";

import EmptyLayout from "@/components/Common/EmptyLayout";
import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";
import { getDictionary } from "@/lib/i18n/utils";
import getMetadata from "@/lib/seo/metadata";
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

  const page = await getBlogPage(lang);

  return getMetadata(page.meta, lang);
}

export default Blog;
