import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";

type Props = {
	label?: string;
	button: {
		label: string;
		path: string;
	};
};

const Error404: FC<Props> = (props) => {
	const { label, button } = props;

	return (
		<div className="text-white h-full w-full flex flex-col justify-center items-center blueprint-layout">
			<h2 className="text-9xl font-bold">404</h2>
			<p className="text-2xl font-bold mt-5">
				{label || "You're lost in the void friend!"}
			</p>
			<Button asChild className="mt-5" variant="secondary">
				<Link href={button.path || "/"}>{button.label}</Link>
			</Button>
		</div>
	);
};

export default Error404;
