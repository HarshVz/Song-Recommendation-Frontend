import { Play, Pause } from "lucide-react";

// Defining the types for the props to ensure proper type checking
interface TrackInterface {
    "Album Image URL": string;
    "Album Name": string;
    "Artist Name(s)": string;
    "Track Name": string;
    "Track URI": string;
    "Track Preview URL": string;
    "Album URI": string;
    "Album Release Date": string;
    "Tempo": number;
    "Energy": number;
    "Danceability": number;
    "Valence": number;
    "Explicit": boolean;
    "Copyrights": string;
    "Popularity": number;
    "Duration_ms": number;
}

interface SongCardsProps {
    source: TrackInterface;
    isPlaying: boolean | null;
    handleOnClick: () => void;
}

export default function SongCards({ source, isPlaying, handleOnClick }: SongCardsProps) {
    return (
        <div
            className={`flex flex-row items-center rounded-xl w-full p-3 border-2 transition-all duration-300 drop-shadow-xl mb-3
            ${isPlaying
                ? "border-neutral-500 drop-shadow-neutral-600/40"
                : "border-neutral-200 dark:border-neutral-900 drop-shadow-transparent"
            }
            bg-white text-black dark:bg-neutral-900 dark:text-white
        `}>
            <div className="image-container w-16 h-16 aspect-square">
                <img
                    src={source["Album Image URL"]}
                    alt={source["Album Name"] ?? "Album cover"}
                    className="w-full h-full aspect-square object-center object-cover rounded-full"
                />
            </div>
            <div className="w-full flex justify-between items-center p-2 gap-3">
                <div className="w-full flex flex-col items-start">
                    <h3 className="text-lg font-semibold line-clamp-1">
                        {source["Track Name"]?.split("-")[0] || "Unknown Track"}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-neutral-300">
                        {source["Artist Name(s)"] || "Unknown Artist"}
                    </p>
                </div>
                <div
                    className="flex items-center bg-gray-200 dark:bg-neutral-800 p-3 rounded-full cursor-pointer transition-transform duration-150 hover:scale-105"
                    onClick={handleOnClick}
                    aria-label={isPlaying ? "Pause track" : "Play track"}
                    role="button"
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
