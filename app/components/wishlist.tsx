import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface IProps {
  isWishListOption: { item: string }[];
  setIsWishListOption: (value: { item: string }[]) => void;
}

export default function Watchlists({ isWishListOption, setIsWishListOption }: IProps) {
  const handleAddWatchlist = () => {
    const newListName = ``;
    setIsWishListOption([...isWishListOption, { item: newListName }]);
  };

  const handleDeleteWatchlist = (index: number) => {
    const updated = [...isWishListOption];
    updated.splice(index, 1);
    setIsWishListOption(updated);
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...isWishListOption];
    updated[index].item = value;
    setIsWishListOption(updated);
  };

  const handleClearInput = (index: number) => {
    const updated = [...isWishListOption];
    updated[index].item = "";
    setIsWishListOption(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl text-[#ccc]">Watchlists</h2>

        <button
          onClick={handleAddWatchlist}
          className="w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg font-normal flex justify-center transition-all ease-in items-center"
        >
          <FaPlus />
        </button>
      </div>

      {isWishListOption.map((wish, index) => (
        <div className="flex items-center justify-between gap-5 mt-3" key={index}>
          <div className="relative w-[90%]">
            <input
              type="text"
              value={wish.item}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="bg-zinc-800 text-white rounded-lg py-3 px-2 w-full pr-10"
              placeholder={`Watchlist ${index + 1}`}
            />
            {wish.item && (
              <button onClick={() => handleClearInput(index)} className="absolute p-1.5 rounded-full right-2 top-1/2 -translate-y-1/2 bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white">
                <IoClose size={20} />
              </button>
            )}
          </div>

          <button
            onClick={() => handleDeleteWatchlist(index)}
            className="w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-lg font-normal flex justify-center transition-all ease-in items-center"
          >
            <MdDelete />
          </button>
        </div>
      ))}
    </div>
  );
}
