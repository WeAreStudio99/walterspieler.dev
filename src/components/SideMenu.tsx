import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

export const SideMenu: FC<Props> = ({ children }) => {
	return (
		<div
			className={cn(
				"relative hidden bg-eerie-light lg:flex lg:flex-col h-screen",
				"lg:w-60 xl:w-96",
			)}
		>
			<div className="bg-eerie-light p-3">{children}</div>
		</div>
	);
};
