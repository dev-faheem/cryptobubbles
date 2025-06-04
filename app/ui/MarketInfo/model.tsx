/* eslint-disable @next/next/no-img-element */
import Modal from "@/app/components/model";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Types
interface LinkItem {
  icon: string;
  links: string;
}

interface TradeItem {
  name: string;
  icon: string;
  price: string;
  link: string;
}

interface Coin {
  name: string;
  icon: string;
  links: LinkItem[];
  tradeList: TradeItem[];
}

interface WatchlistItem {
  name: string;
  icon: ReactNode;
}

interface Props {
  isCoinModalOpen: boolean;
  setIsCoinModalOpen: (open: boolean) => void;
  selectedCoin: Coin;
  showHeaderOnly: boolean;
  setShowHeaderOnly: (val: boolean) => void;
  watchlists: WatchlistItem[];
  openDropdownIdx: number | null;
  setOpenDropdownIdx: (val: number | null) => void;
  openTradeDropdownIdx: number | null;
  setOpenTradeDropdownIdx: (val: number | null) => void;
}

const chartDataMap: Record<string, { time: string; value: number }[]> = {
  Hour: [
    { time: "1", value: 0.53 },
    { time: "2", value: 0.534 },
    { time: "3", value: 0.531 },
    { time: "4", value: 0.5344 },
  ],
  Day: [
    { time: "1", value: 0.5288 },
    { time: "2", value: 0.5344 },
    { time: "3", value: 0.5493 },
    { time: "4", value: 0.5321 },
  ],
  Week: [
    { time: "Mon", value: 0.51 },
    { time: "Tue", value: 0.52 },
    { time: "Wed", value: 0.54 },
    { time: "Thu", value: 0.53 },
    { time: "Fri", value: 0.5344 },
  ],
  Month: [
    { time: "W1", value: 0.48 },
    { time: "W2", value: 0.52 },
    { time: "W3", value: 0.53 },
    { time: "W4", value: 0.5344 },
  ],
  Year: [
    { time: "Q1", value: 0.3 },
    { time: "Q2", value: 0.42 },
    { time: "Q3", value: 0.53 },
    { time: "Q4", value: 0.5344 },
  ],
};

const timeRanges = ["Hour", "Day", "Week", "Month", "Year"];

export default function CoinModal({
  isCoinModalOpen,
  setIsCoinModalOpen,
  selectedCoin,
  showHeaderOnly,
  setShowHeaderOnly,
  watchlists,
  openDropdownIdx,
  setOpenDropdownIdx,
  openTradeDropdownIdx,
  setOpenTradeDropdownIdx,
}: Props) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("Day");

  return (
    <Modal
      isOpen={isCoinModalOpen}
      onClose={() => {
        setIsCoinModalOpen(false);
        setShowHeaderOnly(false);
      }}
      header={
        <div className="flex gap-4 items-center relative">
          {/* Arrow Button */}
          <button
            className={`w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg flex justify-center items-center transition-all ease-in ${
              showHeaderOnly ? "rotate-0" : "rotate-90"
            }`}
            onClick={() => setShowHeaderOnly(!showHeaderOnly)}
          >
            <MdArrowForwardIos />
          </button>

          {/* + Dropdown (Watchlist) Button */}
          <div className="relative">
            <button
              className="w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg flex justify-center items-center transition-all"
              onClick={() => setOpenDropdownIdx(openDropdownIdx === -1 ? null : -1)}
            >
              +
            </button>
            {openDropdownIdx === -1 && (
              <div className="absolute left-0 top-14 z-10 w-56 bg-[#444444] rounded-md shadow-lg">
                {watchlists.map((item) => (
                  <div key={item.name} className="flex items-center text-lg px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer" onClick={() => setOpenDropdownIdx(null)}>
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                    <span className="ml-auto text-2xl text-white">+</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coin Name */}
          <h3 className="flex gap-2 items-center text-xl text-white">
            <img src={selectedCoin.icon} alt="coin" className="w-6 h-6 rounded-full" />
            {selectedCoin.name}
          </h3>
        </div>
      }
    >
      {!showHeaderOnly && (
        <div className="mt-4 text-white space-y-4">
          {/* Links and Trade */}
          <div className="flex flex-wrap gap-8 mt-6 justify-center text-center">
            <div>
              <h4 className="text-lg font-semibold mb-2">Links</h4>
              <div className="flex gap-3 flex-wrap">
                {selectedCoin.links.map((link, i) => (
                  <a target="_blank" key={i} href={link.links} className="w-10 h-10 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white flex justify-center items-center transition-all">
                    <img src={link.icon} alt={link.links} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative">
              <h4 className="text-lg font-semibold mb-2">Trade</h4>
              <div
                className="py-2 px-2 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg flex gap-3 justify-center items-center transition-all cursor-pointer"
                onClick={() => setOpenTradeDropdownIdx(openTradeDropdownIdx === -1 ? null : -1)}
              >
                <div className="flex gap-2">
                  {selectedCoin.tradeList.map((img) => (
                    <Image key={img.icon} className="shrink-0" width={25} height={25} src={`/${img.icon}`} alt="Reg-img" />
                  ))}
                </div>
              </div>

              {openTradeDropdownIdx === -1 && (
                <div className="absolute left-0 top-14 z-10 w-64 bg-[#444444] rounded-md shadow-lg">
                  {selectedCoin.tradeList.map((item) => (
                    <a
                      target="_blank"
                      href={item.link}
                      key={item.name}
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
            </div>
          </div>

          {/* Rank, Market Cap, Volume */}
          <div className="flex justify-between text-sm text-gray-300 px-4">
            <div>
              <h2 className="text-xl text-[#ccc]">Rank</h2>
              <div className="text-xl text-white flex gap-2 items-center">
                <span className="text-sm flex flex-col justify-center items-center text-blue-500">
                  3<IoIosArrowDown />
                </span>
                701
              </div>
            </div>
            <div>
              <h2 className="text-xl text-[#ccc]">Market Cap</h2>
              <div className="text-xl text-white">$27.47M</div>
            </div>
            <div>
              <h2 className="text-xl text-[#ccc]">24h Volume</h2>
              <div className="text-xl text-white flex gap-2 items-center">$6.57M</div>
            </div>
          </div>

          {/* Time Range Buttons */}
          <div>
            {/* Chart */}
            <div className="mt-4 h-60 w-full">
              {/* <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartDataMap[selectedTimeRange]}>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={["auto", "auto"]} hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#f2a900" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer> */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartDataMap[selectedTimeRange]}>
                  <defs>
                    <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f2a900" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#f2a900" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "none", borderRadius: 8, color: "#fff" }} labelStyle={{ color: "#aaa" }} itemStyle={{ color: "#f2a900" }} />
                  <Area type="monotone" dataKey="value" stroke="#f2a900" strokeWidth={2} fill="url(#areaColor)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between my-2 text-sm text-white gap-4">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  className={`flex justify-center items-center flex-col px-4 py-2 transition-all rounded-lg ${selectedTimeRange === range ? "bg-[#ffffff14]" : "hover:bg-[#ffffff1f]"}`}
                  onClick={() => setSelectedTimeRange(range)}
                >
                  <span className={`px-2 py-1 text-xl  rounded-lg ${selectedTimeRange === range ? "bg-orange-600 text-white" : "text-[#ccc]"}`}> {range}</span>
                  <span className="text-xl py-1 rounded-lg">0.1%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
