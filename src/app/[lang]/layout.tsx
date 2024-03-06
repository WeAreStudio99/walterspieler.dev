import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import { PHProvider } from "@/app/provider";
import { MenuContent } from "@/components/MenuContent";
import { SideMenu } from "@/components/SideMenu";
import { Toaster } from "@/components/ui/toaster";
import { MenuContextProvider } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(
	() => import("../../components/PostHogPageView"),
	{
		ssr: false,
	},
);

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
			<PHProvider>
				<body
					className={cn(
						"dark",
						"relative",
						"min-h-dvh bg-background font-sans antialiased",
						"bg-eerie-light",
						"text-white",
						spaceGrotesk.variable,
					)}
				>
					<PostHogPageView />
					<MenuContextProvider>
						<div className="lg:flex">
							<SideMenu>
								<MenuContent lang={lang} />
							</SideMenu>
							<div className="flex flex-1">{children}</div>
						</div>
					</MenuContextProvider>
					<Toaster />
				</body>
			</PHProvider>
		</html>
	);
};

export default LangRootLayout;
