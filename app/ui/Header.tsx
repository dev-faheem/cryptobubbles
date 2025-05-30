"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavigationBar from "./NavigationBar";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  // selectedCurrency is single string (single select)
  const [selectedCurrency, setSelectedCurrency] = useState("PLN");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currencies = [
    { symbol: "$", code: "USD" },
    { symbol: "€", code: "EUR" },
    { symbol: "£", code: "GBP" },
    { symbol: "R$", code: "BRL" },
    { symbol: "$", code: "CAD" },
    { symbol: "$", code: "AUD" },
    { symbol: "Zł", code: "PLN" },
    { symbol: "₹", code: "INR" },
    { symbol: "₽", code: "RUB" },
    { symbol: "Fr", code: "CHF" },
    { symbol: "R", code: "ZAR" },
    { symbol: "₺", code: "TRY" },
    { symbol: "¥", code: "JPY" },
    { symbol: "₩", code: "KRW" },
  ];

  const cryptos = [
    { symbol: "₿", code: "BTC" },
    { symbol: "Ξ", code: "ETH" },
    { symbol: "◎", code: "SOL" },
  ];

  const cryptoList = [
    { name: "Bitcoin (BTC)", image: "/1.png" },
    { name: "Ethereum (ETH)", image: "/eth.png" },
    { name: "Tether (USDT)", image: "/tet.png" },
    { name: "XRP (XRP)", image: "/xrp.png" },
    { name: "BNB (BNB)", image: "/bnb.png" },
    { name: "Solana (SOL)", image: "/solana.png" },
    { name: "USDC (USDC)", image: "/usd.png" },
    { name: "Dogecoin (DOGE)", image: "/doge.png" },
    { name: "Cardano (ADA)", image: "/card.png" },
  ];

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setSearchText(item);
    setShowDropdown(false);
  };

  return (
    <div className="pl-4 pr-4 bg-[#444] flex justify-between items-center border-b border-lime-400 w-full relative font-[Verdana,sans-serif] h-[54px]">
      {/* Logo */}
      <Link className="flex gap-2 grow-0 items-center w-[41%]" href={"/"}>
        <Image className="shrink-0" width={40} height={30} src={"/logo64.png"} alt="logo-icon" />
        <div className="flex flex-col justify-center">
          <h1 className="text-[2em] font-normal uppercase whitespace-nowrap">STABLE STATES</h1>
        </div>
      </Link>

      {/* Search Box */}
      <div className="relative mx-4 flex-grow">
        <div className="w-[500px] relative inline-flex items-center rounded-[12px] cursor-text border border-[#6c6c6c] focus-within:border-[#09f] transition-colors duration-300">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg viewBox="0 0 24 24" className="pointer-events-none h-6 fill-current text-white">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 
                16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 
                5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 
                4.99L20.49 19l-4.99-5zm-6 
                0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 
                5 14 7.01 14 9.5 11.99 14 9.5 14z">
              </path>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search cryptocurrency"
            className="w-full pl-10 pr-4 py-2 rounded-[12px] text-white placeholder-[#727272] bg-transparent focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
        </div>
        {showDropdown && (
          <div className="absolute mt-1 w-full bg-[#000000cc] border border-lime-400 rounded-md shadow-lg z-50">
            <ul className="text-white text-sm max-h-96 overflow-y-auto">
              {cryptoList
                .filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase()))
                .map((crypto, index) => {
                  const [fullName, short] = crypto.name.split(" (");
                  const shortForm = short?.replace(")", "") ?? "";
                  return (
                    <li
                      key={index}
                      onMouseDown={() => handleSelect(crypto.name)}
                      className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-gray-400 w-4">{index + 1}.</span>
                      <Image src={crypto.image} alt={crypto.name} width={24} height={24} />
                      <span className="ml-2">{fullName}</span>
                      <span className="ml-auto text-gray-400">{shortForm}</span>
                    </li>
                  );
                })}
              {cryptoList.filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase())).length === 0 && (
                <li className="px-4 py-2 text-gray-400">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Currency Single Select Dropdown with Radio Buttons */}
      <div className="relative ml-4 w-[25%] flex justify-end">
        <button
          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          className={`flex items-center gap-2 px-3 py-2 rounded-[12px] transition-colors duration-200 ${
            showCurrencyDropdown ? "bg-[#0077dd]" : "bg-[#ffffff1f]"
          } text-white mr-[10px]`}
          aria-haspopup="true"
          aria-expanded={showCurrencyDropdown}
        >
          <span className="text-[#ccc]">
            {currencies.find((c) => c.code === selectedCurrency)?.symbol ||
              cryptos.find((c) => c.code === selectedCurrency)?.symbol}
          </span>
          {selectedCurrency}
          <svg width="24" height="12" viewBox="0 6 24 12" className="pointer-events-none h-6 fill-current">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
        </button>

        {showCurrencyDropdown && (
         <div className="absolute right-0 mt-[42px] rounded-md shadow-lg z-50 max-h-[26.5rem] overflow-auto flex w-[63%] gap-[10%] bg-[#444444e6] bg-opacity-80 backdrop-blur-md text-white">
            <ul>
              <li className="text-gray-400 pt-4 px-5 pb-1">Fiat</li>
              {currencies.map((currency, index) => (
                <li
                  key={`fiat-${index}`}
                  className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setSelectedCurrency(currency.code);
                    setShowCurrencyDropdown(false);
                  }}
                >
                  <input
                    type="radio"
                    name="currency"
                    checked={selectedCurrency === currency.code}
                    readOnly
                    className="cursor-pointer"
                  />
                  <span>{currency.symbol}</span>
                  <span className="ml-auto">{currency.code}</span>
                </li>
              ))}
            </ul>
            <ul>
              <li className="text-gray-400 pt-4 px-5 pb-1">Crypto</li>
              {cryptos.map((crypto, index) => (
                <li
                  key={`crypto-${index}`}
                  className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setSelectedCurrency(crypto.code);
                    setShowCurrencyDropdown(false);
                  }}
                >
                  <input
                    type="radio"
                    name="currency"
                    checked={selectedCurrency === crypto.code}
                    readOnly
                    className="cursor-pointer"
                  />
                  <span>{crypto.symbol}</span>
                  <span className="ml-auto">{crypto.code}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <NavigationBar />
    </div>
  );
}
