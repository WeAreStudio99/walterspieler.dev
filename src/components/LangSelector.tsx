"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/lib/i18n/types";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
	currentLang: Locale;
	locales: {
		lang: string;
		lang_name: string;
		url: string;
	}[];
};

const localeLabels = {
	"en-gb": "English 🇬🇧",
	"fr-fr": "Français 🇫🇷",
};

const LangSelector: FC<Props> = ({ locales, currentLang }) => {
	const router = useRouter();
	const currentLangPlaceholder =
		localeLabels[currentLang as keyof typeof localeLabels] || currentLang;

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
				<DropdownMenuLabel>Language</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{locales.map((locale) => (
					<DropdownMenuCheckboxItem
						checked={locale.lang === currentLang}
						key={locale.lang}
						onCheckedChange={() => handleLocaleChange(locale.lang)}
					>
						{localeLabels[locale.lang as keyof typeof localeLabels] ||
							locale.lang}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LangSelector;
