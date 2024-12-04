import { clsx, type ClassValue } from "clsx";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import { TypedLocale } from "payload";
import { twMerge } from "tailwind-merge";

import { I18N_CONFIG } from "@/lib/i18n/config";

import { BASE_URL } from "../.././next.constants.mjs";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const generateAlternates = async (
  pathWithoutLang: string,
  lang: TypedLocale,
): Promise<AlternateURLs> => {
  // const { localization } = await config;

  // if (!localization) return { canonical: "", languages: {} };

  // const languages = localization.locales.reduce<
  //   Record<TypedLocale | "x-default", string>
  // >(
  //   (languages, language) => {
  //     languages[language.code as TypedLocale] =
  //       `${BASE_URL}/${language.code}/${pathWithoutLang}`;

  //     return languages;
  //   },
  //   {
  //     "x-default": `${BASE_URL}/${pathWithoutLang}`,
  //     en: "",
  //     fr: "",
  //   },

  return {
    canonical: `${BASE_URL}/${lang === I18N_CONFIG.defaultLocale ? "" : lang}${pathWithoutLang !== "" ? `${lang !== I18N_CONFIG.defaultLocale ? "/" : ""}${pathWithoutLang}` : ""}`,
    languages: {},
  };
};

export { cn, generateAlternates };
