import { Play, Pause } from "lucide-react";
import TrackInterface from "@/utils/TrackInterface"; // adjust path if needed

interface InitialCardProps {
    source: TrackInterface;
    isPlaying: boolean | null;
    handleOnClick: () => void; // assuming it's a function that toggles play/pause
  }
export default function InitialCard({ source, isPlaying, handleOnClick }: InitialCardProps) {
  return (
    <div className={`
      flex flex-row justify-center items-center rounded-xl w-full p-3 border-2 transition-all duration-300 drop-shadow-xl mb-3
      ${isPlaying
        ? "border-neutral-500 drop-shadow-neutral-600/40"
        : "border-neutral-200 dark:border-neutral-900 drop-shadow-transparent"
      }
      bg-white text-black dark:bg-neutral-900 dark:text-white
    `}>
      <div className="image-container w-16 h-16 aspect-square">
        <img
          src={source["Album Image URL"]}
          alt={source["Album Name"]}
          className="min-w-full min-h-full aspect-square mb-4 object-center object-cover rounded-full"
        />
      </div>
      <div className="w-full flex justify-between items-center p-2 gap-3">
        <div className="w-full flex flex-col items-start">
          <h3 className="text-lg font-semibold line-clamp-1">
            {source["Track Name"]?.split("-")[0] ?? "Unknown Track"}
          </h3>
          <p className="text-sm">{source["Artist Name(s)"]}</p>
        </div>
        <div
          className="flex items-center bg-gray-200 dark:bg-neutral-800 p-3 rounded-full cursor-pointer"
          onClick={handleOnClick}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-black dark:text-neutral-200" />
          ) : (
            <Play className="w-5 h-5 text-black dark:text-neutral-200" />
          )}
        </div>
      </div>
    </div>
  );
}
