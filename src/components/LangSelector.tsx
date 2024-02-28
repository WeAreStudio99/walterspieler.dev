"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/lib/i18n/types";
import { PrismicNextLink } from "@prismicio/next";
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
		<Select onValueChange={handleLocaleChange}>
			<SelectTrigger>
				<SelectValue placeholder={currentLangPlaceholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{locales.map((locale) => (
						<SelectItem key={locale.lang} value={locale.lang}>
							<PrismicNextLink
								aria-label={`Change language to ${locale.lang_name}`}
								href={locale.url}
								locale={locale.lang}
							>
								{localeLabels[locale.lang as keyof typeof localeLabels] ||
									locale.lang}
							</PrismicNextLink>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default LangSelector;
