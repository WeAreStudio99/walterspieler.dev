import { FC } from "react";

import { serializeLexical } from "@/lib/payload/lexical/serialize";
import { Page } from "@/payload-types";

type Props = {
  content: Page["content"];
};

export const Content: FC<Props> = (props) => {
  const { content } = props;

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
      })}
    </>
  );
};
