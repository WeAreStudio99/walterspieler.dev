"use client";

import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { LinkField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import { FC, use, useMemo } from "react";

import WeAreStudio99 from "@/components/Icons/Company/WeAreStudio99";
import {
	BoltIcon,
	DraftingCompass,
	ExternalLink,
	Nfc,
	Sparkle,
} from "lucide-react";

type Props = {
	label: string;
	link: LinkField;
	lang: Locale;
};

const NavigationLink: FC<Props> = ({ label, link, lang }) => {
	const pathname = usePathname();
	const { closeMainMenu = () => {}, setIsInnerMenuOpen = () => {} } =
		use(MenuContext) ?? {};

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
		<PrismicNextLink
			className={cn(
				"group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border duration-200 hover:scale-[1.01] active:scale-[0.98] active:bg-eerie-light transition-all",
				{
					"bg-chinese-black": isActive,
					"hover:bg-eerie-light": !isActive,
				},
			)}
			field={link}
			onClick={() => {
				closeMainMenu();
				setIsInnerMenuOpen(true);
			}}
			rel={({ isExternal }) => (isExternal ? "noreferrer nofollow" : undefined)}
		>
			{"type" in link ? (
				<div className="flex items-center gap-2 text-xl md:text-base">
					{link.type === "home" && <BoltIcon className="w-4" />}
					{link.type === "works" && <DraftingCompass className="w-4" />}
					{link.type === "weAreStudio99" && <WeAreStudio99 className="w-4" />}
					{link.type === "blog" && <Sparkle className="w-4" />}
					<span className="text-ellipsis overflow-hidden">{label}</span>
				</div>
			) : (
				<div className="flex items-center gap-2 text-xl md:text-base relative w-full">
					{label === "Contact" && <Nfc className="w-4" />}
					<span className="text-ellipsis overflow-hidden">{label}</span>
					{label === "Contact" && (
						<ExternalLink
							className="w-4 absolute right-0 text-stone-400"
							strokeWidth={1}
						/>
					)}
				</div>
			)}
		</PrismicNextLink>
	);
};

export default NavigationLink;
