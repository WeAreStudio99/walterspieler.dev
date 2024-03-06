import { cn, generateAlternates } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import { PHProvider } from "@/app/provider";
import { MenuContent } from "@/components/MenuContent";
import { SideMenu } from "@/components/SideMenu";
import { Toaster } from "@/components/ui/toaster";
import { MenuContextProvider } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = params;
	const dictionary = await getDictionary(lang);

	return {
		title: "Thibault Walterspieler | Fullstack engineer",
		description: dictionary.home.metadata.description,
		alternates: generateAlternates("", lang),
		icons: [
			{
				rel: "icon",
				url: "/favicon.ico",
				sizes: "any",
			},
		],
		twitter: {
			card: "summary_large_image",
			title: "Thibault Walterspieler | Fullstack engineer",
			description: dictionary.home.metadata.description,
			images: {
				url: "/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/webp",
				// height: 1024,
				// width: 1024,
			},
		},
		openGraph: {
			type: "website",
			title: "Thibault Walterspieler | Fullstack engineer",
			description: dictionary.home.metadata.description,
			url: `/`,
			images: {
				url: "/og/default.png",
				alt: "Thibault Walterspieler | Fullstack engineer",
				type: "image/webp",
				// height: 1024,
				// width: 1955,
			},
		},
	};
}

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
