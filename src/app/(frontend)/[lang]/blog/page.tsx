import { FC } from "react";

import { TypedLocale } from "payload";

import EmptyLayout from "@/components/Common/EmptyLayout";
import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";
import { getDictionary } from "@/lib/i18n/utils";

type Params = Promise<{
  lang: TypedLocale;
  uid: string;
}>;

type Props = {
  params: Params;
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

export default Blog;
