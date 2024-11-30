import { FC } from "react";

import { Metadata } from "next";
import { getPayload, TypedLocale } from "payload";

import Content from "@/components/Common/Content";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
}>;

type Props = {
  params: Params;
};

const getLegalNoticePage = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: "notice" } },
    locale: lang,
  });

  return pages.docs[0];
};

const NoticePage: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = await params;

  const page = await getLegalNoticePage(lang);

  return (
    <div className="content-wrapper">
      <div className="content animate-in fade-in duration-700">
        <Content content={page.content} lang={lang} />
      </div>
    </div>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const page = await getLegalNoticePage(lang);

  return getMetadata(page.meta, lang);
}

export default NoticePage;
