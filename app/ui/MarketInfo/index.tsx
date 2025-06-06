"use client";

import { useIsSmallDevice } from "@/app/lib/hooks";
import { useToggleStore } from "@/app/lib/store/useToggleStore";
import CryptoTable from "./table";

export default function MarketInfo() {
  const { activeTab } = useToggleStore();
  const isSmall = useIsSmallDevice();
  return <>{isSmall ? <>{activeTab === "table" && <CryptoTable />}</> : <CryptoTable />}</>;
}
