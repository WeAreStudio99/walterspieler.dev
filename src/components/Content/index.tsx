import { FC } from "react";

import { TypedLocale } from "payload";

import WorkCard from "@/components/Works/WorkCard";
import { serializeLexical } from "@/lib/payload/lexical/serialize";
import { Page } from "@/payload-types";

type Props = {
  content: Page["content"];
  lang: TypedLocale;
};

export const Content: FC<Props> = (props) => {
  const { content, lang } = props;

  return (
    <>
      {content?.map((content) => {
        if (content?.blockType === "Paragraph") {
          return (
            <div key={content?.id}>
              {content?.paragraph?.root?.children &&
                serializeLexical({
                  nodes: content.paragraph.root.children,
                })}
            </div>
          );
        }
        if (content?.blockType === "Experience") {
          return (
            <div key={content?.id}>
              {content?.experiencePost?.map((experiencePost) => {
                if (
                  typeof experiencePost !== "number" &&
                  typeof experiencePost.experience !== "number" &&
                  experiencePost.experience
                ) {
                  return (
                    <WorkCard
                      buttonLabel={"Read more on"}
                      description={
                        experiencePost.experience.companyDescription || ""
                      }
                      duration={{
                        start: experiencePost.experience.startDate,
                        end: experiencePost.experience.endDate,
                        difference: "",
                      }}
                      key={experiencePost.id}
                      lang={lang}
                      link={experiencePost.experience.companyWebsite || ""}
                      logo={""}
                      relatedWorkPostLink={experiencePost.slug || ""}
                      tags={
                        experiencePost.experience.usedTechnologies?.map(
                          (technology) => ({
                            name: technology?.technology || "",
                          }),
                        ) || []
                      }
                      title={experiencePost.experience.companyName}
                    />
                  );
                }
              })}
            </div>
          );
        }
      })}
    </>
  );
};
