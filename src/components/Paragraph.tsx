"use client";

import { H1, H2, H3, P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { FC } from "react";

type Props = {
	field: RichTextField | null | undefined;
};

const ParagraphBlock: FC<Props> = ({ field }) => {
	const { toast } = useToast();

	const onHyperlinkClick = (text: string) => {
		navigator.clipboard.writeText(text);
		toast({
			description: `My email (${text}) has been copied to your clipboard.`,
		});
	};

	return (
		<PrismicRichText
			components={{
				heading1: ({ children }) => <H1>{children}</H1>,
				heading2: ({ children }) => <H2>{children}</H2>,
				heading3: ({ children }) => <H3>{children}</H3>,
				heading4: ({ children }) => <H3>{children}</H3>,
				paragraph: ({ children }) => <P>{children}</P>,
				hyperlink: ({ text, node }) => {
					if (node.data.url === "[copy]") {
						return (
							<Button
								className="py-0 px-0 bold"
								onClick={() => onHyperlinkClick(text)}
								variant={"link"}
							>
								{text}
							</Button>
						);
					}

					return (
						<Button className="py-0 px-0 bold" variant={"link"}>
							<a href={node.data.url}>{text}</a>
						</Button>
					);
				},
			}}
			field={field}
		/>
	);
};

export default ParagraphBlock;
