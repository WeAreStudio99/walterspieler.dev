"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: `${process.env.BASE_URL}/ingest`,
		ui_host: `https://eu.posthog.com`,
		capture_pageview: false,
		persistence: "localStorage",
	});
}

export function PHProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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
}
