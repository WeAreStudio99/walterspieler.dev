import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  StackIcon,
} from "@radix-ui/react-icons";
import { FC } from "react";

import Malt from "@/components/Icons/Company/Malt";
import { Button } from "@/components/ui/button";

import { SocialDocumentData } from "../../../prismicio-types";

/**
 * Props for `SocialsList`.
 */
export type Props = SliceComponentProps<
  Content.SocialsListSlice & {
    items: {
      social: {
        data: SocialDocumentData;
      };
    }[];
  }
>;

/**
 * Component for "SocialsList" Slices.
 */
const SocialsList: FC<Props> = (props) => {
  const { slice } = props;

  const { items } = slice;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="my-6 flex flex-wrap gap-4">
        {items.map((item: { social: { data: SocialDocumentData } }, idx) => {
          if (!item.social.data || !item.social.data.url) {
            return <></>;
          }

          const link =
            "url" in item.social.data.url ? item.social.data.url.url : "/";
          return (
            <Button className="" key={idx} variant="outline">
              {item.social.data.label === "Linkedin" && (
                <LinkedInLogoIcon className="mr-2 h-4 w-4" />
              )}
              {item.social.data.label === "StackOverflow" && (
                <StackIcon className="mr-2 h-4 w-4" />
              )}
              {item.social.data.label === "Instagram" && (
                <InstagramLogoIcon className="mr-2 h-4 w-4" />
              )}
              {item.social.data.label === "Malt" && <Malt className="mr-2" />}
              <a href={link} rel="noreferrer" target="_blank">
                {item.social.data.label}
              </a>
            </Button>
          );
        })}
      </div>
    </section>
  );
};

export default SocialsList;
