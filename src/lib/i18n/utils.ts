import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { TypedLocale } from "payload";

import { I18N_CONFIG } from "./config";
import { DICTIONARIES } from "./constants";

const getDictionary = (locale: TypedLocale) => {
  if (!(locale in DICTIONARIES)) {
    return DICTIONARIES.fallback();
  }

  return DICTIONARIES[locale]();
};

const getLocaleFromRequest = (request: NextRequest): string | undefined => {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = I18N_CONFIG.locales;

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as unknown as string[],
  );

  return match(languages, locales, I18N_CONFIG.defaultLocale);
};

export { getDictionary, getLocaleFromRequest };
