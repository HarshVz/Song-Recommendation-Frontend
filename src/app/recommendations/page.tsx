'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MusicCard from '@/Components/MusicCard';
import SongCards from '@/Components/SongCard';
import InitialCard from '@/Components/InitialCard';
import { motion } from 'motion/react';
import customVarients from '@/utils/initialAnimation';

interface TrackInterface {
  "Album Image URL": string;
  "Album Name": string;
  "Album Release Date": string;
  "Album URI": string;
  "Artist Name(s)": string;
  "Artist URI(s)": string;
  "Copyrights": string;
  "Danceability": number;
  "Duration_ms": number;
  "Energy": number;
  "Explicit": boolean;
  "Label": string;
  "Popularity": number;
  "Tempo": number;
  "Track Name": string;
  "Track Preview URL": string;
  "Track URI": string;
  "Valence": number;
}

export default function Home() {
  const [source, setSource] = useState<TrackInterface>({
    "Album Image URL": "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    "Album Name": "After Hours",
    "Album Release Date": "2020-03-20",
    "Album URI": "spotify:album:4yP0hdKOZPNshxUOjY0cZj",
    "Artist Name(s)": "The Weeknd",
    "Artist URI(s)": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ",
    "Copyrights": "C © 2020 The Weeknd XO, Inc., marketed by Republic Records...",
    "Danceability": 0.513,
    "Duration_ms": 200040,
    "Energy": 0.73,
    "Explicit": false,
    "Label": "Republic Records",
    "Popularity": 88,
    "Tempo": 171.001,
    "Track Name": "Blinding Lights - The Weeknd",
    "Track Preview URL": "https://p.scdn.co/mp3-preview/51c08d92815cce4ac2de94a7335a430b81234624?cid=...",
    "Track URI": "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
    "Valence": 0.334
  });

  const [currentlyPlaying, setCurrentlyPlaying] = useState<TrackInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<TrackInterface[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(false);
      try {
        const formData = new FormData();
        formData.append('song_uri', source["Track URI"]);

        const response = await axios.post("https://recommendation-system-backend-twi8.onrender.com/recommendation", formData);
        const data = response.data;

        if (data.success && Array.isArray(data.recommendations)) {
          setRecommendations(prev => {
            const combined = [...prev, ...data.recommendations];
            const uniqueMap = new Map<string, TrackInterface>();
            combined.forEach((song: TrackInterface) => {
              if (song["Track URI"]) {
                uniqueMap.set(song["Track URI"], song);
              }
            });
            return Array.from(uniqueMap.values());
          });
        } else {
          console.error("Unexpected response format:", data);
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [source]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentlyPlaying) {
      audio.src = currentlyPlaying["Track Preview URL"];
      audio.play().catch(e => console.error("Audio playback error:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentlyPlaying]);

  const handlePlaySource = () => {
    if (
      currentlyPlaying &&
      currentlyPlaying["Track URI"] === source["Track URI"]
    ) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(source);
      setIsPlaying(true);
    }
  };

  const handlePlayRecommendation = (song: TrackInterface) => {
    if (
      currentlyPlaying &&
      currentlyPlaying["Track URI"] === song["Track URI"]
    ) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(song);
      setSource(song);
      setIsPlaying(true);
    }
  };

  return (
    <motion.main
      variants={customVarients}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full flex justify-start items-start"
      style={{ padding: 0, margin: 0 }}
    >
      {source && (
        <div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              <MusicCard
                source={source}
                isPlaying={isPlaying && currentlyPlaying?.["Track URI"] === source["Track URI"]}
                handleOnClick={handlePlaySource}
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Currently Playing!</h2>
              <div className="w-full">
                <div className="col-span-1">
                  <InitialCard
                    source={source}
                    isPlaying={isPlaying && currentlyPlaying?.["Track URI"] === source["Track URI"]}
                    handleOnClick={handlePlaySource}
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
              <div className="w-full">
                {recommendations.map((song, index) => (
                  <div key={song["Track URI"] || index} className="col-span-1">
                    <SongCards
                      source={song}
                      isPlaying={isPlaying && currentlyPlaying?.["Track URI"] === song["Track URI"]}
                      handleOnClick={() => handlePlayRecommendation(song)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <audio
            ref={audioRef}
            className="hidden"
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </motion.main>
  );
}
