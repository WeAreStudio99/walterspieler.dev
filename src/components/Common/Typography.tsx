import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const H1 = forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h1
		className={cn(
			`scroll-m-20 text-stone-50 text-4xl font-extrabold tracking-tight lg:text-5xl text-spotlight`,
			className,
		)}
		ref={ref}
		{...props}
	/>
));
H1.displayName = "H1";

const H2 = forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h2
		className={cn(
			`scroll-m-20 text-stone-50 border-grey border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 [&:not(:first-child)]:mt-6`,
			className,
		)}
		ref={ref}
		{...props}
	/>
));
H2.displayName = "H2";

const H3 = forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		className={cn(
			`scroll-m-20 text-stone-50 text-2xl font-semibold tracking-tight`,
			className,
		)}
		ref={ref}
		{...props}
	/>
));
H3.displayName = "H3";

const H4 = forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h4
		className={cn(
			`scroll-m-20 text-stone-50 text-xl font-semibold tracking-tight`,
			className,
		)}
		ref={ref}
		{...props}
	/>
));
H4.displayName = "H4";

const P = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		className={cn(
			`leading-7 [&:not(:first-child)]:mt-6 text-stone-300`,
			className,
		)}
		ref={ref}
		{...props}
	/>
));
P.displayName = "P";

const LI = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
	({ className, ...props }, ref) => (
		<li className={`${className}`} ref={ref} {...props} />
	),
);
LI.displayName = "LI";

const UL = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
	({ className, ...props }, ref) => (
		<ul
			className={cn(`my-6 ml-6 list-disc [&>li]:mt-2`, className)}
			ref={ref}
			{...props}
		/>
	),
);
UL.displayName = "UL";

const A = forwardRef<
	HTMLAnchorElement,
	React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
	<a
		className={cn(
			`text-base text-pearl-light hover:underline hover:text-pearl-dark decoration-pearl-dark`,
			className,
		)}
		ref={ref}
		{...props}
	/>
));
A.displayName = "A";

export { A, H1, H2, H3, H4, LI, P, UL };
