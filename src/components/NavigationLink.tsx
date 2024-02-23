"use client";

import { cn } from "@/lib/utils";
import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import { FC } from "react";

type Props = {
	label: string;
	link: LinkField;
};

export const NavigationLink: FC<Props> = ({ label, link }) => {
	const pathname = usePathname();

	let isActive = true;

	function extractHref(link: LinkField) {
		if ("url" in link) {
			return link.url;
		}
	}

	if (pathname?.length > 0) {
		const href = extractHref(link);
		if (href) {
			const splittedPathname = pathname.split("/");
			const currentPathname = splittedPathname[1] ?? "";
			isActive = currentPathname === href.split("/")[1];
		}
	}

	return (
		<PrismicNextLink
			className={cn(
				"group flex items-center justify-between rounded-lg p-2",
				isActive ? "bg-metal text-red" : "hover:bg-metal",
			)}
			field={link}
			rel={({ isExternal }) => (isExternal ? "noreferrer nofollow" : undefined)}
		>
			<span className="flex items-center gap-2 text-base">
				<span className={cn(isActive && "font-bold")}>{label}</span>
			</span>
		</PrismicNextLink>
	);
};
