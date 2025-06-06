import { create } from "zustand";

type Tab = 'bubbles' | 'table' | 'settings';

type ToggleState = {
  activeTab: Tab;
  setActiveTab: (value: Tab) => void;
};

export const useToggleStore = create<ToggleState>((set) => ({
  activeTab: 'bubbles',
  setActiveTab: (value) => set({ activeTab: value }),
}));
