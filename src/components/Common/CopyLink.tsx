"use client";

import { FC } from "react";

import { useToast } from "@/components/ui/use-toast";

type Props = {
  text: string;
};

const CopyLink: FC<Props> = (props) => {
  const { text } = props;
  const { toast } = useToast();

  const onHyperlinkClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `My email (${text}) has been copied to your clipboard.`,
    });
  };

  return (
    <button
      className="text-base text-pearl-light decoration-pearl-dark hover:text-pearl-dark hover:underline"
      onClick={() => onHyperlinkClick(text)}
    >
      {text}
    </button>
  );
};

export default CopyLink;
