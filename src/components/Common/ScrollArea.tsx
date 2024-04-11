import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	className?: string;
}>;

const ScrollArea: FC<Props> = (props) => {
	const { className, ...rest } = props;

	return (
		<div
			className={cn("scrollable-area relative w-full", className)}
			{...rest}
		/>
	);
};

export default ScrollArea;
