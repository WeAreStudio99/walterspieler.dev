import LangSelector from "@/components/LangSelector";
import MiscMenu from "@/components/MiscMenu";
import { NavigationLink } from "@/components/NavigationLink";
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
			<div className="hidden bg-chinese-black  w-full p-4 md:flex flex-col">
				<span className="text-xl font-bold">Thibault Walterspieler</span>
				<span className="text-stone-400 text-xs">Fullstack engineer</span>
			</div>
			<div className="flex w-full h-full flex-col text-sm justify-between p-4">
				<div className="flex h-full flex-col gap-3">
					{navigationItems.map((item) => {
						return (
							<NavigationLink
								key={item.id}
								label={item.primary.name || ""}
								link={item.primary.link}
							/>
						);
					})}
				</div>
			</div>
			<div className="flex justify-between border-t-grey md:border-t py-8 px-4">
				<MiscMenu />
				<LangSelector currentLang={lang} locales={locales} />
			</div>
		</>
	);
};
