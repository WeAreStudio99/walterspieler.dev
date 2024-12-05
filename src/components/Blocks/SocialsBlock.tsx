import { FC } from "react";

import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  StackIcon,
} from "@radix-ui/react-icons";

import Malt from "@/components/Icons/Company/Malt";
import { Button } from "@/components/ui/button";
import { Social } from "@payload-types";

type Props = {
  socials: (number | Social)[] | null | undefined;
};

type SocialIconProps = {
  label: string;
};

const SocialIcon: FC<SocialIconProps> = (props) => {
  const { label } = props;

  switch (label.toLowerCase()) {
    case "linkedin":
      return <LinkedInLogoIcon className="mr-2 h-4 w-4" />;
    case "stackoverflow":
      return <StackIcon className="mr-2 h-4 w-4" />;
    case "instagram":
      return <InstagramLogoIcon className="mr-2 h-4 w-4" />;
    case "malt":
      return <Malt className="mr-2" />;
    default:
      return null;
  }
};

const SocialsBlock: FC<Props> = (props) => {
  const { socials } = props;

  return (
    <div className="my-6 flex flex-wrap gap-4">
      {socials?.map((social) => {
        if (typeof social !== "number") {
          return (
            <Button asChild key={social?.id} variant="outline">
              <a href={social.link} rel="noreferrer" target="_blank">
                <SocialIcon label={social.label} />
                {social.label}
              </a>
            </Button>
          );
        }
      })}
    </div>
  );
};

export default SocialsBlock;
