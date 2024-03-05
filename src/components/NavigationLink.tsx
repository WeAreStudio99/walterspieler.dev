"use client";

import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { LinkField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { BoltIcon, DraftingCompass } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, useContext } from "react";

type Props = {
	label: string;
	link: LinkField;
	lang: Locale;
};

export const NavigationLink: FC<Props> = ({ label, link }) => {
	const pathname = usePathname();
	const { closeMenu } = useContext(MenuContext) ?? {};

	let isActive = false;
	if (pathname?.length > 0) {
		const url = asLink(link);
		if (url) {
			const splittedPathname = pathname.split("/");
			const currentPathname = splittedPathname[1] ?? "";
			isActive = currentPathname === url.split("/")[1];
		}
	}

	return (
		<PrismicNextLink
			className={cn(
				"group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border hover:bg-eerie-light transition-colors duration-200",
				isActive && "bg-chinese-black",
			)}
			field={link}
			onClick={closeMenu}
			rel={({ isExternal }) => (isExternal ? "noreferrer nofollow" : undefined)}
		>
			{"type" in link && (
				<div className="flex items-center gap-2 text-3xl md:text-base">
					{link.type === "home" && <BoltIcon className="w-4" />}
					{link.type === "works" && <DraftingCompass className="w-4" />}
					<span>{label}</span>
				</div>
			)}
		</PrismicNextLink>
	);
};
