import { HTMLAttributeAnchorTarget } from "react";

import { Dictionary } from "@/lib/i18n/types";

export type PageKey<R extends "first"> = R extends "first"
  ? keyof Dictionary["firstLevelPages"]
  : undefined;

type PageUnit<R extends "first"> = R extends "first"
  ? {
      i18nKey: PageKey<"first">;
      url: string;
      available?: boolean;
    }
  : undefined;

export type PageValue = PageUnit<"first">;

export type LinkDetail = {
  display: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
};
