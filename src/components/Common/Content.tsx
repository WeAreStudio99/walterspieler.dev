import { FC } from "react";

import clsx from "clsx";
import Link from "next/link";
import { TypedLocale } from "payload";

import ExperiencesBlock from "@/components/Blocks/ExperiencesBlock";
import SocialsBlock from "@/components/Blocks/SocialsBlock";
import { Button } from "@/components/ui/button";
import SerializeLexical from "@/lib/payload/lexical/Serialize";
import { Page } from "@payload-types";

type Props = {
  content: Page["content"];
  lang: TypedLocale;
  className?: string;
};

const Content: FC<Props> = (props) => {
  const { content, lang, className } = props;

  return (
    <div className={clsx(className)}>
      {content?.map((content) => {
        switch (content.blockType) {
          case "Paragraph":
            return (
              <div key={content?.id}>
                {content?.paragraph?.root?.children && (
                  <SerializeLexical nodes={content.paragraph.root.children} />
                )}
              </div>
            );
          case "Experience":
            return (
              <ExperiencesBlock
                experiencePosts={content.experiencePost}
                key={content?.id}
                lang={lang}
              />
            );
          case "MySocials":
            return <SocialsBlock key={content?.id} socials={content.socials} />;
          case "button":
            return (
              <div
                className={clsx("my-6 flex justify-start")}
                key={content?.id}
              >
                {content.isExternal ? (
                  <Button asChild variant="outline">
                    <a
                      href={content.externalUrl || ""}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {content.label}
                    </a>
                  </Button>
                ) : content.page && typeof content.page !== "number" ? (
                  <Button asChild variant="outline">
                    <Link href={content.page?.slug || ""}>{content.label}</Link>
                  </Button>
                ) : null}
              </div>
            );
        }
      })}
    </div>
  );
};

export default Content;
