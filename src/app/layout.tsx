import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk as FontSans } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import "@/styles/globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Thibault Walterspieler",
	description: "Website description",
};

type Props = {} & PropsWithChildren;

const RootLayout: FC<Props> = (props) => {
	const { children } = props;

	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
