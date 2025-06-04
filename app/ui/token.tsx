// components/TokenInput.tsx
import { Pencil } from "lucide-react";

const TokenInput = () => {
  return (
    <div className="flex items-center gap-2 text-white mt-4">
      <div className="flex items-center bg-[#2c2c2c] border border-blue-500 rounded-md px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500">
        <Pencil size={16} className="text-blue-500 mr-2" />
        <input
          type="number"
          defaultValue={1}
          min={1}
          className="bg-transparent w-16 text-white focus:outline-none"
        />
      </div>
      <span className="text-gray-300">
        Automata = <span className="text-white font-semibold">$0.001631</span>
      </span>
    </div>
  );
};

export default TokenInput;
