import { FC } from "react";

import Link from "next/link";
import { Locale, TypedLocale } from "payload";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  title: string;
  currentLang: TypedLocale;
  locales: Locale[];
};

const LangSelector: FC<Props> = (props) => {
  const { locales, currentLang, title } = props;

  // const currentLangPlaceholder = l;

  // const handleLocaleChange = (newLocale: string) => {
  //   const selectedLocale = locales.find((locale) => locale.lang === newLocale);
  //   if (selectedLocale) {
  //     router.push(selectedLocale.url);
  //   }
  // };

  const currentLocale = locales.find((locale) => locale.code === currentLang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {typeof currentLocale?.label === "string"
            ? currentLocale?.label
            : currentLocale?.label.en}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((locale) => {
          return (
            <DropdownMenuItem asChild key={locale.code}>
              <Link href={`/${locale.code}`}>
                {typeof locale.label === "string"
                  ? locale.label
                  : locale.label.en}
              </Link>
            </DropdownMenuItem>
          );
        })}

        {/* {locales.map((locale) => {
          const localeLabel =
            localeLabels[locale.lang as LocaleKey] || locale.lang;
          return (
            <DropdownMenuCheckboxItem
              checked={locale.lang === currentLang}
              key={locale.lang}
              onCheckedChange={() => handleLocaleChange(locale.lang)}
            >
              {localeLabel}
            </DropdownMenuCheckboxItem>
          );
        })} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSelector;
