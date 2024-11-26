import { FC } from "react";

import Link from "next/link";
import { TypedLocale } from "payload";

import ExperiencesBlock from "@/components/Blocks/ExperiencesBlock";
import MySocialsBlock from "@/components/Blocks/MySocialsBlock";
import { Button } from "@/components/ui/button";
import { serializeLexical } from "@/lib/payload/lexical/serialize";
import { Page } from "@/payload-types";

type Props = {
  content: Page["content"];
  lang: TypedLocale;
};

export const Content: FC<Props> = (props) => {
  const { content, lang } = props;
  console.log(content);

  return (
    <div>
      {content?.map((content) => {
        switch (content.blockType) {
          case "Paragraph":
            return (
              <div key={content?.id}>
                {content?.paragraph?.root?.children &&
                  serializeLexical({
                    nodes: content.paragraph.root.children,
                  })}
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
            return (
              <MySocialsBlock key={content?.id} socials={content.socials} />
            );
          case "button":
            return (
              <div className="my-6 flex justify-start" key={content?.id}>
                {content.isExternal ? (
                  <Button variant="outline">
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
