"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBan, FaCopy, FaEye } from "react-icons/fa";
import { GoStarFill } from "react-icons/go"; // Importing GoStarFill icon
import { IoMdSettings } from "react-icons/io";
import { IoCodeSlashSharp } from "react-icons/io5";
import { LiaFileExportSolid, LiaFileImportSolid } from "react-icons/lia";
import { MdArrowForwardIos } from "react-icons/md";
import CustomSelect from "../components/currencySelect";
import Modal from "../components/model";
import Watchlists from "../components/wishlist";
import { ColorOptions, cryptoList, CurrencyOptions, languageOptions, SubCoinOptions } from "../constant";
import NavigationBar from "./NavigationBar";

interface IImageOption {
  label: string;
  value: string;
  img?: string;
}

export default function Header() {
  const [searchText, setSearchText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isSettingModel, setIsSettingModel] = useState<boolean>(false);
  const [showHeaderOnly, setShowHeaderOnly] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState("PLN");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);

  const [isCurrencyselected, setIsCurrencyselected] = useState<{ symbol?: string; label: string; value: string }>({ symbol: "$", label: "USD", value: "USD" });
  const [isLanguageselected, setIsLanguageselected] = useState<IImageOption>({
    label: "English",
    value: "English",
    img: "/flags/usa.png",
  });
  const [isColorselected, setIsColorselected] = useState<IImageOption>({
    label: "Red + Green",
    value: "Red + Green",
    img: "/red-green.svg",
  });

  const [isHideselected, setIsHideselected] = useState<IImageOption>({
    label: "Show",
    value: "Show",
    img: "/eye.png",
  });
  const [isWishListOption, setIsWishListOption] = useState<{ item: string }[]>([{ item: "" }]);
  const [isTooltipActive, setIsTooltipActive] = useState({
    export: false,
    import: false,
    generate: false,
  });
  type FilterCategory = "pages" | "lists" | "exchanges" | "";

  const [selectedFilter, setSelectedFilter] = useState<{
    category: FilterCategory;
    value: string;
  }>({
    category: "pages",
    value: "1 - 100",
  });
  const pages = ["1 - 100", "101 - 200", "201 - 300", "301 - 400", "401 - 500", "501 - 600", "601 - 700", "701 - 800", "801 - 900", "901 - 1000"];
  const pagespercent = ["+3.9%", "+4.1%", "+3.4%", "+3.6%", "+3.9%", "+4.6%", "1.1%", "+3%", "+4.4%", "+4%"];
  const lists = ["Favorites", "Watchlist 1", "Blocklist"];
  const listpercent = ["-", "-", "-"];
  const exchanges = ["Binance", "MEXC", "Bybit", "Kucoin", "Gate.io", "Bitget", "BitMart", "BingX", "OKX", "Coinbase", "Crypto.com", "Kraken"];
  const exchangespercent = ["+3.9%", "+4.1%", "+3.4%", "+3.6%", "+3.9%", "+4.6%", "1.1%", "+3%", , "+4.4%", "+4%"];
  const exchangeImages: { [key: string]: string } = {
    Binance: "/reg1.png",
    MEXC: "/reg2.png",
    Bybit: "/reg3.png",
    Kucoin: "/reg4.png",
    "Gate.io": "/reg5.png",
    Bitget: "/reg6.png",
    BitMart: "/reg7.png",
    BingX: "/reg8.png",
    OKX: "/reg9.png",
    Coinbase: "/reg1.png",
    "Crypto.com": "/reg2.png",
    Kraken: "/reg3.png",
  };
  const listIcons: { [key: string]: JSX.Element } = {
    Favorites: <GoStarFill />, // Use the GoStarFill icon for Favorites
    "Watchlist 1": <FaEye />, // Use the FaEye icon for Watchlist 1
    Blocklist: <FaBan />, // Use the FaBan icon for Blocklist
  };

  // Combine categories for cycling
  const categories: FilterCategory[] = ["pages", "lists", "exchanges"];

  // Get index for current category and value
  const currentCategoryIndex = categories.indexOf(selectedFilter.category);
  let currentValueIndex = 0;

  if (selectedFilter.category === "pages") {
    currentValueIndex = pages.indexOf(selectedFilter.value);
  } else if (selectedFilter.category === "lists") {
    currentValueIndex = lists.indexOf(selectedFilter.value);
  } else if (selectedFilter.category === "exchanges") {
    currentValueIndex = exchanges.indexOf(selectedFilter.value);
  }

  // Helper: get array by category
  const getArrayByCategory = (category: FilterCategory) => {
    if (category === "pages") return pages;
    if (category === "lists") return lists;
    if (category === "exchanges") return exchanges;
    return [];
  };

  const goToNext = () => {
    const arr = getArrayByCategory(selectedFilter.category);
    const currentValueIndex = arr.indexOf(selectedFilter.value);

    if (currentValueIndex < arr.length - 1) {
      setSelectedFilter({ category: selectedFilter.category, value: arr[currentValueIndex + 1] });
    } else {
      const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      const nextCategory = categories[nextCategoryIndex];
      const nextArr = getArrayByCategory(nextCategory);
      setSelectedFilter({ category: nextCategory, value: nextArr[0] });
    }
  };

  const goToPrev = () => {
    const arr = getArrayByCategory(selectedFilter.category);
    const currentValueIndex = arr.indexOf(selectedFilter.value);

    if (currentValueIndex > 0) {
      setSelectedFilter({ category: selectedFilter.category, value: arr[currentValueIndex - 1] });
    } else {
      const prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
      const prevCategory = categories[prevCategoryIndex];
      const prevArr = getArrayByCategory(prevCategory);
      setSelectedFilter({ category: prevCategory, value: prevArr[prevArr.length - 1] });
    }
  };

  const onFilterSelect = (category: FilterCategory, value: string) => {
    setSelectedFilter({ category, value });
    setShowFiltersDropdown(false);
  };

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setSearchText(item);
    setShowDropdown(false);
  };

  const getFiltersLabel = () => {
    if (!selectedFilter.value) return "Filters";
    return selectedFilter.value;
  };

  return (
    <>
      <div className="pl-4 pr-4 bg-[#444] flex justify-between items-center border-b border-lime-400 w-full relative font-[Verdana,sans-serif] h-[54px]">
        <div className="relative w-full">
          <div className="pl-4 pr-4 bg-[#444] flex justify-between items-center border-b border-lime-400 w-full font-[Verdana,sans-serif] h-[54px]">
            {/* Logo */}
            <Link className="flex gap-2 grow-0 items-center w-[44%]" href={"/"}>
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
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
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
                          <li key={index} onMouseDown={() => handleSelect(crypto.name)} className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-2">
                            <span className="text-gray-400 w-4">{index + 1}.</span>
                            <Image src={crypto.image} alt={crypto.name} width={24} height={24} />
                            <span className="ml-2">{fullName}</span>
                            <span className="ml-auto text-gray-400">{shortForm}</span>
                          </li>
                        );
                      })}
                    {cryptoList.filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase())).length === 0 && <li className="px-4 py-2 text-gray-400">No results found</li>}
                  </ul>
                </div>
              )}
            </div>

            {/* Filter & Arrows */}
            <div className="flex items-center gap-2 relative">
              <button
                onClick={goToPrev}
                className={`px-2 py-1 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff33] transition-colors duration-400 m-0 hidden lg:inline-flex justify-center ${
                  currentValueIndex > 0 ? "" : "invisible"
                }`}
              >
                <svg viewBox="0 0 24 24" className="pointer-events-none h-6 fill-current text-white">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                </svg>
              </button>
              {/* Filters Dropdown */}
              <div className="flex items-center gap-2 relative">
                {/* Filter Button + Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFiltersDropdown((prev) => !prev)}
                    className={`flex items-center gap-2 px-3 py-2 w-[170px] rounded-[12px] justify-center transition-colors duration-200 ${
                      showFiltersDropdown ? "bg-[#0077dd]" : "bg-[#ffffff1f]"
                    } text-white`}
                  >
                    {getFiltersLabel()}
                    <svg width="20" height="20" viewBox="0 6 24 12" className="fill-current">
                      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    </svg>
                  </button>

                  {/* ✅ Your original dropdown content */}
                  {showFiltersDropdown && (
                    <div className="absolute z-50 mt-2 w-[800px] h-[420px] justify-between bg-[#444444e6] border border-lime-400 rounded-md shadow-lg text-white flex right-[8px] overflow-y-scroll backdrop-blur-md">
                      {/* Pages */}
                      <div>
                        <div className="flex justify-between items-end py-[15px] px-[20px] pb-[5px] text-gray-300">
                          Pages
                          <div className="day">Day</div>
                        </div>
                        {pages.map((page, index) => (
                          <div
                            key={`page-${index}`}
                            className={`flex items-center gap-2 cursor-pointer pl-[20px] py-2 px-5 ${
                              selectedFilter.category === "pages" && selectedFilter.value === page ? "text-blue-400" : "text-white"
                            }`}
                          >
                            <input
                              type="radio"
                              id={`page-${index}`}
                              name="page"
                              checked={selectedFilter.category === "pages" && selectedFilter.value === page}
                              onChange={() => onFilterSelect("pages", page)}
                              className="w-4 h-4 text-blue-500 accent-blue-500" // ⭐️ Makes radio button blue
                            />
                            <label htmlFor={`page-${index}`} className="flex justify-between items-center flex-grow gap-[10px]">
                              {page}
                              <span className="text-[rgb(51,255,51)]">{pagespercent[index]}</span>
                            </label>
                          </div>
                        ))}
                      </div>

                      {/* Lists */}
                      <div>
                        <div className="flex justify-between items-end py-[15px] px-[20px] pb-[5px] text-gray-300">
                          Lists<div className="day">Day</div>
                        </div>
                        {lists.map((list, index) => (
                          <div
                            key={`list-${index}`}
                            className={`flex items-center gap-2 cursor-pointer pl-[20px] py-2 px-5 ${
                              selectedFilter.category === "lists" && selectedFilter.value === list ? "text-blue-400" : "text-white"
                            }`}
                          >
                            <input
                              type="radio"
                              id={`list-${index}`}
                              name="list"
                              checked={selectedFilter.category === "lists" && selectedFilter.value === list}
                              onChange={() => onFilterSelect("lists", list)}
                              className="w-4 h-4 text-blue-500 accent-blue-500"
                            />
                            <label htmlFor={`list-${index}`} className="flex items-center flex-grow">
                              {listIcons[list] || <GoStarFill />}
                              <span className="flex justify-between items-center flex-grow gap-[10px] pl-[10px]">
                                {list}
                                <span className="text-white-500">{listpercent[index] || "-"}</span>
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>

                      {/* Exchanges */}
                      <div>
                        <div className="flex justify-between items-end py-[15px] px-[20px] pb-[5px] text-gray-300">
                          Exchanges<div className="day">Day</div>
                        </div>
                        {exchanges.map((ex, index) => (
                          <div
                            key={`ex-${index}`}
                            className={`flex items-center gap-2 cursor-pointer pl-[20px] py-2 px-5 ${
                              selectedFilter.category === "exchanges" && selectedFilter.value === ex ? "text-blue-400" : "text-white"
                            }`}
                          >
                            <input
                              type="radio"
                              id={`ex-${index}`}
                              name="exchange"
                              checked={selectedFilter.category === "exchanges" && selectedFilter.value === ex}
                              onChange={() => onFilterSelect("exchanges", ex)}
                              className="w-4 h-4 text-blue-500 accent-blue-500"
                            />
                            <Image src={exchangeImages[ex]} alt={ex} width={20} height={20} />
                            <label htmlFor={`ex-${index}`} className="flex justify-between items-center flex-grow gap-[10px]">
                              {ex}
                              <span className="text-[rgb(51,255,51)]">{exchangespercent[index]}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={goToNext}
                className={`px-2 py-1 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff33] transition-colors duration-400 m-0 hidden lg:inline-flex justify-center ${
                  currentValueIndex < getArrayByCategory(selectedFilter.category).length - 1 ? "" : "invisible"
                }`}
              >
                <svg viewBox="0 0 24 24" className="pointer-events-none h-6 fill-current text-white">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className=" w-full md:w-[16%] flex items-center justify-end gap-3">
          <CustomSelect
            width="300px"
            options={CurrencyOptions}
            value={isCurrencyselected}
            onChange={(val) => {
              setIsCurrencyselected(val);
            }}
          />

          <NavigationBar onClick={() => setIsSettingModel(!isSettingModel)} />
        </div>
      </div>
      <Modal
        isOpen={isSettingModel}
        onClose={() => setIsSettingModel(false)}
        header={
          <div className="flex gap-4 items-center">
            <button
              className={`w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg  font-normal flex justify-center transition-all ease-in items-center ${
                showHeaderOnly ? "rotate-0" : "rotate-90"
              }`}
              onClick={() => setShowHeaderOnly(!showHeaderOnly)}
            >
              <MdArrowForwardIos />
            </button>
            <h3 className="flex gap-2 items-center text-xl">
              <IoMdSettings size="24" />
              Setting
            </h3>
          </div>
        }
      >
        {!showHeaderOnly && (
          <div className="mt-3">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl text-[#ccc]">Currency</h2>
                <CustomSelect
                  width="300px"
                  options={CurrencyOptions}
                  value={isCurrencyselected}
                  onChange={(val) => {
                    setIsCurrencyselected(val);
                  }}
                />
              </div>

              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl text-[#ccc]">Language</h2>
                <CustomSelect
                  width="280px"
                  options={languageOptions}
                  value={isLanguageselected}
                  onChange={(val) => {
                    setIsLanguageselected(val);
                  }}
                />
              </div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl text-[#ccc]">Colors</h2>
                <CustomSelect
                  width="300px"
                  options={ColorOptions}
                  value={isColorselected}
                  onChange={(val) => {
                    setIsColorselected(val);
                  }}
                />
              </div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl text-[#ccc]">Stablecoins</h2>
                <CustomSelect
                  width="200px"
                  options={SubCoinOptions}
                  value={isHideselected}
                  onChange={(val) => {
                    setIsHideselected(val);
                  }}
                />
              </div>
              <Watchlists isWishListOption={isWishListOption} setIsWishListOption={setIsWishListOption} />

              <div className="relative">
                <button
                  className={`w-full text-white text-xl py-2 px-4 rounded-lg transition flex items-center gap-3 ${isTooltipActive.export ? "bg-[#07d]" : "bg-[#ffffff1f] hover:bg-[#ffffff6d]"}`}
                  onClick={() =>
                    setIsTooltipActive((prev) => ({
                      ...prev,
                      export: !prev.export,
                      import: false,
                      generate: false,
                    }))
                  }
                >
                  <LiaFileExportSolid size="24px" />
                  Export settings + lists
                </button>
                {isTooltipActive.export && (
                  <div className="absolute w-[80%] bottom-10 bg-[#444444a9] backdrop-blur-md text-white text-xl p-4 shadow-xl rounded-md transition-all">
                    <p>This contains your settings and lists. Use it as a backup or to import your data to another device.</p>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <div className="relative w-[90%]">
                        <input type="text" className="bg-zinc-800 text-white rounded-lg py-3 px-2 w-full pr-10" />
                        <button className="absolute top-0 bottom-0 m-auto right-3 w-8 h-8 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-sm font-normal flex justify-center transition-all ease-in items-center">
                          <FaCopy />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className={`w-full text-white text-xl py-2 px-4 rounded-lg transition flex items-center gap-3 ${isTooltipActive.import ? "bg-[#07d]" : "bg-[#ffffff1f] hover:bg-[#ffffff6d]"}`}
                  onClick={() =>
                    setIsTooltipActive((prev) => ({
                      ...prev,
                      import: !prev.import,
                      export: false,
                      generate: false,
                    }))
                  }
                >
                  <LiaFileImportSolid size="24px" />
                  Import settings + lists
                </button>
                {isTooltipActive.import && (
                  <div className="absolute w-[80%] bottom-10 bg-[#444444a9] backdrop-blur-md text-white text-xl p-4 shadow-xl rounded-md transition-all">
                    <p>
                      TThis will import the exported data and <span className="font-bold text-[#07d]">DELETE </span> your current data.
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <div className="relative w-full">
                        <input type="text" className="bg-zinc-800 text-white rounded-lg py-3 px-2 w-full pr-10" placeholder="Paste exported data here" />
                      </div>
                    </div>
                    <button className={`w-fit hover:bg-[#ffffff6d] text-white text-xl py-2 px-4 rounded-lg transition flex items-center gap-3 `}>Data is Empty</button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className={`w-full text-white text-xl py-2 px-4 rounded-lg transition flex items-center gap-3 ${isTooltipActive.generate ? "bg-[#07d]" : "bg-[#ffffff1f] hover:bg-[#ffffff6d]"}`}
                  onClick={() =>
                    setIsTooltipActive((prev) => ({
                      ...prev,
                      generate: !prev.generate,
                      import: false,
                      export: false,
                    }))
                  }
                >
                  <IoCodeSlashSharp size="24px" />
                  Generate HTML widget
                </button>
                {isTooltipActive.generate && (
                  <div className="absolute w-[80%] bottom-10 bg-[#444444a9] backdrop-blur-md text-white text-xl p-4 shadow-xl rounded-md transition-all">
                    <p>Full experience</p>
                    <div className="relative w-[90%]">
                      <input type="text" className="bg-zinc-800 text-white rounded-lg py-3 px-2 w-full pr-10" />
                      <button className="absolute top-0 bottom-0 m-auto right-3 w-8 h-8 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-sm font-normal flex justify-center transition-all ease-in items-center">
                        <FaCopy />
                      </button>
                    </div>
                    <p>You can also generate the HTML widget for one of your lists. But currently all your lists are empty.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
