import { HTMLAttributeAnchorTarget } from "react";

import { Dictionary } from "@lib/i18n/types";

export type PageKey<R extends "first" | "second" | "third"> = R extends "first"
  ? keyof Dictionary["firstLevelPages"]
  : R extends "second"
    ? keyof Dictionary["secondLevelPages"]
    : R extends "third"
      ? keyof Dictionary["thirdLevelPages"]
      : undefined;

type PageUnit<R extends "first" | "second" | "third"> = R extends "first"
  ? {
      i18nKey: PageKey<"first">;
      url: string;
      available?: boolean;
    }
  : R extends "second"
    ? {
        i18nKey: PageKey<"second">;
        url: string;
        children?: Partial<Record<PageKey<"third">, PageUnit<"third">>>;
      }
    : R extends "third"
      ? {
          i18nKey: PageKey<"third">;
          url: string;
        }
      : undefined;

export type PageValue = PageUnit<"first"> & {
  children?: Partial<Record<PageKey<"second">, PageUnit<"second">>>;
};

export type LinkDetail = {
  display: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
};
