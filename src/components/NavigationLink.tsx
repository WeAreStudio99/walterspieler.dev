"use client";

import WeAreStudio99 from "@/components/Icons/WeAreStudio99";
import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { LinkField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { motion } from "framer-motion";
import { BoltIcon, DraftingCompass, Nfc } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, useContext, useMemo } from "react";

type Props = {
	label: string;
	link: LinkField;
	lang: Locale;
};

export const NavigationLink: FC<Props> = ({ label, link, lang }) => {
	const pathname = usePathname();
	const { closeMenu } = useContext(MenuContext) ?? {};

	const url = asLink(link);
	const isActive = useMemo(() => {
		let isActive = false;
		if (url) {
			const splittedPathname = pathname.split("/").filter(Boolean);
			const splittedUrl = url.split("/").filter(Boolean);
			if (splittedUrl.length === 0) {
				isActive = splittedPathname.length === 0;
			} else if (splittedUrl.length === 1 && splittedUrl[0] === lang) {
				isActive =
					splittedPathname.length === 1 && splittedPathname[0] === lang;
			} else {
				isActive = splittedUrl.every(
					(part, index) => splittedPathname[index] === part,
				);
			}
		}
		return isActive;
	}, [url, pathname, lang]);

	return (
		<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
			<PrismicNextLink
				className={cn(
					"group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border  transition-colors duration-200",
					isActive && "bg-chinese-black",
					!isActive && "hover:bg-eerie-light",
				)}
				field={link}
				onClick={closeMenu}
				rel={({ isExternal }) =>
					isExternal ? "noreferrer nofollow" : undefined
				}
			>
				{"type" in link ? (
					<div className="flex items-center gap-2 text-xl md:text-base">
						{link.type === "home" && <BoltIcon className="w-4" />}
						{link.type === "works" && <DraftingCompass className="w-4" />}
						{link.type === "weAreStudio99" && <WeAreStudio99 className="w-4" />}
						<span className="text-ellipsis overflow-hidden">{label}</span>
					</div>
				) : (
					<div className="flex items-center gap-2 text-xl md:text-base">
						{label === "Contact" && <Nfc className="w-4" />}
						<span className="text-ellipsis overflow-hidden">{label}</span>
					</div>
				)}
			</PrismicNextLink>
		</motion.div>
	);
};
