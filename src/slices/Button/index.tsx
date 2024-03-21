import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { CalendarHeart } from "lucide-react";
import Link from "next/link";

/**
 * Props for `Button`.
 */
export type ButtonProps = SliceComponentProps<Content.ButtonSlice>;

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
			className={cn(
				"flex",
				"my-6",
				position === "center"
					? "justify-center"
					: position === "right"
					  ? "justify-end"
					  : "justify-start",
			)}
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
