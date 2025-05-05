import TrackInterface from "@/utils/TrackInterface"; // adjust path if needed

interface MusicCardProps {
  source: TrackInterface;
}

export default function SearchResults({ source }: MusicCardProps) {
  const trackTitle = source["Track Name"]?.split("-")[0]?.trim() || "Unknown Track";
  const artist = source["Artist Name(s)"] || "Unknown Artist";

  return (
    <div
      className={`flex flex-row items-center rounded-xl w-full p-3 border-2 transition-all duration-300 drop-shadow-xl mb-3
        border-neutral-200 dark:border-neutral-900 drop-shadow-transparent
        bg-white text-black dark:bg-neutral-900 dark:text-white
      `}
    >
      <div className="image-container w-16 h-16 flex-shrink-0">
        <img
          src={source["Album Image URL"]}
          alt={source["Album Name"] || "Album cover"}
          className="w-full h-full aspect-square object-center object-cover rounded-full"
        />
      </div>
      <div className="w-full flex justify-between items-center p-2 gap-3">
        <div className="w-full flex flex-col items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{trackTitle}</h3>
          <p className="text-sm text-gray-700 dark:text-neutral-300">{artist}</p>
        </div>
      </div>
    </div>
  );
}
