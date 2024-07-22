"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, use, useMemo } from "react";

import { formatDateToMonthYear } from "@/lib/date";
import { I18N_CONFIG } from "@/lib/i18n/config";
import { Collection, Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

import { MenuContext } from "@/contexts/MenuContext";

type Props = {
  lang: Locale;
  title: string;
  collection: Collection;
  data: {
    title: string;
    uid: string;
    startDate: Date;
    endDate?: Date;
  }[];
};

const SideMenuContent: FC<Props> = (props) => {
  const { lang, data, title, collection } = props;

  const { closeInnerMenu } = use(MenuContext) ?? {};

  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const currentPage = splitPathname[splitPathname.length - 1];

  const isActiveArray = useMemo(
    () => data.map((item) => currentPage === item.uid),
    [data, currentPage],
  );

  return (
    <div className="wrapper h-screen w-full bg-eerie-dark">
      <div className="w-full px-4 pt-10 md:p-4">
        <span className="text-3xl font-bold md:text-lg">{title}</span>
      </div>
      <div className="content mx-auto flex w-full flex-col gap-3 px-4 pt-10 md:p-4">
        {data.map((item, idx) => {
          const href =
            lang !== I18N_CONFIG.defaultLocale
              ? `/${lang}/${collection}/${item.uid}`
              : `/${collection}/${item.uid}`;

          const startDate = item.startDate;
          const endDate = item.endDate;

          const isActive = isActiveArray[idx];

          return (
            <Link href={href} key={item.uid} onClick={closeInnerMenu}>
              <div
                className={cn(
                  "shadow-duration-200 group group relative flex items-center justify-between rounded-lg border border-grey bg-metal p-4 px-4 py-5  transition-all hover:scale-[1.01] hover:bg-eerie-light active:scale-[0.98] active:bg-eerie-light",
                  {
                    "[0_1000px_0_0_hsl(0_0%_20%)_inset] overflow-hidden":
                      isActive,
                  },
                )}
              >
                {isActive && (
                  <>
                    <span className="spark mask-gradient pointer-events-none absolute inset-0 h-[100%] w-[100%]  animate-flip rounded-lg [mask:linear-gradient(#7ACCB8,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#7ACCB8_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                    <span className="backdrop pointer-events-none absolute inset-px rounded-lg bg-chinese-black transition-colors duration-200" />
                  </>
                )}
                <div className="z-10 flex flex-col space-y-2 text-base">
                  <span className="text-lg font-bold md:text-base">
                    {item.title}
                  </span>
                  {(startDate || (startDate && endDate)) && (
                    <div className="flex items-center gap-1 text-sm">
                      <span>{formatDateToMonthYear(startDate, lang)}</span>
                      {endDate && (
                        <>
                          <span> - </span>
                          <span>{formatDateToMonthYear(endDate, lang)}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <ChevronRight
                  className="z-10 text-pearl-light"
                  height={22}
                  strokeLinecap="square"
                  strokeWidth={1}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenuContent;
