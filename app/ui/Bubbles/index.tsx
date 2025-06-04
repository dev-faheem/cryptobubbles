"use client";

import Bubbles from "./Bubbles";

type Props = {
  coins: any;
};

export default function BubblesPage({ coins }: Props) {
  return (
    <div>
      <Bubbles coins={coins} />
    </div>
  );
}
