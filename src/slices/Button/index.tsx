import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
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
				position === "center"
					? "justify-center"
					: position === "right"
					  ? "justify-end"
					  : "justify-start",
			)}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Button asChild variant={variation}>
				<Link href={`${href}`}>{label}</Link>
			</Button>
		</section>
	);
};

export default ButtonSlice;
