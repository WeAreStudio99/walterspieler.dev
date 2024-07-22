import { FC } from "react";

import EmptyLayout from "@/components/Common/EmptyLayout";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";

import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";

type Params = {
  lang: Locale;
  uid: string;
};

type Props = {
  params: Params;
};

const Lab: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <MenuInitializer isInnerMenuOpen />
      <EmptyLayout label={dictionary.selectALabPost} />
    </>
  );
};

export default Lab;
