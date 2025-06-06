"use client";

import { useIsSmallDevice } from "@/app/lib/hooks";
import { useToggleStore } from "@/app/lib/store/useToggleStore";
import Bubbles from "./Bubbles";

type Props = {
  coins: any;
};

export default function BubblesPage({ coins }: Props) {
  const { activeTab } = useToggleStore();
  const isSmall = useIsSmallDevice();
  return <div>{isSmall ? <>{activeTab === "bubbles" && <Bubbles coins={coins} />}</> : <Bubbles coins={coins} />}</div>;
}
