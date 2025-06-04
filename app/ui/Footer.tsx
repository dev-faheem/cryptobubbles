"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const tokens = [
    { token: "BTC", address: "bc1q8pep7zf7txjcjrslse7crqlgr0f36fwuxnzad0" },
    { token: "ETH", address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3" },
    { token: "BSC", address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3" },
    { token: "SOL", address: "7bWCETt2r6bM7CitSahqiujAM9UR2o14QMyw3xB4QDox" },
    { token: "XRP", address: "rpeeapKyDQE9JhRPkRZA3WtzmiYCxZ3jCL" },
    { token: "LTC", address: "LX7Bzbn2aEEt64DZZzW653tkSvYBQ7cs6q" },
    { token: "XLM", address: "GALMTBOTY4FQ4GBZW5X4XH3673SWEAYB3.." },
    { token: "XMR", address: "4ARo28zbpru9PqFqd1XGSyPipH83PG38e.." },
  ];

  const handleTokenClick = (token: any) => {
    setActiveToken(token.token);
    setWalletAddress(token.address);
  };

  return (
    <footer className="bg-[#222] text-white p-6 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-16 lg:px-0">
        {/* Left section */}
        <div className="pl-[25px] md:pl-0">
          <div className="flex items-center space-x-2">
            <img src={"/logo64.png"} alt="logo-icon" className="w-6 h-6" />
            <h2 className="font-bold">STABLE STATES</h2>
          </div>
          <p className="mt-2 text-base">
            Crypto Bubbles is available as a website at
            <span>cryptobubbles.net and as an app for your phone.</span>
          </p>
          <p className="mt-2 text-base">No financial advice. Do your own research!</p>
          <p className="mt-1 text-base">Version 2025-5-13-20-14</p>
        </div>

        {/* Link section */}
        {/* Link section */}
        <div className="pl-[25px]">
          <h2 className="font-bold mb-3">Links</h2>
          <nav className="flex flex-wrap gap-[0.41rem]">
            <a
              target="_blank"
              rel="noopener"
              href="mailto:contact@cryptobubbles.net"
              title="Send E-Mail to contact@cryptobubbles.net"
              className="inline-flex items-center gap-[5px] rounded-[12px] bg-white/10 px-[15px] py-[10px] whitespace-nowrap transition-colors duration-400 hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
              E-Mail
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="https://x.com/CryptoBubbles"
              title="@CryptoBubbles on X"
              className="inline-flex items-center gap-[5px] rounded-[12px] bg-white/10 px-[15px] py-[10px] whitespace-nowrap transition-colors duration-400 hover:bg-white/20"
            >
              <svg viewBox="0 0 300 271" width="20" height="20" className="fill-white" aria-hidden="true">
                <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"></path>
              </svg>
              X
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="https://t.me/CryptoBubbles"
              title="@CryptoBubbles on Telegram"
              className="inline-flex items-center gap-[5px] rounded-[12px] bg-white/10 px-[15px] py-[10px] whitespace-nowrap transition-colors duration-400 hover:bg-white/20"
            >
              <svg viewBox="0 0 512 512" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="m484.689 98.231-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L271.2 365.631l-51.034 49.086c-5.647 5.647-10.372 10.372-21.256 10.372l7.598-107.722L402.539 140.23c8.523-7.598-1.848-11.809-13.247-4.21L146.95 288.614 42.619 255.96c-22.694-7.086-23.104-22.695 4.723-33.579L455.423 65.166c18.893-7.085 35.427 4.209 29.266 33.065z"></path>
              </svg>
              Telegram
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="https://play.google.com/store/apps/details?id=net.cryptobubbles"
              title="Crypto Bubbles App on Google Play"
              className="inline-flex items-center gap-[5px] rounded-[12px] bg-white/10 px-[15px] py-[10px] whitespace-nowrap transition-colors duration-400 hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"></path>
              </svg>
              Google Play
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="https://apps.apple.com/app/id1599892658"
              title="Crypto Bubbles App on App Store"
              className="inline-flex items-center gap-[5px] rounded-[12px] bg-white/10 px-[15px] py-[10px] whitespace-nowrap transition-colors duration-400 hover:bg-white/20"
            >
              <svg viewBox="4 4 42 42" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 14 5.9902344 L 36 5.9902344 C 40.430666 5.9902344 44 9.5595687 44 13.990234 L 44 35.990234 C 44 40.4209 40.430666 43.990234 36 43.990234 L 14 43.990234 C 9.5693339 43.990234 6 40.4209 6 35.990234 L 6 13.990234 C 6 9.5595687 9.5693339 5.9902344 14 5.9902344 z M 22.572266 11.892578 C 22.187855 11.867986 21.790969 11.952859 21.433594 12.162109 C 20.480594 12.721109 20.161703 13.947391 20.720703 14.900391 L 22.53125 17.990234 L 16.666016 28 L 12 28 C 10.896 28 10 28.896 10 30 C 10 31.104 10.896 32 12 32 L 27.412109 32 C 27.569109 31.237 27.473203 30.409531 27.033203 29.644531 L 27.029297 29.640625 C 26.642297 28.966625 26.105469 28.416 25.480469 28 L 21.302734 28 L 28.978516 14.898438 C 29.536516 13.945438 29.216672 12.720109 28.263672 12.162109 C 27.309672 11.604109 26.085344 11.923953 25.527344 12.876953 L 24.849609 14.033203 L 24.171875 12.876953 C 23.8225 12.281328 23.212949 11.933564 22.572266 11.892578 z M 28.310547 19.941406 L 27.484375 21.314453 C 26.572375 22.830453 26.542953 24.706859 27.376953 26.255859 L 33.673828 37.001953 C 34.045828 37.637953 34.713391 37.990234 35.400391 37.990234 C 35.743391 37.990234 36.092156 37.902797 36.410156 37.716797 C 37.363156 37.158797 37.682047 35.933469 37.123047 34.980469 L 35.376953 32 L 38 32 C 39.104 32 40 31.104 40 30 C 40 28.896 39.104 28 38 28 L 33.033203 28 L 28.310547 19.941406 z M 14.625 34.003906 C 14.068 33.987906 13.526719 34.074328 13.011719 34.236328 L 12.566406 34.994141 C 12.007406 35.946141 12.32825 37.172469 13.28125 37.730469 C 13.59925 37.917469 13.946063 38.005859 14.289062 38.005859 C 14.976062 38.005859 15.644578 37.650625 16.017578 37.015625 L 17.09375 35.179688 C 16.50875 34.496688 15.653625 34.021219 14.625 34.003906 z"></path>
              </svg>
              App Store
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="/mediakit.zip"
              title="Download Media Kit of Crypto Bubbles"
              className="inline-flex items-center gap-[5px] rounded-[12px] bg-white/10 px-[15px] py-[10px] whitespace-nowrap transition-colors duration-400 hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M20 6H4v12h16V6zm-8 9l-5-5h3V7h4v3h3l-5 5z"></path>
              </svg>
              Media Kit
            </a>
          </nav>
        </div>

        {/* Right section */}
        <div className="relative flex flex-col items-center fotter">
          <h2 className="font-bold mb-3">Support my work</h2>
          <a
            target="_blank"
            rel="noopener"
            href="https://x.com/intent/follow?screen_name=CryptoBubbles"
            className="inline-flex items-center gap-[5px] rounded-[12px] bg-[#ffffff1f] transition-colors duration-400 p-[10px] px-[15px] whitespace-nowrap mb-[10px]"
          >
            Follow Crypto Bubbles on X
          </a>

          <button onClick={toggleDropdown} className="bg-[#ffffff1f] px-4 py-2 rounded-[12px] text-left flex justify-center gap-[10px] items-center w-[350px]">
            Register on
            <div className="flex">
              {["reg1", "reg2", "reg3", "reg4", "reg5", "reg7", "reg8", "reg9"].map((img) => (
                <Image key={img} className="shrink-0" width={23} height={24} src={`/${img}.png`} alt="Reg-img" />
              ))}
            </div>
          </button>

          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute bg-gray-800 mt-2 rounded shadow-lg space-y-2 z-10 bottom-[165px] right-[123px] px-5 py-2">
              {[
                { name: "Binance", icon: "reg1.png" },
                { name: "MEXC", icon: "reg2.png" },
                { name: "Bybit", icon: "reg3.png" },
                { name: "Kucoin", icon: "reg4.png" },
                { name: "Gate.io", icon: "reg5.png" },
                { name: "BitMart", icon: "reg6.png" },
              ].map(({ name, icon }) => (
                <a key={name} href="#" onClick={() => setDropdownOpen(false)} className="flex items-center space-x-2 hover:underline">
                  <Image src={`/${icon}`} alt={name} width={20} height={20} />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          )}

          <div className="grid grid-cols-4 gap-[2px] mt-4 rounded-[12px] overflow-hidden">
            {tokens.map((token) => (
              <button
                key={token.token}
                onClick={() => handleTokenClick(token)}
                className={`inline-flex items-center gap-[5px] transition-colors duration-400 whitespace-nowrap px-[15px] py-[10px] ${
                  activeToken === token.token ? "bg-blue-700 text-white" : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {token.token}
              </button>
            ))}
          </div>

          {walletAddress && (
            <div className="bg-[#ffffff1f] mt-3 rounded flex items-center justify-between text-sm break-all px-3 py-2">
              <span className="truncate">{walletAddress}</span>
              <button
                title="Copy"
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress);
                  setCopied(true);
                }}
                className={`ml-2 p-1 rounded transition-colors ${copied ? "bg-blue-700 text-white" : "bg-white/10 hover:bg-white/20"}`}
              >
                📋
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
