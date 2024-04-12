import { FC } from "react";

import MainMenuItems from "@/components/Common/MainMenuItems";
import LangSelector from "@/components/LangSelector";
import MiscMenu from "@/components/MiscMenu";

import { I18N_CONFIG } from "@/lib/i18n/config";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { getLocales } from "@/lib/locales";

import { createClient } from "@/prismicio";

type Props = {
  lang: Locale;
};

const MainMenuContent: FC<Props> = async (props) => {
  const { lang } = props;
  const dictionary = await getDictionary(lang);

  const client = createClient();
  const page = await client.getSingle("home", { lang });
  const locales = await getLocales(page, client);

  const menuItems: {
    label: string;
    type: string;
    path: string;
    external?: boolean;
  }[] = [
    {
      label: dictionary.firstLevelPages.home,
      path: lang !== I18N_CONFIG.defaultLocale ? `/${lang}` : "/",
      type: "home",
    },
    {
      label: dictionary.firstLevelPages.works,
      path: lang !== I18N_CONFIG.defaultLocale ? `/${lang}/works` : "/works",
      type: "works",
    },
    {
      label: dictionary.firstLevelPages.blog,
      path: lang !== I18N_CONFIG.defaultLocale ? `/${lang}/blog` : "/blog",
      type: "blog",
    },
    {
      label: dictionary.firstLevelPages.weAreStudio99,
      path:
        lang !== I18N_CONFIG.defaultLocale
          ? `/${lang}/wearestudio99`
          : "/wearestudio99",
      type: "weAreStudio99",
    },
    {
      label: "Contact",
      path: "https://cal.com/thibaultwalterspieler",
      external: true,
      type: "contact",
    },
  ];

  const navigation = await client.getByUID("navigation", "main-menu", {
    lang,
  });
  const navigationItems = navigation.data.slices;

  return (
    <>
      <header>
        <div className="hidden w-full flex-col p-4 md:flex">
          <span className="text-lg font-bold">Thibault Walterspieler</span>
          <span className="text-xs text-stone-400">{dictionary.home.job}</span>
        </div>
        <MainMenuItems items={menuItems} lang={lang} />
      </header>
      <footer className="flex justify-between gap-3 border-t-grey p-5  md:border-t lg:flex-col xl:flex-row ">
        <MiscMenu
          labels={{ legalNotice: dictionary.menuItems.legalNotice }}
          title={dictionary.menuItems.other}
        />
        <LangSelector
          currentLang={lang}
          locales={locales}
          title={dictionary.languages}
        />
      </footer>
    </>
  );
};

export default MainMenuContent;
