import { NavigationLink } from "@/components/NavigationLink";
import { Locale } from "@/lib/i18n/types";
import { SliceZone } from "@prismicio/client";
import { FC } from "react";
import { NavigationItemSlice } from "../../prismicio-types";

type Props = {
	items: SliceZone<NavigationItemSlice>;
	lang: Locale;
};

const MainMenuItems: FC<Props> = ({ items, lang }) => {
	return (
		<div className="flex w-full h-full flex-col text-sm justify-between p-4">
			<div className="flex h-full flex-col gap-3 pt-20 md:pt-0">
				{items.map((item) => {
					return (
						<NavigationLink
							key={item.id}
							label={item.primary.name || ""}
							lang={lang}
							link={item.primary.link}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default MainMenuItems;
