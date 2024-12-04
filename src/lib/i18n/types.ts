import { TypedLocale } from "payload";

import { DICTIONARIES } from "./constants";

export type Locale = keyof typeof DICTIONARIES;
export type Dictionary = Awaited<ReturnType<(typeof DICTIONARIES)[Locale]>>;
export type Config = {
  defaultLocale: TypedLocale;
  locales: TypedLocale[];
};
