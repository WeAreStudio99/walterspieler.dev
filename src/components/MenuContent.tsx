import { NavigationLink } from "@/components/NavigationLink";
import { FC } from "react";

export const MenuContent: FC = () => {
	return (
		<div className="flex w-full flex-col text-sm">
			<div className="flex flex-col gap-1">
				<NavigationLink href="/" label="Home" />
			</div>
		</div>
	);
};
