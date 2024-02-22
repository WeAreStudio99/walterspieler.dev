"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type Props = {
	href: string;
	label: string;
	isInternal?: boolean;
};

export const NavigationLink: FC<Props> = ({ isInternal, href, label }) => {
	const pathname = usePathname();

	if (!isInternal) {
		return (
			<a
				className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-metal"
				href={href}
				key={href}
				rel="noopener noreferrer"
				target="_blank"
			>
				<span className="inline-flex items-center gap-2 font-medium">
					{label}
				</span>
			</a>
		);
	}

	let isActive = false;
	if (pathname?.length > 0) {
		const splittedPathname = pathname.split("/");
		const currentPathname = splittedPathname[1] ?? "";
		isActive = currentPathname === href.split("/")[1];
	}

	return (
		<Link
			className={cn(
				"group flex items-center justify-between rounded-lg p-2",
				isActive ? "bg-eerie-light text-white" : "hover:bg-metal",
			)}
			href={href}
			key={href}
		>
			<span className="flex items-center gap-2">
				<span className={cn("font-medium", isActive && "text-white")}>
					{label}
				</span>
			</span>
		</Link>
	);
};
