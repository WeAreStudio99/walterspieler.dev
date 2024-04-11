"use client";

import { Locale } from "@/lib/i18n/types";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
	title: string;
	currentLang: Locale;
	locales: {
		lang: string;
		lang_name: string;
		url: string;
	}[];
};

type LocaleKey = keyof typeof localeLabels;

const localeLabels = {
	"en-gb": "English 🇬🇧",
	"fr-fr": "Français 🇫🇷",
};

const LangSelector: FC<Props> = (props) => {
	const { locales, currentLang, title } = props;

	const router = useRouter();
	const currentLangPlaceholder =
		localeLabels[currentLang as LocaleKey] || currentLang;

	const handleLocaleChange = (newLocale: string) => {
		const selectedLocale = locales.find((locale) => locale.lang === newLocale);
		if (selectedLocale) {
			router.push(selectedLocale.url);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{currentLangPlaceholder}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>{title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{locales.map((locale) => {
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
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LangSelector;
