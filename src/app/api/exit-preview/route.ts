import { exitPreview } from "@prismicio/next";

export const runtime = "edge";

export function GET() {
  return exitPreview();
}
