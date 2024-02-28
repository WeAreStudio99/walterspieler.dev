import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk as FontSans } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import { MenuContent } from "@/components/MenuContent";
import { SideMenu } from "@/components/SideMenu";
import { Toaster } from "@/components/ui/toaster";
import { Locale } from "@/lib/i18n/types";
import { repositoryName } from "@/prismicio";
import "@/styles/globals.css";
import { PrismicPreview } from "@prismicio/next";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Thibault Walterspieler",
	description: "Website description",
};

type Params = {
	lang: Locale;
};

type Props = PropsWithChildren<{
	params: Params;
}>;

const LangRootLayout: FC<Props> = (props) => {
	const { children, params } = props;
	const { lang } = params;

	return (
		<html lang={lang}>
			<body
				className={cn(
					"dark",
					"min-h-screen bg-background font-sans antialiased",
					"bg-eerie-dark",
					"text-white",
					fontSans.variable,
				)}
			>
				<div className="lg:flex">
					<SideMenu>
						<MenuContent lang={lang} />
					</SideMenu>
					<div className="flex flex-1">{children}</div>
					<PrismicPreview repositoryName={repositoryName} />
				</div>
				<Toaster />
			</body>
		</html>
	);
};

export default LangRootLayout;
