"use client";

import { cn } from "@/lib/utils";
import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { FC } from "react";

type Props = {
	label: string;
	link: LinkField;
};

export const NavigationLink: FC<Props> = ({ label, link }) => {
	// const pathname = usePathname();

	// const [isActive, setIsActive] = useState(false);

	// const linkUrl = asLink(link);

	// useEffect(() => {
	// 	if (linkUrl) {
	// 		const linkPath = linkUrl.replace(/https?:\/\/[^/]+/, "");
	// 		setIsActive(linkPath === pathname);
	// 	}
	// }, [pathname, linkUrl]);

	return (
		<PrismicNextLink
			className={cn(
				"group flex items-center justify-between rounded-lg p-2",
				// isActive ? "bg-metal text-red" : "hover:bg-metal",
			)}
			field={link}
			rel={({ isExternal }) => (isExternal ? "noreferrer nofollow" : undefined)}
		>
			<span className="flex items-center gap-2 text-base">
				{/* <span className={cn(isActive && "font-bold")}>{label}</span> */}
				<span>{label}</span>
			</span>
		</PrismicNextLink>
	);
};
