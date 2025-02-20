import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.EBAY_APP_ID;
  const redirectUri = process.env.EBAY_REDIRECT_URI; // Set in eBay Developer settings

  const authUrl = `https://auth.ebay.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly`;

  return NextResponse.json({ authUrl });
}