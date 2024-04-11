import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { getLocales } from "@/lib/locales";
import { createClient } from "@/prismicio";
import { FC } from "react";

import MainMenuItems from "@/components/Common/MainMenuItems";
import LangSelector from "@/components/LangSelector";
import MiscMenu from "@/components/MiscMenu";

type Props = {
	lang: Locale;
};

const MainMenuContent: FC<Props> = async (props) => {
	const { lang } = props;
	const dictionary = await getDictionary(lang);

	const client = createClient();
	const page = await client.getSingle("home", { lang });
	const locales = await getLocales(page, client);

	const navigation = await client.getByUID("navigation", "main-menu", {
		lang,
	});
	const navigationItems = navigation.data.slices;

	return (
		<>
			<header>
				<div className="hidden w-full p-4 md:flex flex-col">
					<span className="text-lg font-bold">Thibault Walterspieler</span>
					<span className="text-stone-400 text-xs">{dictionary.home.job}</span>
				</div>
				<MainMenuItems items={navigationItems} lang={lang} />
			</header>
			<footer className="flex justify-between border-t-grey md:border-t p-5  gap-3 lg:flex-col xl:flex-row ">
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
