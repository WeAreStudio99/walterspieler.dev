import { FC, PropsWithChildren } from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";

import PostHogProvider from "@/app/(frontend)/ph-provider";
import MainMenuContent from "@/components/Common/MainMenuContent";
import SideMenu from "@/components/Common/SideMenu";
import { Toaster } from "@/components/ui/toaster";
import { MenuContextProvider } from "@/contexts/MenuContext";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { cn, generateAlternates } from "@/lib/utils";

import { BASE_URL } from "../../../../next.constants.mjs";

import type { Metadata } from "next";

type Params = Promise<{
  lang: Locale;
}>;

type Props = PropsWithChildren<{
  params: Params;
}>;

const PostHogPageView = dynamic(
  () => import("../../../components/PostHogPageView"),
);

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const LangRootLayout: FC<Props> = async (props) => {
  const { children, params } = props;
  const { lang } = await params;

  return (
    <html lang={lang}>
      {process.env.NODE_ENV === "production" && (
        <Script
          async
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          rel="preconnect"
          src="https://eu.umami.is/script.js"
          strategy="afterInteractive"
        />
      )}
      <PostHogProvider>
        <body
          className={cn(
            "dark",
            "overflow-hidden",
            "relative",
            "bg-background min-h-dvh font-sans antialiased",
            "bg-eerie-light",
            "text-white",
            spaceGrotesk.variable,
          )}
        >
          <SpeedInsights />
          <PostHogPageView />
          <MenuContextProvider>
            <div className="lg:flex">
              <SideMenu lang={lang}>
                <MainMenuContent lang={lang} />
              </SideMenu>
              <div className="blueprint-layout flex flex-1">{children}</div>
            </div>
          </MenuContextProvider>
          <Toaster />
        </body>
      </PostHogProvider>
    </html>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const imagePath = `/images/og/main_${lang}.png`;

  return {
    metadataBase: new URL(BASE_URL),
    publisher: "Thibault Walterspieler",
    creator: "Thibault Walterspieler",
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
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: "Thibault Walterspieler | Fullstack engineer",
      description: dictionary.home.metadata.description,
      url: `/`,
      images: {
        url: imagePath,
        alt: "Thibault Walterspieler | Fullstack engineer",
        type: "image/png",
      },
    },
  };
}

export default LangRootLayout;
