import { Content, asDate } from "@prismicio/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

import { H1 } from "@/components/Common/Typography";

import { formatDateToMonthYear } from "@/lib/date";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";

import { createClient } from "@/prismicio";

type Props = {
  lang: Locale;
};

const WorksList: FC<Props> = async (props) => {
  const { lang } = props;
  const dictionary = await getDictionary(lang);

  const client = createClient();
  const workPages = await client
    .getAllByType<
      Content.WorkPostDocument & {
        data: {
          work: {
            data: Pick<Content.WorkDocument["data"], "duration" | "company">;
          };
        };
      }
    >("workPost", {
      lang,
      orderings: [
        {
          field: "my.work.duration.end",
          direction: "desc",
        },
      ],
      fetchLinks: ["work.company", "work.duration"],
    })
    .catch(() => notFound());

  return (
    <div className="wrapper h-screen w-full bg-eerie-dark px-5 py-10 md:py-24">
      <H1 className="sticky top-10 z-30 mb-8">
        {dictionary.firstLevelPages.works}
      </H1>
      <div className="content mx-auto w-full">
        {workPages.map((work) => {
          const workData = work.data.work.data;
          const company = workData.company[0];

          const duration = workData.duration[0];
          const date1 = asDate(duration?.start);
          const date2 = asDate(duration?.end);

          return (
            <Link
              className={cn(
                "group mb-4 flex items-center justify-between rounded-lg p-5",
                "bg-metal",
                "border border-grey",
              )}
              href={
                lang !== I18N_CONFIG.defaultLocale
                  ? `/${lang}/works/${work.uid} `
                  : `/works/${work.uid}`
              }
              key={work.id}
            >
              <div className="flex flex-col gap-2 text-base">
                <span className="text-lg font-bold">
                  {company && company.name}
                </span>
                {date1 && date2 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span>{formatDateToMonthYear(date1, lang)}</span>
                    <span> - </span>
                    <span>{formatDateToMonthYear(date2, lang)}</span>
                  </div>
                )}
              </div>
              <div>
                <ChevronRight />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WorksList;
