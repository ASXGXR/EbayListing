import { NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.EBAY_ACCESS_TOKEN;

export async function GET() {
  try {
    const response = await fetch("https://api.ebay.com/sell/fulfillment/v1/order", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}