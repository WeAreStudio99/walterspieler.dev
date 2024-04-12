import { SliceZone } from "@prismicio/react";
import { FC } from "react";

import ContentWrapper from "@/components/Common/ContentWrapper";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

const HomePage: FC = async () => {
  const client = createClient();
  const page = await client.getSingle("home");

  return (
    <ContentWrapper>
      <SliceZone components={components} slices={page.data.slices} />
    </ContentWrapper>
  );
};

export default HomePage;
