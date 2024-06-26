import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import { Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { FC, PropsWithChildren } from "react";

import MainMenuContent from "@/components/Common/MainMenuContent";
import SideMenu from "@/components/Common/SideMenu";
import { Toaster } from "@/components/ui/toaster";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { cn, generateAlternates } from "@/lib/utils";

import PostHogProvider from "@/app/ph-provider";
import { MenuContextProvider } from "@/contexts/MenuContext";
import { createClient } from "@/prismicio";

import { BASE_URL } from "../../../next.constants.mjs";

import type { Metadata } from "next";

type Params = {
  lang: Locale;
};

type Props = PropsWithChildren<{
  params: Params;
}>;

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

const LangRootLayout: FC<Props> = (props) => {
  const { children, params } = props;
  const { lang } = params;

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  const client = createClient();
  const page = await client
    .getSingle("home", {
      lang,
    })
    .catch(() => notFound());

  const imagePath = `/images/og/main_${lang}.png`;

  return {
    metadataBase: new URL(BASE_URL),
    publisher: "Thibault Walterspieler",
    creator: "Thibault Walterspieler",
    title:
      page.data.meta_title || "Thibault Walterspieler | Fullstack engineer",
    description:
      page.data.meta_description || dictionary.home.metadata.description,
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
