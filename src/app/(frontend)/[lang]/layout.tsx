import { FC, PropsWithChildren } from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { getPayload, TypedLocale } from "payload";

import PostHogProvider from "@/app/(frontend)/ph-provider";
import MainMenuContent from "@/components/Common/MainMenuContent";
import SideMenu from "@/components/Common/SideMenu";
import { Toaster } from "@/components/ui/toaster";
import { MenuContextProvider } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";
import config from "@payload-config";

type Params = Promise<{
  lang: TypedLocale;
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

const getMe = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  return payload.findGlobal({ slug: "me", locale: lang });
};

const getMainMenu = async (lang: TypedLocale) => {
  const payload = await getPayload({
    config,
  });
  return payload.findGlobal({ slug: "mainMenu", locale: lang });
};

const LangRootLayout: FC<Props> = async (props) => {
  const { children, params } = props;
  const { lang } = await params;

  const me = await getMe(lang);
  const mainMenu = await getMainMenu(lang);

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
                <MainMenuContent lang={lang} mainMenu={mainMenu} me={me} />
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

export default LangRootLayout;
