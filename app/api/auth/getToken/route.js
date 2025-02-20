import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  // Decode the auth code so it isn’t double-encoded
  const rawCode = searchParams.get("code");
  if (!rawCode) {
    return NextResponse.json({ success: false, error: "Missing auth code" }, { status: 400 });
  }
  const authCode = decodeURIComponent(rawCode);

  const clientId = process.env.EBAY_APP_ID;
  const clientSecret = process.env.EBAY_CERT_ID;
  const redirectUri = process.env.EBAY_REDIRECT_URI; // Should match exactly your registered ruName

  const tokenResponse = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenResponse.json();
  console.log("🔑 eBay Access Token Response:", tokenData);

  return NextResponse.json(tokenData);
}