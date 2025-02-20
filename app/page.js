"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Nav from "../components/Nav";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [recentlyShipped, setRecentlyShipped] = useState([]);
  const [ebayListings, setEbayListings] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/ebayOrders");
        const data = await response.json();
        if (data.orders) {
          setRecentlyShipped(
            data.orders
              .filter(order => order.orderFulfillmentStatus === "FULFILLED")
              .map(order => ({
                id: order.orderId,
                title: order.lineItems[0]?.title || "Unknown Item",
                price: `£${order.pricingSummary?.total?.value || "0.00"}`,
                imageSrc: "/images/product-placeholder.png", // Placeholder image
                linked: true,
              }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    async function fetchEbayListings() {
      try {
        const response = await fetch("/api/ebayListings");
        const data = await response.json();
        if (data.listings) {
          setEbayListings(
            data.listings
              .filter(listing => listing.status === "ACTIVE")
              .map(listing => ({
                id: listing.id,
                title: listing.title,
                price: `£${listing.price?.value || "0.00"}`,
                imageSrc: listing.imageSrc || "/images/product-placeholder.png",
                linked: false,
              }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch eBay listings:", error);
      }
    }

    fetchOrders();
    fetchEbayListings();
  }, []);

  return (
    <>
      {/* Distort Pane */}
      <div className="fixed inset-0 z-0 bg-white bg-opacity-40 backdrop-blur-sm"></div>

      {/* Navbar */}
      <Nav />

      <div className="flex flex-col justify-between grow shrink-0 z-[1] px-[72px] py-[56px] max-w-[1184px] h-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-5">
            <span>
              <span id="new-items" className="font-bold text-[#e72330]">
                1
              </span>{" "}
              ebay item(s) to link
            </span>
            <button className="main-btn">+ Link Listings</button>
          </div>
        </div>
        <div className="w-full h-px bg-black opacity-20 my-4"></div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-8">
          {/* Recently Shipped */}
          <div className="flex flex-col gap-6 col-span-1 row-span-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl flex items-center gap-2 font-semibold pl-2">
                Recently Shipped
              </h2>
              <h3 className="text-gray-600 text-base font-normal pl-2">
                <span className="text-[#55A84A]">{recentlyShipped.length} items</span> shipped in the past 7 days.
              </h3>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-lg p-5 rounded-[44px] shadow flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {recentlyShipped.length > 0 ? (
                  recentlyShipped.map(item => (
                    <ListingItem
                      key={item.id}
                      imageSrc={item.imageSrc}
                      title={item.title}
                      price={item.price}
                      profit="+£0.00"
                      linked={true}
                    />
                  ))
                ) : (
                  <p className="text-gray-600 text-center">No recent shipments</p>
                )}
                <a className="w-full cursor-pointer py-2 -mx-2 text-base text-[#e72330] text-center">
                  View All &gt;
                </a>
              </div>
            </div>
          </div>

          {/* Weekly Sales */}
          <div className="flex flex-col gap-6 col-span-1">
            <h2 className="text-2xl flex items-center gap-2 font-semibold pl-2">
              Total Sales:
              <span className="text-[#55A84A]"> £4,362</span>
            </h2>
            <div className="bg-white bg-opacity-80 backdrop-blur-lg p-5 rounded-[44px] shadow flex flex-col gap-4">
              <canvas id="weeklySalesChart"></canvas>
            </div>
          </div>

          {/* eBay Listings */}
          <div className="flex flex-col gap-6 col-span-1">
            <h2 className="text-2xl flex items-center gap-2 font-semibold pl-2">
              <img src="/images/ebay-bag.svg" alt="eBay Bag" className="w-7 h-7" />
              eBay Listings
            </h2>
            <div className="bg-white bg-opacity-80 backdrop-blur-lg p-5 rounded-[44px] shadow flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {ebayListings.length > 0 ? (
                  ebayListings.map(item => (
                    <ListingItem
                      key={item.id}
                      imageSrc={item.imageSrc}
                      title={item.title}
                      price={item.price}
                      linked={false}
                    />
                  ))
                ) : (
                  <p className="text-gray-600 text-center">No active listings</p>
                )}
                <a className="w-full cursor-pointer py-2 -mx-2 text-base text-[#e72330] text-center">
                  View All &gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Blobs */}
      <img src="/images/blob1.svg" alt="Blob1" className="fixed bottom-0 right-[15%] w-[800px] z-[-1]" />
      <img src="/images/blob2.svg" alt="Blob2" className="fixed bottom-0 right-0 w-[400px] z-[-1]" />

      {/* External Scripts */}
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" />
      <Script src="/script.js" />
    </>
  );
}