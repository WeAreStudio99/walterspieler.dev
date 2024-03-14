import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const Loading: FC = () => {
	return (
		<div className="content-wrapper ">
			<div className="content">
				<div className="flex flex-col mb-8">
					<Skeleton className="h-6 w-56 mb-5" />
					<Skeleton className="h-12 w-52 mb-5" />
					<Skeleton className="h-6 w-44 mb-2" />
					<Skeleton className="h-12 w-full mb-5" />
					<Skeleton className="h-1 w-full mt-8" />
				</div>
				<Skeleton className="h-36 w-full mb-6" />
				<Skeleton className="h-64 w-full mb-6" />
				<Skeleton className="h-48 w-full mb-6" />
			</div>
		</div>
	);
};

export default Loading;
