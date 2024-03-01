import { FC, Fragment } from "react";

import { Dictionary, Locale } from "@/lib/i18n/types";
import clsx from "clsx";
import Link from "next/link";

type Props = {
	paths: { label: string; href?: string }[];
	lang: Locale;
	dictionary: Dictionary;
	className?: string;
};

export const Breadcrumb: FC<Props> = (props) => {
	const { paths, className } = props;
	return (
		<nav
			className={clsx(
				className,
				"flex items-center gap-2",
				"no-scrollbar overflow-x-scroll whitespace-nowrap text-gray-300",
			)}
		>
			{paths.map((path, idx) => (
				<Fragment key={idx}>
					{path.href ? (
						<Link
							className="text-white hover:text-pearl hover:underline underline-offset-4"
							href={path.href}
						>
							{path.label}
						</Link>
					) : (
						<p className={clsx("font-semibold ")}>{path.label}</p>
					)}

					{idx < paths.length - 1 && <span>/</span>}
				</Fragment>
			))}
		</nav>
	);
};
