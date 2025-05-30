import { PriceChangePercentage } from "@/types/bubbles.types";
import clsx from "clsx";
import React from "react";

type Props = {
  bubbleSort: PriceChangePercentage;
  setBubbleSort: React.Dispatch<React.SetStateAction<PriceChangePercentage>>;
};

export default function NavigationBar({ bubbleSort, setBubbleSort }: Props) {
  const items = [
    { label: "hour", sortValue: PriceChangePercentage.HOUR },
    { label: "day", sortValue: PriceChangePercentage.DAY },
    { label: "week", sortValue: PriceChangePercentage.WEEK },
    { label: "month", sortValue: PriceChangePercentage.MONTH },
    { label: "year", sortValue: PriceChangePercentage.YEAR },
  ];

  return (
    <ul className="flex gap-1 w-full fixed bottom-0 left-0 md:static bg-[#222] md:bg-transparent border-none px-[10px]">
      {items.map((item) => {
        const isSelected = item.sortValue === bubbleSort;
        const isRed = ["day", "week"].includes(item.label);
        const isGreen = ["hour", "month", "year"].includes(item.label);

        return (
          <li
            key={item.label}
            className={clsx(
              "text-center cursor-pointer text-white w-1/5 md:w-auto",
              "rounded-bl-[12px] rounded-br-[12px] py-[10px] px-[15px]",
              "border-t-transparent border-t-2 border-b-2",
              isSelected
                ? isRed
                  ? "bg-[#a33] border-2 border-[#f66]"
                  : "bg-[#282] border-2 border-[#3f3]"
                : clsx(
                    "bg-zinc-800 border-2",
                    isRed ? "border-[#f66]" : "border-[#3f3]"
                  )
            )}
            onClick={() => setBubbleSort(item.sortValue)}
          >
            <span className="font-normal text-[20px]">{item.label.toUpperCase()}</span>
          </li>
        );
      })}
    </ul>
  );
}
