import LangSelector from "@/components/LangSelector";
import MainMenuItems from "@/components/MainMenuItems";
import MiscMenu from "@/components/MiscMenu";
import { Locale } from "@/lib/i18n/types";
import { getLocales } from "@/lib/locales";
import { createClient } from "@/prismicio";
import { FC } from "react";

type Props = {
	lang: Locale;
};

export const MenuContent: FC<Props> = async ({ lang }) => {
	const client = createClient();
	const page = await client.getSingle("home", { lang });
	const locales = await getLocales(page, client);

	const navigation = await client.getByUID("navigation", "main-menu", {
		lang,
	});
	const navigationItems = navigation.data.slices;

	return (
		<>
			<div>
				<div className="hidden w-full p-4 md:flex flex-col">
					<span className="text-lg font-bold">Thibault Walterspieler</span>
					<span className="text-stone-400 text-xs">Fullstack engineer</span>
				</div>
				<MainMenuItems items={navigationItems} lang={lang} />
			</div>
			<div className="flex justify-between border-t-grey md:border-t p-5  gap-3 lg:flex-col xl:flex-row ">
				<MiscMenu lang={lang} />
				<LangSelector currentLang={lang} locales={locales} />
			</div>
		</>
	);
};
