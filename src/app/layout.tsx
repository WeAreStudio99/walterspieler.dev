import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk as FontSans } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import { MenuContent } from "@/components/MenuContent";
import { SideMenu } from "@/components/SideMenu";
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
					"bg-eerie-dark",
					"text-white",
					fontSans.variable,
				)}
			>
				<div className="lg:flex">
					<SideMenu>
						<MenuContent />
					</SideMenu>
					<div className="flex flex-1">{children}</div>
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
