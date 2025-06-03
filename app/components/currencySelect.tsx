/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export type CurrencyOption = {
  label: string;
  value: string;
  img?: string;
  symbol?: string;
};

interface IOptionArray {
  title?: string;
  option: CurrencyOption[];
}

type Props = {
  width?: string;
  options: IOptionArray[];
  value?: CurrencyOption;
  onChange?: (value: CurrencyOption) => void;
};

const CustomSelect = ({ width, options, value, onChange }: Props) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSelect = (item: CurrencyOption) => {
    onChange?.(item);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-auto">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-2 rounded-[12px] transition-colors duration-200 w-full ${showDropdown ? "bg-[#0077dd]" : "bg-[#ffffff1f]"} text-white`}
        aria-haspopup="true"
        aria-expanded={showDropdown}
      >
        {value?.img ? <img src={value.img} alt={value.label} className="w-5 h-5 object-contain" /> : <span className="text-[#ccc]">{value?.symbol}</span>}
        <span className="text-[#ccc]">{value?.label || "Select currency"}</span>
        <svg width="24" height="12" viewBox="0 6 24 12" className="pointer-events-none h-6 fill-current ml-auto">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </button>

      {showDropdown && (
        <div className={`absolute right-0 mt-[8px] rounded-md shadow-lg z-50 max-h-[26.5rem] overflow-auto flex gap-[10%] bg-[#444444e6] backdrop-blur-md text-white ${width ? width : "w-full"}`}>
          {options.map(({ title, option }, i) => (
            <ul key={i}>
              {title && <li className="text-gray-400 pt-4 pl-5 pb-1">{title}</li>}
              {option.map((item) => (
                <li key={item.value} className="px-4 py-2 hover:bg-[#9ca3af4f] cursor-pointer flex items-center gap-2" onClick={() => handleSelect(item)}>
                  <input type="radio" name="currency" checked={value?.value === item.value} readOnly className="cursor-pointer" />
                  {item.img ? <img src={item.img} alt={item.label} className="w-5 h-5 object-contain" /> : <span className="text-[#ccc]">{item?.symbol}</span>}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
