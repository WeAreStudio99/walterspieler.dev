import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

type Props = {
	isInner?: boolean;
} & PropsWithChildren;

export const SideMenu: FC<Props> = ({ children, isInner }) => {
	return (
		<div
			className={cn(
				"hidden bg-eerie-dark lg:flex lg:flex-col lg:h-screen",
				isInner ? "lg:w-80 xl:w-96 border-x border-grey" : "lg:w-60 xl:w-72",
			)}
		>
			{children}
		</div>
	);
};
