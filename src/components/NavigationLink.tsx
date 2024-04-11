"use client";

import { MenuContext } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
	path: string;
	type: string;
	lang: Locale;
	external?: boolean;
};

const NavigationLink: FC<Props> = (props) => {
	const { label, path, lang, type } = props;

	const pathname = usePathname();
	const { closeMainMenu = () => {}, setIsInnerMenuOpen = () => {} } =
		use(MenuContext) ?? {};

	const isActive = useMemo(() => {
		let isActive = false;
		if (path) {
			const splittedPathname = pathname.split("/").filter(Boolean);
			const splittedUrl = path.split("/").filter(Boolean);
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
	}, [path, pathname, lang]);

	return (
		<Link
			className={cn(
				"relative group flex items-center justify-between rounded-lg p-4 bg-metal border-grey border duration-200 hover:scale-[1.01] active:scale-[0.98] active:bg-eerie-light transition-all",
				{
					"bg-chinese-black": isActive,
					"hover:bg-eerie-light": !isActive,
				},
			)}
			href={path}
			onClick={() => {
				closeMainMenu();
				setIsInnerMenuOpen(true);
			}}
			rel={props.external ? "noreferrer nofollow" : undefined}
		>
			<div className="flex items-center gap-2 text-xl md:text-base">
				{type === "home" && <BoltIcon className="w-4" />}
				{type === "blog" && <Sparkle className="w-4" />}
				{type === "works" && <DraftingCompass className="w-4" />}
				{type === "weAreStudio99" && <WeAreStudio99 className="w-4" />}
				{type === "contact" && <Nfc className="w-4" />}
				<span className="text-ellipsis overflow-hidden">{label}</span>
			</div>
			{type === "contact" && (
				<ExternalLink
					className="w-4 absolute right-4 text-stone-400"
					strokeWidth={1}
				/>
			)}
		</Link>
	);
};

export default NavigationLink;
