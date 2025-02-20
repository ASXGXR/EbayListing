"use client";
import { useState } from "react";

export default function ListingItem({ imageSrc, title, price, profit, linked }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="listing-item relative overflow-hidden flex items-center gap-4 p-2 border-b border-gray-300"
      onMouseEnter={() => setHovered(!linked)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <img
        src={imageSrc}
        alt="Product"
        className={`w-12 h-12 rounded transition-opacity duration-300 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Product Title */}
      <p
        className={`text-sm text-gray-600 transition-opacity duration-300 line-clamp-2 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      >
        {title}
      </p>

      {/* Price & Profit */}
      <span
        className={`price font-bold w-1/3 text-right flex flex-col transition-opacity duration-300 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <span>{price}</span>
        {profit && <span id="profit" className="text-[#55A84A] text-sm">{profit}</span>}
      </span>

      {/* If not linked, show both the "link" button and the expanding input */}
      {!linked && (
        <>
          {/* "link" Button (Always Visible) */}
          <div
            className="z-10 text-center border-2 border-[#e72330] rounded-[44px] py-2 px-4 font-bold text-[#e72330] transition-all duration-200 hover:text-white hover:bg-[#e72330] cursor-pointer"
          >
            link
          </div>

          {/* Input Field (Expands when hovered, but stays underneath the link button) */}
          <input
            type="text"
            placeholder="https://www.aliexpress.com/item/..."
            className={`absolute top-0 right-0 z-0 bg-white text-base outline-none border-2 border-[#e72330] rounded-[44px] p-4 h-full transform transition-all duration-300 ${
              hovered ? "w-full translate-x-0 opacity-100" : "w-0 translate-x-full opacity-0"
            }`}
          />
        </>
      )}
    </div>
  );
}