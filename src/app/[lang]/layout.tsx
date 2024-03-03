import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import { MenuContent } from "@/components/MenuContent";
import { SideMenu } from "@/components/SideMenu";
import { Toaster } from "@/components/ui/toaster";
import { MenuContextProvider } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";

const spaceGrotesk = Space_Grotesk({
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
					"relative",
					"min-h-screen bg-background font-sans antialiased",
					"bg-eerie-light",
					"text-white",
					spaceGrotesk.variable,
				)}
			>
				<MenuContextProvider>
					<div className={cn("lg:flex")}>
						<SideMenu>
							<MenuContent lang={lang} />
						</SideMenu>
						<div className="flex flex-1">{children}</div>
					</div>
				</MenuContextProvider>
				<Toaster />
			</body>
		</html>
	);
};

export default LangRootLayout;
