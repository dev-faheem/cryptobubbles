"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
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

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setSearchText(item);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="pl-4 pr-4 bg-[#444] flex justify-between items-center border-b border-lime-400 w-full relative font-[Verdana,sans-serif] h-[54px]">
        {/* Logo */}
        <Link className="flex gap-2 grow-0 items-center w-full md:w-[30%]" href={"/"}>
          <Image className="shrink-0" width={40} height={30} src={"/logo64.png"} alt="logo-icon" />
          <div className="flex flex-col justify-center">
            <h1 className="text-[2em] font-normal uppercase whitespace-nowrap">STABLE STATES</h1>
          </div>
        </Link>

        {/* Search Box */}
        <div className="relative mx-4 w-full md:w-[40%]">
          <div className="w-[500px] relative inline-flex items-center rounded-[12px] cursor-text border border-[#6c6c6c] focus-within:border-[#09f] transition-colors duration-300">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg viewBox="0 0 24 24" className="pointer-events-none h-6 fill-current text-white">
                <path
                  d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 
                16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 
                5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 
                4.99L20.49 19l-4.99-5zm-6 
                0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 
                5 14 7.01 14 9.5 11.99 14 9.5 14z"
                ></path>
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
            <div className="absolute mt-1 w-[500px] bg-[#444444a9] backdrop-blur-md border border-lime-400 rounded-md shadow-lg z-50">
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
        <div className=" w-full md:w-[30%] flex items-center justify-end gap-3">
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
