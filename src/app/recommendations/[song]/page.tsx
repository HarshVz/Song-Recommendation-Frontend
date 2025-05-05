"use client"


import { FC,use, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MusicCard from '@/Components/MusicCard';
import SongCards from '@/Components/SongCard';
import InitialCard from '@/Components/InitialCard';
import customVarients from '@/utils/initialAnimation';
import { motion } from 'motion/react';

// The dynamic route takes the song name as a param
interface PostPageProps {
    params: Promise<{ song: string }>;
  }

  interface TrackInterface{
    "Album Image URL": string;
    "Album Name": string;
    "Album Release Date": string;
    "Album URI": string;
    "Artist Name(s)": string;
    "Artist URI(s)": string;
    "Copyrights": string,
    "Danceability": number,
    "Duration_ms": number,
    "Energy": number,
    "Explicit": boolean,
    "Label": string,
    "Track Name": string;
    "Track Preview URL": string;
    "Track URI": string;
    "Valence": number;
  }


const Search: FC<PostPageProps> = ({ params }) => {
    const [source, setSource] = useState<TrackInterface | null>(null);

    const [currentlyPlaying, setCurrentlyPlaying] = useState<TrackInterface | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const resolvedParams = use(params); // unwraps the promise
  const song_name = resolvedParams.song;


  // Fetch recommendations based on the song param
  useEffect(() => {
    const fetchRecommendations = async () => {
        // params.song is now a Promise, so this line unwraps it
      if (!song_name) return;

      setLoading(true);
      setError(false);
      try {
        const formData = new FormData();
        formData.append('song_name', song_name);

        const response = await axios.post('https://recommendation-system-backend-twi8.onrender.com/recommend_search', formData);
        const data = response.data;
        if (data.success) {
          setSource(data.source);
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [params]);  // React to changes in params

  // Handle audio playback whenever currentlyPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentlyPlaying) {
      audio.src = currentlyPlaying['Track Preview URL'];
      audio.play().catch((e) => console.error('Audio playback error:', e));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentlyPlaying]);

  const handlePlaySource = () => {

    if (
        currentlyPlaying?.['Track URI'] &&
        source?.['Track URI'] &&
        currentlyPlaying['Track URI'] === source['Track URI']
      ){
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(source);
      setIsPlaying(true);
    }
  };

  const handlePlayRecommendation = (song: TrackInterface) => {
    if (currentlyPlaying && currentlyPlaying['Track URI'] === song['Track URI']) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(song);
      setIsPlaying(true);
    }
  };

  return (
    <motion.main
      variants={customVarients}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className="w-full h-full"
    >
        {loading ? (<div className='w-full h-full mx-auto flex justify-center items-center'> Loading... </div>) : ""}
      {source && !loading && (
        <motion.div
        variants={customVarients}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              <MusicCard
                source={source}
                isPlaying={isPlaying && currentlyPlaying && currentlyPlaying['Track URI'] === source['Track URI']}
                handleOnClick={handlePlaySource}
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Currently Playing!</h2>
              <div className="w-full">
                <div className="col-span-1">
                  <InitialCard
                    source={source}
                    isPlaying={isPlaying && currentlyPlaying && currentlyPlaying['Track URI'] === source['Track URI']}
                    handleOnClick={handlePlaySource}
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
              <div className="w-full">
                {recommendations.map((song, index) => (
                  <div key={song['Track URI'] || index} className="col-span-1">
                    <SongCards
                      source={song}
                      isPlaying={isPlaying && currentlyPlaying && currentlyPlaying['Track URI'] === song['Track URI']}
                      handleOnClick={() => handlePlayRecommendation(song)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <audio ref={audioRef} className="hidden" onEnded={() => setIsPlaying(false)} />
        </motion.div>
      )}
    </motion.main>
  );
};

export default Search;
