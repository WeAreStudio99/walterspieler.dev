import ContentWrapper from "@/components/ContentWrapper";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { FC } from "react";

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
