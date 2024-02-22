import { SpaceGrotesk } from "@/lib/fonts";
import type { Metadata } from "next";

import { FC, PropsWithChildren } from "react";

import clsx from "clsx";
import "./globals.css";

export const metadata: Metadata = {
	title: "Website title",
	description: "Website description",
};

type Props = {} & PropsWithChildren;

const RootLayout: FC<Props> = (props) => {
	const { children } = props;

	return (
		<html lang="en">
			<body
				className={clsx(
					SpaceGrotesk.variable,
					"bg-obsidian",
					"font-sans text-white",
				)}
			>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
