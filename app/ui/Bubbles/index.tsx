"use client";

import MarketInfo from "../MarketInfo";
import Bubbles from "./Bubbles";

type Props = {
  coins: any;
};

export default function BubblesPage({ coins }: Props) {
  return (
    <div>
      <Bubbles coins={coins} />
      <MarketInfo />
    </div>
  );
}
