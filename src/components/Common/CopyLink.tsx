"use client";

import { FC } from "react";

import { useToast } from "@/components/ui/use-toast";

type Props = {
	text: string;
};

const CopyLink: FC<Props> = ({ text }) => {
	const { toast } = useToast();

	const onHyperlinkClick = (text: string) => {
		navigator.clipboard.writeText(text);
		toast({
			description: `My email (${text}) has been copied to your clipboard.`,
		});
	};

	return (
		<button
			className="text-base text-pearl-light hover:underline hover:text-pearl-dark decoration-pearl-dark"
			onClick={() => onHyperlinkClick(text)}
		>
			{text}
		</button>
	);
};

export default CopyLink;
