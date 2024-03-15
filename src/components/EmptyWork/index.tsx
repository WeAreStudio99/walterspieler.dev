import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { FC } from "react";

import { getDictionary } from "@/lib/i18n/utils";
import "./_internal/style.css";

type Props = {
	lang: Locale;
};

const EmptyWork: FC<Props> = async ({ lang }) => {
	const dictionary = await getDictionary(lang);

	return (
		<div
			className={cn(
				"hidden w-full h-full lg:flex justify-center items-center empty-layout",
			)}
		>
			<span className="text-3xl font-bold inline-flex animate-text-gradient bg-gradient-to-r from-stone-400 via-metal to-stone-400 bg-[200%_auto]  text-center text-transparent bg-clip-text">
				{dictionary.selectAWork}
			</span>
		</div>
	);
};

export default EmptyWork;
