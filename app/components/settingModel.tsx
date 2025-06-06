"use client";

import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { IoCodeSlashSharp } from "react-icons/io5";
import { LiaFileExportSolid, LiaFileImportSolid } from "react-icons/lia";
import { ColorOptions, CurrencyOptions, languageOptions, SubCoinOptions } from "../constant";
import CustomSelect from "./currencySelect";
import Watchlists from "./wishlist";

interface IImageOption {
  label: string;
  value: string;
  img?: string;
}

const SettingModel = () => {
  const [isTooltipActive, setIsTooltipActive] = useState({
    export: false,
    import: false,
    generate: false,
  });
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

  return (
    <>
      <div className="mt-3">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl text-[#ccc]">Currency</h2>
            <CustomSelect
              width="w-[300px]"
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
              width="w-[200px]"
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
              width="w-[220px]"
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
              width="w-full"
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
                <button className={`w-fit hover:bg-[#ffffff6d] text-white text-xl py-2 px-4 rounded-lg transition flex items-center gap-3 mt-2`}>Data is Empty</button>
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
                <div className="relative w-[90%] my-2">
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
    </>
  );
};

export default SettingModel;
