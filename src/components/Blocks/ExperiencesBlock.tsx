import { FC } from "react";

import { TypedLocale } from "payload";

import WorkCard from "@/components/Works/WorkCard";
import { ExperiencePost } from "@/payload-types";

type Props = {
  experiencePosts: (number | ExperiencePost)[] | null | undefined;
  lang: TypedLocale;
};

const ExperiencesBlock: FC<Props> = (props) => {
  const { experiencePosts, lang } = props;

  return (
    <>
      {experiencePosts?.map((experiencePost) => {
        if (
          typeof experiencePost !== "number" &&
          typeof experiencePost.experience !== "number" &&
          experiencePost.experience
        ) {
          return (
            <WorkCard
              buttonLabel={"Read more on"}
              description={experiencePost.experience.companyDescription || ""}
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
    </>
  );
};

export default ExperiencesBlock;
