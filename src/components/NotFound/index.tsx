import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import "./_internal/style.css";

type Props = {
	button: {
		label: string;
		path: string;
	};
};

const Error404: FC<Props> = ({ button }) => {
	return (
		<div className="text-white h-full w-full flex flex-col justify-center items-center grid-layout">
			<h2 className="text-9xl font-bold">404</h2>
			<p className="text-2xl font-bold mt-5">You‘re lost friend</p>
			<Button asChild className="mt-5" variant="secondary">
				<Link href={button.path || "/"}>{button.label}</Link>
			</Button>
		</div>
	);
};

export default Error404;
