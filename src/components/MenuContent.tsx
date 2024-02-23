import { NavigationLink } from "@/components/NavigationLink";
import { Locale } from "@/lib/i18n/types";
import { createClient } from "@/prismicio";
import { FC } from "react";

type Props = {
	lang: Locale;
};

export const MenuContent: FC<Props> = async ({ lang }) => {
	const client = createClient();
	const navigation = await client.getByUID("navigation", "main-menu", { lang });
	const navigationItems = navigation.data.slices;

	console.log(navigationItems[0]);

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
			</div>
		</div>
	);
};
