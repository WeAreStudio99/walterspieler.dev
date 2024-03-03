import { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";
import { FC } from "react";

import "./_internal/style.css";

type Props = {
	lang: Locale;
	className?: string;
};

const EmptyWork: FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				"hidden w-full h-full md:flex justify-center items-center empty-layout",
				className,
			)}
		>
			<span className="text-stone-400 text-2xl font-bold">Select a work</span>
		</div>
	);
};

export default EmptyWork;
