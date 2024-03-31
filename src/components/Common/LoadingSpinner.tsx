import { cn } from "@/lib/utils";
import { FC } from "react";

const LoadingSpinner: FC = () => {
	return (
		<div className={cn("grid", "place-content-center", "h-screen w-full")}>
			<div
				aria-label="loading"
				className={cn(
					"inline-block",
					"h-4 w-4",
					"text-pearl",
					"animate-spin rounded-full border-[2px] border-current border-t-transparent",
				)}
				role="status"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default LoadingSpinner;
