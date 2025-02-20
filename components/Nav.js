"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  const handleHamburgerClick = () => setNavOpen(!navOpen);
  const handleNavItemClick = (page) => {
    window.location.href = page;
    setNavOpen(false);
  };

  return (
    <nav className="card flex flex-col justify-between w-full h-full py-[54px] px-[54px] bg-[#f8f9fa] shadow-md z-10 transition-all duration-300">
      {/* Top row with logo and mobile hamburger */}
      <div className="flex items-center justify-between">
        {/* NAV LOGO */}
        <button
          className="p-0 border-0"
          onClick={() =>
            window.location.href = "https://asxgxr.github.io/brac-website"
          }
        >
          <img src="/images/logo.svg" alt="Logo" className="w-[120px]" />
        </button>
        {/* Hamburger Icon (visible on mobile only) */}
        <div
          className="md:hidden flex flex-col gap-2 p-3 cursor-pointer"
          onClick={handleHamburgerClick}
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
              navOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
              navOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
              navOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
      </div>

      {/* NAV BUTTONS */}
      <div
        className={`flex flex-col gap-4 absolute md:static top-[64px] right-0 w-full transition-all duration-300 overflow-hidden ${
          navOpen ? "max-h-[calc(100vh-64px)]" : "max-h-0"
        } md:max-h-full`}
      >
        <button
          className={`ml-[-16px] flex-1 flex items-center justify-between border-0 bg-transparent py-5 px-4 text-[16px] font-medium rounded-[8px] transition-all duration-200 cursor-pointer hover:text-[#e72330] ${
            pathname === "/shipped-items" ? "text-[#e72330]" : "text-gray-700"
          }`}
          onClick={() => handleNavItemClick("/shipped-items")}
        >
          Shipped Items
        </button>
        <button
          className={`ml-[-16px] flex-1 flex items-center justify-between border-0 bg-transparent py-5 px-4 text-[16px] font-medium rounded-[8px] transition-all duration-200 cursor-pointer hover:text-[#e72330] ${
            pathname === "/ebay-listings" ? "text-[#e72330]" : "text-gray-700"
          }`}
          onClick={() => handleNavItemClick("/ebay-listings")}
        >
          Ebay Listings
        </button>
        <button
          className={`ml-[-16px] flex-1 flex items-center justify-between border-0 bg-transparent py-5 px-4 text-[16px] font-medium rounded-[8px] transition-all duration-200 cursor-pointer hover:text-[#e72330] ${
            pathname === "/errors" ? "text-[#e72330]" : "text-gray-700"
          }`}
          onClick={() => handleNavItemClick("/errors")}
        >
          Errors
          <span className="ml-2 bg-[#e72330] text-white rounded-full px-2">
            1
          </span>
        </button>
      </div>

      {/* PAGE BUTTONS */}
      <div className="flex flex-row">
        Hey, Angus! 👋
      </div>
    </nav>
  );
}
