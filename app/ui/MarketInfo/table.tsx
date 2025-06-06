/* eslint-disable @next/next/no-img-element */
"use client";
import { Tabledata } from "@/app/constant";
import Image from "next/image";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowForward, IoMdStar } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { MdOutlineBlock } from "react-icons/md";
import CoinModal from "./model";

const watchlists = [
  { name: "Favorites", icon: <IoMdStar size={16} /> },
  { name: "Watchlist 1", icon: <IoEye size={16} /> },
  { name: "Watchlist 2", icon: <IoEye size={16} /> },
  { name: "Blocklist", icon: <MdOutlineBlock size={16} /> },
];

type TradeItem = { icon: string; name: string; link: string; price: string };
type LinkItem = { icon: string; links: string };

type CoinData = {
  rank: number;
  id: string;
  name: string;
  price: string;
  marketCap: string;
  volume: string;
  hour: string;
  day: string;
  week: string;
  month: string;
  year: string;
  icon: string;
  links: LinkItem[];
  tradeList: TradeItem[];
};

const getColorClass = (value: string) => {
  if (value.includes("-")) return "bg-orange-600 text-white";
  if (value.includes("+")) return "bg-blue-600 text-white";
  return "bg-black text-white";
};

export default function CryptoTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const [openTradeDropdownIdx, setOpenTradeDropdownIdx] = useState<number | null>(null);

  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [showHeaderOnly, setShowHeaderOnly] = useState(false);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const parseValue = (val: string | number): number => {
    if (typeof val === "number") return val;
    const cleaned = val.replace(/[$,%]/g, "").replace(/,/g, "").trim().toLowerCase();
    if (cleaned.endsWith("m")) return parseFloat(cleaned) * 1_000_000;
    if (cleaned.endsWith("b")) return parseFloat(cleaned) * 1_000_000_000;
    if (cleaned.endsWith("k")) return parseFloat(cleaned) * 1_000;
    return parseFloat(cleaned);
  };

  const sortedData = [...Tabledata].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof CoinData];
    const bVal = b[sortColumn as keyof CoinData];
    const parsedA = parseValue(aVal as string | number);
    const parsedB = parseValue(bVal as string | number);
    if (isNaN(parsedA) || isNaN(parsedB)) {
      return sortDirection === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    }
    return sortDirection === "asc" ? parsedA - parsedB : parsedB - parsedA;
  });

  const SortableHeader = ({ label, column }: { label: string; column: string }) => (
    <th
      className="py-2 p-1 md:w-[300px] w-[300px] xl:w-auto relative md:text-sm text-[10px] xl:text-lg whitespace-nowrap font-medium transition-all ease-in text-white group cursor-pointer group hover:bg-[#ffffff6d]"
      onClick={() => handleSort(column)}
    >
      <div className="inline-block mr-2 transform transition duration-200">
        <FaArrowDown className={`transition-transform scale-0 group-hover:scale-100 ${sortColumn === column && sortDirection === "desc" ? "rotate-180" : ""}`} />
      </div>
      {label}
    </th>
  );

  return (
    <div className="overflow-x-auto px-4 w-[90%] xl:w-full m-auto">
      <table className="min-w-full text-sm text-left text-white rounded-md">
        <thead className="bg-[#ffffff1f] sticky top-1 text-white text-xs uppercase">
          <tr>
            <SortableHeader label="#" column="rank" />
            <SortableHeader label="Name" column="name" />
            <SortableHeader label="Price" column="price" />
            <SortableHeader label="Market Cap" column="marketCap" />
            <SortableHeader label="24h Volume" column="volume" />
            <SortableHeader label="Hour" column="hour" />
            <SortableHeader label="Day" column="day" />
            <SortableHeader label="Week" column="week" />
            <SortableHeader label="Month" column="month" />
            <SortableHeader label="Year" column="year" />
            <th className="p-3 text-lg font-medium text-white"></th>
            <th className="p-3 md:text-sm text-[10px] xl:text-lg font-medium text-white">Links & Trade</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((coin, idx) => (
            <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800 bg-[#222] relative">
              <td className="p-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] xl:text-base mr-2 flex flex-col justify-center items-center text-blue-500">
                    {coin.rank}
                    <IoIosArrowDown />
                  </span>
                  {coin.id}
                </div>
              </td>
              <td className="p-1 w-[200px] xl:w-auto flex items-center gap-2 relative">
                <button
                  className="w-7 h-7 xl:w-10 xl:h-10 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg flex justify-center items-center transition-all"
                  onClick={() => setOpenDropdownIdx(openDropdownIdx === idx ? null : idx)}
                >
                  <FiPlus />
                </button>
                {openDropdownIdx === idx && (
                  <div className="absolute left-3 top-12 z-10 w-56 bg-[#444444] rounded-md shadow-lg">
                    {watchlists.map((item) => (
                      <div key={item.name} className="flex items-center text-lg px-3 py-1 hover:bg-[#3a3a3a] cursor-pointer" onClick={() => setOpenDropdownIdx(null)}>
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                        <span className="ml-auto text-2xl text-white">+</span>
                      </div>
                    ))}
                  </div>
                )}

                <span
                  className="text-[10px] xl:text-lg xl:p-2 w-fit p-2 lg:p-0 font-medium text-white rounded-xl bg-[#ffffff1f] hover:bg-[#ffffff6d] flex gap-2 items-center transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedCoin({ ...coin, id: String(coin.id) });
                    setIsCoinModalOpen(true);
                  }}
                >
                  <img src={coin.icon} alt="icon" className="w-5 h-5" />
                  {coin.name}
                </span>
              </td>

              {/* Remaining TDs... (no change) */}
              <td className="p-1  text-xs xl:text-lg font-medium text-white text-end !pr-10">{coin.price}</td>
              <td className="p-1  text-xs xl:text-lg font-medium text-white text-end !pr-10">{coin.marketCap}</td>
              <td className="p-1  text-xs xl:text-lg font-medium text-white text-end !pr-10">{coin.volume}</td>
              <td className={`p-1 text-xs xl:text-lg font-medium text-white text-center ${getColorClass(coin.hour)}`}>{coin.hour}</td>
              <td className={`p-1 text-xs xl:text-lg font-medium text-white text-center ${getColorClass(coin.day)}`}>{coin.day}</td>
              <td className={`p-1 text-xs xl:text-lg font-medium text-white text-center ${getColorClass(coin.week)}`}>{coin.week}</td>
              <td className={`p-1 text-xs xl:text-lg font-medium text-white text-center ${getColorClass(coin.month)}`}>{coin.month}</td>
              <td className={`p-1 text-xs xl:text-lg font-medium text-white text-center ${getColorClass(coin.year)}`}>{coin.year}</td>
              <td className="p-1 text-xs xl:text-lg font-medium text-white flex gap-2">
                {coin.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.links}
                    target="_blank"
                    className="w-7 h-7 xl:w-10 xl:h-10 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg flex justify-center items-center transition-all"
                  >
                    <img src={link.icon} alt={link.links} className="w-[50%] h-[50%] rounded-lg" />
                  </a>
                ))}
              </td>
              <td className="p-1 text-xs xl:text-lg font-medium text-white text-center relative">
                <div
                  className="py-1 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg flex gap-3 justify-center items-center transition-all"
                  onClick={() => setOpenTradeDropdownIdx(openTradeDropdownIdx === idx ? null : idx)}
                >
                  <div className="flex gap-2">
                    {coin.tradeList.map((img) => (
                      <Image key={img.icon} className="shrink-0" width={25} height={25} src={`/${img.icon}`} alt="Reg-img" />
                    ))}
                  </div>
                </div>
                {openTradeDropdownIdx === idx && (
                  <div className="absolute left-0 top-14 z-10 w-64 bg-[#444444] rounded-md shadow-lg">
                    {coin.tradeList.map((item) => (
                      <a
                        href={item.link}
                        key={item.name}
                        target="_blank"
                        className="flex items-center justify-between text-lg px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer"
                        onClick={() => setOpenTradeDropdownIdx(null)}
                      >
                        <span className="flex items-center gap-2">
                          <Image src={`/${item.icon}`} alt={item.name} width={20} height={20} />
                          {item.name}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="mr-2">{item.price}</span>
                          <IoIosArrowForward size="16px" />
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCoinModalOpen && selectedCoin && (
        <CoinModal
          isCoinModalOpen={isCoinModalOpen}
          setIsCoinModalOpen={setIsCoinModalOpen}
          selectedCoin={selectedCoin}
          showHeaderOnly={showHeaderOnly}
          setShowHeaderOnly={setShowHeaderOnly}
          watchlists={watchlists}
          openDropdownIdx={openDropdownIdx}
          setOpenDropdownIdx={setOpenDropdownIdx}
          openTradeDropdownIdx={openTradeDropdownIdx}
          setOpenTradeDropdownIdx={setOpenTradeDropdownIdx}
        />
      )}
    </div>
  );
}
