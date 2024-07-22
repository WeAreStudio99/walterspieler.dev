import { Metadata } from "next";
import { FC, PropsWithChildren, Suspense } from "react";

import LoadingSpinner from "@/components/Common/LoadingSpinner";
import SideMenu from "@/components/Common/SideMenu";
import SideMenuContent from "@/components/Common/SideMenuContent";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { generateAlternates } from "@/lib/utils";

type Params = {
  lang: Locale;
};

type Props = PropsWithChildren<{
  params: Params;
}>;

const experiences = [
  {
    title: "Binocular ML",
    uid: "binocular-ml",
    startDate: new Date("2021-09-01"),
  },
];

const LabLayout: FC<Props> = async (props) => {
  const { children, params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <SideMenu collection="lab" displayReturnButton isInner lang={lang}>
        <Suspense fallback={<LoadingSpinner />}>
          <SideMenuContent
            collection="lab"
            data={experiences}
            lang={lang}
            title={dictionary.firstLevelPages.lab}
          />
        </Suspense>
      </SideMenu>
      <div className="relative flex-1">{children}</div>
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  const { lab } = dictionary;

  const imagePath = `/images/og/lab_${lang}.png`;

  return {
    title: lab.metadata.title,
    description: lab.metadata.description,
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
      title: lab.metadata.title,
      description: lab.metadata.description,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: lab.metadata.title,
      description: lab.metadata.description,
      url: `/`,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default LabLayout;
