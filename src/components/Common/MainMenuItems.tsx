"use client";

import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { motion, useAnimation } from "framer-motion";
import { FC, use, useEffect } from "react";

import NavigationLink from "@/components/NavigationLink";

type Props = {
	items: { label: string; path: string; type: string; external?: boolean }[];
	lang: Locale;
};

const MainMenuItems: FC<Props> = (props) => {
	const { items, lang } = props;

	const { isMainMenuOpen: isMenuOpen } = use(MenuContext) ?? {};
	const controls = useAnimation();

	useEffect(() => {
		if (isMenuOpen) {
			controls.start((i) => ({
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
				transition: { delay: i * 0.1 + 1.1 },
			}));
		} else {
			controls.start({
				opacity: 0,
				scale: 0.3,
				filter: "blur(20px)",
			});
		}
	}, [controls, isMenuOpen]);

	return (
		<div className="flex w-full h-full flex-col text-sm justify-between p-4">
			<nav className="md:hidden flex h-full flex-col gap-3 pt-20 md:pt-0">
				{items.map((item, i) => {
					return (
						<motion.div animate={controls} custom={i} key={item.label}>
							<NavigationLink
								label={item.label || ""}
								lang={lang}
								path={item.path}
								external={item.external}
								type={item.type}
							/>
						</motion.div>
					);
				})}
			</nav>
			<nav className="hidden md:flex h-full flex-col gap-3 pt-20 md:pt-0">
				{items.map((item) => {
					return (
						<NavigationLink
							label={item.label || ""}
							lang={lang}
							path={item.path}
							external={item.external}
							type={item.type}
						/>
					);
				})}
			</nav>
		</div>
	);
};

export default MainMenuItems;
