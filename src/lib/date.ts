import { Locale } from '@/lib/i18n/types';
import {
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInWeeks,
  format,
} from 'date-fns';
import { enGB, fr } from 'date-fns/locale';

const formatDateDiff = (date1: Date, date2: Date) => {
  const yearsDiff = differenceInCalendarYears(date2, date1);
  const monthsDiff = differenceInCalendarMonths(date2, date1);
  const weeksDiff = differenceInWeeks(date2, date1);

  if (yearsDiff >= 1) {
    const monthsAfterYears = monthsDiff - yearsDiff * 12;
    return `${yearsDiff} year(s) ${monthsAfterYears > 0 ? `${monthsAfterYears} month(s)` : ''}`;
  } else if (monthsDiff >= 11) {
    return `${monthsDiff} month(s)`;
  } else {
    return `${weeksDiff} week(s)`;
  }
};

const formatDateToMonthYear = (date: Date, locale: Locale) => {
  const locales = { 'en-gb': enGB, 'fr-fr': fr };
  const selectedLocale = locales[locale];

  return format(date, 'MMM yyyy', { locale: selectedLocale });
};

export { formatDateDiff, formatDateToMonthYear };
