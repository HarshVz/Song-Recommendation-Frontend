interface MusicCardProps {
    source: {
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
    },
    isPlaying: boolean | null;
    handleOnClick: () => void;
}

export default MusicCardProps;
