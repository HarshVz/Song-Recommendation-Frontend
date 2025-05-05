"use client"
import React, { useState } from 'react';
import axios from "axios";
import SearchResults from '@/Components/SearchResults';
import Link from 'next/link';
import {motion} from "motion/react";
import customVarients from '@/utils/initialAnimation';

export default function Search() {

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const onClick = async (query: string) => {
        setLoading(true);
        setError(false);
        try {
            const formData = new FormData();
            formData.append("song_name", query);

            const response = await axios.post("https://recommendation-system-backend-twi8.onrender.com/search", formData);
            const data = response.data;

            if (data.success) {
                setRecommendations(data.recommendations);
            } else {
                console.error('Unexpected response format:', data);
                setError(true);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
        variants={customVarients}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{
            duration: 0.4,
            ease: "easeInOut"
        }}
         className="w-full flex flex-col rounded-xl">
            <div className="w-full flex flex-row gap-4 items-center justify-between">
                <input
                    type="text"
                    placeholder="Search for a song..."
                    className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-neutral-600 transition-all duration-300"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onClick(search);
                        }
                    }}
                />
                <button
                    className="bg-teal-600 dark:bg-teal-800 text-white rounded px-4 py-3 cursor-pointer hover:bg-teal-500 dark:hover:bg-teal-700 transition-all duration-300 border border-teal-500 dark:border-teal-600"
                    onClick={() => onClick(search)}
                >
                    Search
                </button>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2 text-black dark:text-white">Search Results</h2>
                <div className="grid grid-cols-1">
                    {loading && <p className="text-gray-700 dark:text-gray-300">Loading...</p>}
                    {error && <p className="text-red-600 dark:text-red-400">Error fetching recommendations</p>}
                    {!loading && !error && recommendations.length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400">No results found</p>
                    )}
                    {recommendations.map((song, index) => (
                        <Link href={`/recommendations/${song["Track Name"]}`} key={index} className="w-full cursor-pointer">
                            <SearchResults source={song} />
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
