"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: false,
		persistence: "localStorage",
	});
}

const PHProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	if (process.env.NODE_ENV === "development") {
		return <>{children}</>;
	}

	const isInternalUser =
		typeof window !== "undefined" &&
		window.localStorage.getItem("POSTHOG_INTERNAL_USER") === "TRUE";

	if (isInternalUser) {
		return <>{children}</>;
	}

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PHProvider;
