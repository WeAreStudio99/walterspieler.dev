import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { FC } from "react";

import ScrollArea from "@/components/Common/ScrollArea";
import { H1 } from "@/components/Common/Typography";
import { Separator } from "@/components/ui/separator";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import getSchemaProfilePage from "@/lib/schema-dts/profile-page";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = {
  lang: Locale;
};

type Props = {
  params: Params;
};

const HomeLang: FC<Props> = async (props) => {
  const { params } = props;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  const client = createClient();
  const page = await client
    .getSingle("home", {
      lang,
      fetchLinks: [
        "work.company",
        "work.description",
        "work.duration",
        "work.workPost",
        "work.tags",
        "work.logo",
        "social.label",
        "social.url",
        "social.type",
      ],
    })
    .catch(() => notFound());

  const jsonLd = getSchemaProfilePage(
    dictionary.home.metadata.description,
    dictionary.home.job,
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ScrollArea className="flex flex-col">
        <div className="content-wrapper">
          <div className="content duration-700 animate-in fade-in">
            <H1 className="text-spotlight mb-4 max-w-[60vw] md:mb-4 md:max-w-full">
              Thibault Walterspieler
              <span
                className={
                  "mt-3 block text-xl font-normal text-stone-400 md:text-2xl"
                }
              >
                {dictionary.home.job}
              </span>
            </H1>
            <Separator className="my-6" />
            <SliceZone components={components} slices={page.data.slices} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default HomeLang;
