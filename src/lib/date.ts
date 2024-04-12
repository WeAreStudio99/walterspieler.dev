import {
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInWeeks,
  format,
} from "date-fns";
import { enGB, fr } from "date-fns/locale";

import { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/utils";

const getPluralization = (
  count: number,
  dictionary: any,
  unit: string,
): string => {
  const isPlural = count > 1 ? "plural" : "singular";
  return `${count} ${dictionary.time[unit][isPlural]}`;
};

const formatDateDiff = async (
  date1: Date,
  date2: Date,
  locale: Locale,
): Promise<string> => {
  const dictionary = await getDictionary(locale);

  const yearsDiff = differenceInCalendarYears(date2, date1);
  if (yearsDiff >= 1) {
    const monthsDiff = differenceInCalendarMonths(date2, date1) % 12; // Get remaining months after full years
    const yearStr = getPluralization(yearsDiff, dictionary, "year");
    const monthStr =
      monthsDiff >= 1
        ? ` ${getPluralization(monthsDiff, dictionary, "month")}`
        : "";
    return `${yearStr} ${locale === "fr-fr" ? "et " : "and "}${monthStr}`;
  }

  const monthsDiff = differenceInCalendarMonths(date2, date1);
  if (monthsDiff >= 1) {
    return getPluralization(monthsDiff, dictionary, "month");
  }

  const weeksDiff = differenceInWeeks(date2, date1);
  return getPluralization(weeksDiff, dictionary, "week");
};

const formatDateToMonthYear = (date: Date, locale: Locale) => {
  const locales = { "en-gb": enGB, "fr-fr": fr };
  const selectedLocale = locales[locale];

  return format(date, "MMM yyyy", { locale: selectedLocale });
};

export { formatDateDiff, formatDateToMonthYear };
