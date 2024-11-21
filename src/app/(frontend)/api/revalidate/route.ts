import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
