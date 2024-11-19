import { FC, PropsWithChildren, Suspense } from "react";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";

type Params = {
  lang: Locale;
};

type Props = PropsWithChildren<{
  params: Params;
}>;

const WorksLayout: FC<Props> = async (props) => {
  const { children, params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <SideMenu collection="works" displayReturnButton isInner lang={lang}>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="works"
            data={[]}
            lang={lang}
            title={dictionary.firstLevelPages.works}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

export default WorksLayout;
