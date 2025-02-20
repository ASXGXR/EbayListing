import { NextResponse } from "next/server";
import { createHash } from "crypto";

// Handle GET for eBay's challenge request
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const challengeCode = searchParams.get("challenge_code");
  if (!challengeCode) {
    return NextResponse.json({ error: "Missing challenge code" }, { status: 400 });
  }

  // Get your verification token from env (set in .env.local)
  const verificationToken = process.env.EBAY_VERIFICATION_TOKEN;
  // Use the same endpoint URL registered with eBay.
  const endpoint = process.env.DROPVAULT_URL+"/api/ebay/account-deletion";

  // Compute the hash: challengeCode + verificationToken + endpoint
  const hash = createHash('sha256');
  hash.update(challengeCode);
  hash.update(verificationToken);
  hash.update(endpoint);
  const challengeResponse = hash.digest('hex');

  return NextResponse.json({ challengeResponse });
}

// Existing POST handler remains here to handle notifications
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("🔔 Received Notification:", body);
    
    const receivedToken = req.headers.get("X-Ebay-Verification-Token");
    if (!receivedToken) {
      console.warn("No verification token received. Allowing test notification.");
      return NextResponse.json({ success: true });
    }
    
    if (receivedToken !== process.env.EBAY_VERIFICATION_TOKEN) {
      console.error("Invalid token:", receivedToken);
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}