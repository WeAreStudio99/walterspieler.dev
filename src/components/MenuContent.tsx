import LangSelector from "@/components/LangSelector";
import { NavigationLink } from "@/components/NavigationLink";
import { Locale } from "@/lib/i18n/types";
import { getLocales } from "@/lib/locales";
import { createClient } from "@/prismicio";
import { FC } from "react";

type Props = {
	lang: Locale;
};

export const MenuContent: FC<Props> = async ({ lang }) => {
	// const pathname = usePathname();
	// const currentPage = pathname.split("/").pop();

	// const prismicPageName =
	// 	currentPage === "" ? "home" : (currentPage as "home" | "works");

	const client = createClient();
	const page = await client.getSingle("works", { lang });
	const locales = await getLocales(page, client);

	const navigation = await client.getByUID("navigation", "main-menu", {
		lang,
	});
	const navigationItems = navigation.data.slices;

	return (
		<div className="flex w-full flex-col text-sm">
			<div className="flex flex-col gap-1">
				{navigationItems.map((item) => {
					return (
						<NavigationLink
							key={item.id}
							label={item.primary.name || ""}
							link={item.primary.link}
						/>
					);
				})}
				<LangSelector currentLang={lang} locales={locales} />
			</div>
		</div>
	);
};
