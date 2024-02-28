import { forwardRef } from "react";

const H1 = forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h1
		className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
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
		className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
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
		className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
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
		className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
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
		className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}
		ref={ref}
		{...props}
	/>
));
P.displayName = "P";

export { H1, H2, H3, H4, P };
