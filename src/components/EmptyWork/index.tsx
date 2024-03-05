import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { FC } from "react";

import { getDictionary } from "@/lib/i18n/utils";
import "./_internal/style.css";

type Props = {
	lang: Locale;
	className?: string;
};

const EmptyWork: FC<Props> = async ({ className, lang }) => {
	const dictionary = await getDictionary(lang);

	return (
		<div
			className={cn(
				"hidden w-full h-full lg:flex justify-center items-center empty-layout",
				className,
			)}
		>
			<span className="text-stone-400 text-2xl font-bold">
				{dictionary.selectAWork}
			</span>
		</div>
	);
};

export default EmptyWork;
