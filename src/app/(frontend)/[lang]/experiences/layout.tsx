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

const getExperiencePosts = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });

  return payload.find({
    collection: "experiencePosts",
    locale: lang,
  });
};

const ExperiencesLayout: FC<Props> = async (props) => {
  const { children, params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const experiencePosts = await getExperiencePosts(lang);

  return (
    <>
      <SideMenu
        collection="experiences"
        displayReturnButton
        isInner
        lang={lang}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="experiences"
            data={experiencePosts.docs
              .map((post) => {
                if (typeof post.experience !== "number") {
                  return {
                    title: post.experience.companyName,
                    uid: post.slug,
                    startDate: post.experience?.startDate,
                    endDate: post.experience?.endDate,
                  };
                }
              })
              .filter(
                (item): item is NonNullable<typeof item> => item !== undefined,
              )}
            lang={lang}
            title={dictionary.firstLevelPages.experiences}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

export default ExperiencesLayout;
