import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const authCode = searchParams.get("code");
  if (!authCode) {
    return NextResponse.json({ success: false, error: "Missing auth code" }, { status: 400 });
  }

  console.log("🔑 Received eBay OAuth Code:", authCode);

  // TODO: Exchange authCode for an access token

  return NextResponse.json({ success: true, code: authCode });
}