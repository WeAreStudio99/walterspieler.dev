"use client";
import { NavigationLink } from "@/components/NavigationLink";
import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { SliceZone } from "@prismicio/client";
import { stagger, useAnimate } from "framer-motion";
import { FC, useContext, useEffect } from "react";
import { NavigationItemSlice } from "../../prismicio-types";

type Props = {
	items: SliceZone<NavigationItemSlice>;
	lang: Locale;
};

const staggerMenuItems = stagger(0.1, { startDelay: 0.6 });

function useMenuAnimation(isOpen: boolean) {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		animate(
			".work-item",
			isOpen
				? { opacity: 1, scale: 1, filter: "blur(0px)" }
				: { opacity: 0, scale: 0.3, filter: "blur(20px)" },
			{
				duration: 0.2,
				delay: isOpen ? staggerMenuItems : 0,
			},
		);
	}, [animate, isOpen]);

	return scope;
}

const MainMenuItems: FC<Props> = ({ items, lang }) => {
	const { isMenuOpen } = useContext(MenuContext) ?? {};
	const scope = useMenuAnimation(isMenuOpen || false);

	return (
		<div className="flex w-full h-full flex-col text-sm justify-between p-4">
			<div className="flex h-full flex-col gap-3 pt-20 md:pt-0" ref={scope}>
				{items.map((item) => {
					return (
						<div className="work-item" key={item.id}>
							<NavigationLink
								key={item.id}
								label={item.primary.name || ""}
								lang={lang}
								link={item.primary.link}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MainMenuItems;
