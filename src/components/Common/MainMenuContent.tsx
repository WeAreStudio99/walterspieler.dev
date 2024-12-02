import { FC } from "react";

import { TypedLocale } from "payload";

import MainMenuItems from "@/components/Common/MainMenuItems";
import LangSelector from "@/components/LangSelector";
import MiscMenu from "@/components/MiscMenu";
import { getDictionary } from "@/lib/i18n/utils";
import config from "@payload-config";
import { MainMenu, Me } from "@payload-types";

type Props = {
  lang: TypedLocale;
  me: Me;
  mainMenu: MainMenu;
};

const MainMenuContent: FC<Props> = async (props) => {
  const { lang, me, mainMenu } = props;
  const dictionary = await getDictionary(lang);
  const { localization } = await config;

  return (
    <>
      <header>
        <div className="hidden w-full flex-col p-4 md:flex">
          <span className="text-lg font-bold">{me.fullName}</span>
          <span className="text-xs text-stone-400">{me.role}</span>
        </div>
        <MainMenuItems items={mainMenu.menuItems} lang={lang} />
      </header>
      <footer className="border-t-grey flex justify-between gap-3 p-5 md:border-t lg:flex-col xl:flex-row">
        <MiscMenu
          labels={{ legalNotice: dictionary.menuItems.legalNotice }}
          title={dictionary.menuItems.other}
        />
        {localization && (
          <LangSelector
            currentLang={lang}
            locales={localization.locales}
            title={dictionary.languages}
          />
        )}
      </footer>
    </>
  );
};

export default MainMenuContent;
