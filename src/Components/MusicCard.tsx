import { Play, Pause } from "lucide-react";
import TrackInterface from "@/utils/TrackInterface"; // adjust path if needed

interface MusicCardProps {
    source: TrackInterface;
    isPlaying: boolean | null;
    handleOnClick: () => void; // assuming it's a function that toggles play/pause
  }

  export default function MusicCard({ source, isPlaying, handleOnClick }: MusicCardProps) {
    return (
      <div
        className={`flex flex-col justify-center items-center rounded-xl w-full p-3 py-8 border-2 transition-all duration-300 drop-shadow-xl
          ${isPlaying
            ? "border-neutral-500 drop-shadow-neutral-600/40"
            : "border-neutral-200 dark:border-neutral-900 drop-shadow-transparent"
          }
          bg-white text-black dark:bg-neutral-900 dark:text-white
        `}
      >
        <img
          src={source["Album Image URL"]}
          alt={source["Album Name"]}
          className="w-full h-full aspect-square mb-4 object-center object-cover rounded-full"
        />
        <div className="w-full flex justify-between items-center p-2 gap-3">
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
          <div className="w-full flex flex-col items-start">
            <h3 className="text-lg font-semibold line-clamp-1">
              {source["Track Name"]?.split("-")[0] ?? "Unknown Track"}
            </h3>
            <p className="text-sm">{source["Artist Name(s)"]}</p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 gap-2 mt-4 text-sm text-gray-700 dark:text-neutral-300 px-4">
          <p><span className="font-medium text-black dark:text-white">Album Release:</span> {source["Album Release Date"]}</p>
          <p><span className="font-medium text-black dark:text-white">Danceability:</span> {source["Danceability"]}</p>
          <p><span className="font-medium text-black dark:text-white">Energy:</span> {source["Energy"]}</p>
          <p>
            <span className="font-medium text-black dark:text-white">Explicit:</span>{' '}
            <span className={source["Explicit"] ? "text-red-600 dark:text-red-300" : "text-green-700 dark:text-green-300"}>
              {source["Explicit"] ? "Explicit" : "Clean"}
            </span>
          </p>
          <p><span className="font-medium text-black dark:text-white">Tempo:</span> {source["Tempo"]}</p>
          <p><span className="font-medium text-black dark:text-white">Valence:</span> {source["Valence"]}</p>
          <p><span className="font-medium text-black dark:text-white">Duration (ms):</span> {source["Duration_ms"]}</p>
          <p><span className="font-medium text-black dark:text-white">Popularity:</span> {source["Popularity"]}</p>
          {/* <p><span className="font-medium text-black dark:text-white">Track URI:</span> {source["Track URI"]}</p>
          <p><span className="font-medium text-black dark:text-white">Preview URL:</span> {source["Track Preview URL"]}</p> */}
          {/* <p><span className="font-medium text-black dark:text-white">Artist URI(s):</span> {source["Artist URI(s)"]}</p> */}
          <p><span className="font-medium text-black dark:text-white">Artist Name(s):</span> {source["Artist Name(s)"]}</p>
          <p><span className="font-medium text-black dark:text-white">Copyright:</span> {source["Copyrights"]}</p>
          <p><span className="font-medium text-black dark:text-white">Label:</span> {source["Label"]}</p>
        </div>
      </div>
    );
  }
