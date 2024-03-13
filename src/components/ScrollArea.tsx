import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	className?: string;
}>;

export const ScrollArea: FC<Props> = ({ className, ...rest }) => (
	<div className={cn("scrollable-area relative w-full", className)} {...rest} />
);
