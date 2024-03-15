import { cn } from "@/lib/utils";
import { FC } from "react";

const Loading: FC = async () => {
	return (
		<div
			className={cn(
				"hidden w-full h-full lg:flex justify-center items-center empty-layout",
			)}
		>
			<span className="text-3xl font-bold inline-flex animate-text-gradient bg-gradient-to-r from-stone-400 via-metal to-stone-400 bg-[200%_auto]  text-center text-transparent bg-clip-text">
				Loading work...
			</span>
		</div>
	);
};

export default Loading;