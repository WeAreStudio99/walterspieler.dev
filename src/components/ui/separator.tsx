"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{ className, orientation = "horizontal", decorative = true, ...props },
		ref,
	) => (
		<SeparatorPrimitive.Root
			className={cn(
				"shrink-0 bg-metal/50 backdrop-blur border-grey border rounded-lg",
				orientation === "horizontal" ? "h-[5px] w-full" : "h-full w-[1px]",
				className,
			)}
			decorative={decorative}
			orientation={orientation}
			ref={ref}
			{...props}
		/>
	),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
