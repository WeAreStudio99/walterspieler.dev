import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { cva } from "class-variance-authority";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { CalendarHeart } from "lucide-react";

/**
 * Props for `Button`.
 */
export type ButtonProps = SliceComponentProps<Content.ButtonSlice>;

const positionVariants = cva("flex my-6", {
	variants: {
		position: {
			center: "justify-center",
			right: "justify-end",
			left: "justify-start",
		},
	},
	defaultVariants: {
		position: "center",
	},
});

/**
 * Component for "Button" Slices.
 */
const ButtonSlice = ({ slice }: ButtonProps): JSX.Element => {
	const {
		variation,
		primary: { label, link, position },
	} = slice;
	const href = "url" in link ? link.url : "/";

	return (
		<section
			className={cn(positionVariants({ position }))}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Link className={buttonVariants({ variant: variation })} href={`${href}`}>
				{href?.includes("cal.com") && (
					<CalendarHeart className="mr-2 h-4 w-4" />
				)}
				{label}
			</Link>
		</section>
	);
};

export default ButtonSlice;
