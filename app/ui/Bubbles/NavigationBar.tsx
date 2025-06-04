"use client";

import Modal from "@/app/components/model";
import { PriceChangePercentage } from "@/types/bubbles.types";
import clsx from "clsx";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdArrowForwardIos, MdDelete, MdModeEdit } from "react-icons/md";

type Props = {
  bubbleSort: PriceChangePercentage;
  setBubbleSort: React.Dispatch<React.SetStateAction<PriceChangePercentage>>;
};

type SettingState = {
  Period: string;
  BubbleSize: string;
  BubbleContent: string;
  BubbleColor: string;
};

export default function NavigationBar({ bubbleSort, setBubbleSort }: Props) {
  const [isSettingModel, setIsSettingModel] = useState<boolean>(false);
  const [showHeaderOnly, setShowHeaderOnly] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [mode, setMode] = useState<"edit" | "add">("add");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [periodList, setPeriodList] = useState([
    { label: "hour", sortValue: PriceChangePercentage.HOUR },
    { label: "day", sortValue: PriceChangePercentage.DAY },
    { label: "week", sortValue: PriceChangePercentage.WEEK },
    { label: "month", sortValue: PriceChangePercentage.MONTH },
    { label: "year", sortValue: PriceChangePercentage.YEAR },
  ]);

  const [settings, setSettings] = useState<SettingState>({
    Period: "",
    BubbleSize: "",
    BubbleContent: "",
    BubbleColor: "",
  });

  const actionList = [
    {
      title: "Period",
      key: "Period",
      action: ["1 Min", "5 Min", "15 Min", "Hour", "4 Hour", "Day", "Week", "Month", "3 Month", "Year"],
    },
    {
      title: "Bubble size",
      key: "BubbleSize",
      action: ["Performance", "Rank ⇅", "Market Cap", "24h Volume"],
    },
    {
      title: "Bubble content",
      key: "BubbleContent",
      action: ["Performance", "Rank ⇅", "Market Cap", "24h Volume", "Price", "Rank", "Name", "Dominance"],
    },
    {
      title: "Bubble color",
      key: "BubbleColor",
      action: ["Performance", "Rank ⇅", "Neutral"],
    },
  ];

  const handleEditClick = () => {
    const currentIndex = periodList.findIndex((p) => p.sortValue === bubbleSort);
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
      setValue(periodList[currentIndex].label);
      setMode("edit");
      setIsSettingModel(true);
    }
  };

  const handleAddClick = () => {
    setMode("add");
    setValue("");
    setSelectedIndex(null);
    setIsSettingModel(true);
  };

  const handleOptionClick = (key: keyof SettingState, label: string) => {
    const updatedSettings = { ...settings, [key]: label };

    if (key === "Period") {
      const trimmedLabel = label.trim();
      const labelLower = trimmedLabel.toLowerCase();
      const alreadyExists = periodList.some((item) => item.label.trim().toLowerCase() === labelLower);

      if (mode === "edit" && selectedIndex !== null) {
        const updatedList = [...periodList];
        updatedList[selectedIndex] = {
          ...updatedList[selectedIndex],
          label: trimmedLabel,
          sortValue: trimmedLabel as PriceChangePercentage,
        };
        setPeriodList(updatedList);
        setBubbleSort(trimmedLabel as PriceChangePercentage);
      } else if (mode === "add" && !alreadyExists) {
        setPeriodList([
          ...periodList,
          {
            label: trimmedLabel,
            sortValue: trimmedLabel as PriceChangePercentage,
          },
        ]);
      }

      setIsSettingModel(false);
      setValue("");
      setSelectedIndex(null);
    }

    setSettings(updatedSettings);
  };

  return (
    <>
      <ul className="flex gap-1 w-full fixed bottom-0 left-0 md:static bg-[#222] md:bg-transparent border-none px-[10px] pb-3">
        {periodList.map((item, index) => {
          const isSelected = item.sortValue === bubbleSort;
          const isRed = ["day", "week"].includes(item.label.toLowerCase());
          const isGreen = ["hour", "month", "year"].includes(item.label.toLowerCase());

          return (
            <li
              key={index}
              className={clsx(
                "text-center cursor-pointer text-white w-1/5 md:w-auto",
                "rounded-bl-[12px] rounded-br-[12px] py-[10px] px-[15px]",
                "border-t-transparent border-t-2 border-b-2",
                isSelected ? (isRed ? "bg-[#a33] border-2 border-[#f66]" : "bg-[#282] border-2 border-[#3f3]") : clsx("bg-zinc-800 border-2", isRed ? "border-[#f66]" : "border-[#3f3]")
              )}
              onClick={() => setBubbleSort(item.sortValue)}
            >
              <span className="font-normal text-[20px]">{item.label.toUpperCase()}</span>
            </li>
          );
        })}
        <li>
          <button className="w-12 h-12 ml-5 mt-2 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white flex items-center justify-center" onClick={handleEditClick}>
            <MdModeEdit size="25px" />
          </button>
        </li>
        <li>
          <button
            className="w-12 h-12 ml-4 mt-2 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg font-normal flex justify-center transition-all ease-in items-center"
            onClick={handleAddClick}
          >
            <FiPlus size="25px" />
          </button>
        </li>
      </ul>

      <Modal
        isOpen={isSettingModel}
        onClose={() => {
          setIsSettingModel(false);
          setValue("");
          setSelectedIndex(null);
        }}
        header={
          <>
            <div className="flex gap-4 items-center w-[90%]">
              <button
                className={`w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg  font-normal flex justify-center transition-all ease-in items-center ${
                  showHeaderOnly ? "rotate-0" : "rotate-90"
                }`}
                onClick={() => setShowHeaderOnly(!showHeaderOnly)}
              >
                <MdArrowForwardIos />
              </button>
              <div className="flex items-center justify-between gap-2 w-[85%]">
                <div className="relative w-[82%] group">
                  <span className="absolute left-3 h-full flex items-center">
                    <MdModeEdit size={25} className="group-focus:text-blue-500" />
                  </span>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-zinc-800 text-white capitalize outline-none rounded-lg py-3 pl-10 border border-transparent w-full pr-10"
                    placeholder="Type label..."
                  />
                  {value && (
                    <button onClick={() => setValue("")} className="absolute p-1.5 rounded-full right-2 top-1/2 -translate-y-1/2 bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white">
                      <IoClose size={20} />
                    </button>
                  )}
                </div>

                <button className="w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg font-normal flex justify-center transition-all ease-in items-center">
                  <MdDelete />
                </button>
              </div>
            </div>
          </>
        }
      >
        {!showHeaderOnly && (
          <>
            {actionList.map((section, idx) => (
              <div className="mt-5" key={idx}>
                <h2 className="text-xl text-[#ccc] mb-2">{section.title}</h2>
                <div className="flex flex-wrap gap-3">
                  {section.action.map((label) => (
                    <button
                      key={label}
                      onClick={() => handleOptionClick(section.key as keyof SettingState, value || label)}
                      className={`text-white text-base py-2 px-4 rounded-lg transition ${
                        settings[section.key as keyof SettingState] === label ? "bg-blue-600" : "bg-[#ffffff1f] hover:bg-[#ffffff6d]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </Modal>
    </>
  );
}
