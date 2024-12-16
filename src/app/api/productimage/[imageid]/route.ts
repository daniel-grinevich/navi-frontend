import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ imageid: string }> }
) {
  const { imageid } = await params;
  const image = await fetch(`https://iili.io/${imageid}.webp`)

  return new Response(image.body, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "CDN-Cache-Control": "public, max-age=31536000, immutable",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}