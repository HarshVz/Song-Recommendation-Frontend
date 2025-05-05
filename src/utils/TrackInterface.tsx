// types.ts
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
    "Popularity"?: number; // optional if not always present
    "Tempo"?: number;
    "Track Name": string;
    "Track Preview URL": string;
    "Track URI": string;
    "Valence": number;
  }

export default TrackInterface;
