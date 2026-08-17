import { createContext, useState, useContext, useEffect } from "react";
export const MusicContext = createContext();
const songs = [
  {
    id: 1,
    title: "Be my Baby",
    artist: "The Ronnetes",
    url: `${import.meta.env.BASE_URL}songs/be-my-baby.mp3`,
    duration: "2:41",
  },
  {
    id: 2,
    title: "HUSN",
    artist: "Anuv jain",
    url: `${import.meta.env.BASE_URL}songs/Anuv Jain - HUSN (Official Video).mp3`,
    duration: "3:59",
  },
  {
    id: 3,
    title: "Arz Kiya hai",
    artist: "Anuv jain",
    url: `${import.meta.env.BASE_URL}songs/Arz Kiya Hai  Coke Studio Bharat.mp3`,
    duration: "5:05",
  },
  {
    id: 4,
    title: "Baby doll",
    artist: "Dominic Fike",
    url: `${import.meta.env.BASE_URL}songs/Dominic Fike Baby Doll (Official Audio).mp3`,
    duration: "1:39",
  },
  {
    id: 5,
    title: "Imposter Syndrome",
    artist: "Sydney Gish",
    url: `${import.meta.env.BASE_URL}songs/Impostor Syndrome - Sidney Gish.mp3`,
    duration: "4:54",
  },
  {
    id: 6,
    title: "Jaiye Sajana",
    artist: "Dhurandhar",
    url: `${import.meta.env.BASE_URL}songs/Jaiye Sajana (Lyrical)_ Dhurandhar The Revenge  Shashwat Sachdev  Jasmine Sandlas,Satinder Sartaaj.mp3`,
    duration: "3:20",
  },
  {
    id: 7,
    title: "Love me not",
    artist: "Ravyn Lenae",
    url: `${import.meta.env.BASE_URL}songs/Ravyn_Lenae_-_Love_Me_Not.mp3`,
    duration: "3:33",
  },
  {
    id: 8,
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    url: `${import.meta.env.BASE_URL}songs/Stephen Sanchez - Until I Found You (Official Video) (1).mp3`,
    duration: "2:55",
  },
  {
    id: 9,
    title: "Without Me",
    artist: "EMINEM",
    url: `${import.meta.env.BASE_URL}songs/Without Me.mp3`,
    duration: "4:50",
  },
  {
    id: 10,
    title: "Gira Gira Gira",
    artist: "sahithi",
    url: `${import.meta.env.BASE_URL}songs/Gira Gira Gira - Masstamilan.MY.mp3`,
    duration: "4:42",
  },
  {
    id: 11,
    title: "Hangova",
    artist: "sahithi",
    url: `${import.meta.env.BASE_URL}songs/Hangova - Masstamilan.MY.mp3`,
    duration: "4:06",
  },
  {
    id: 12,
    title: "Raga of Revenge",
    artist: "sahithi",
    url: `${import.meta.env.BASE_URL}songs/Raga of Revenge.mp3`,
    duration: "2:11",
  },
  {
    id: 13,
    title: "Kadalalle",
    artist: "sahithi",
    url: `${import.meta.env.BASE_URL}songs/Kadalalle (From Dear Comrade) - Masstamilan.MY.mp3`,
    duration: "4:20",
  },
];

export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playLists, setPlayLists] = useState([]);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem("musicPlayerPlayLists");
    if (savedPlaylist) {
      const playlists = JSON.parse(savedPlaylist);
      setPlayLists(playlists);
    }
  }, []);

  useEffect(() => {
    if (playLists.length > 0) {
      localStorage.setItem("musicPlayerPlayLists", JSON.stringify(playlists));
    } else {
      localStorage.removeItem("musicPlayerPlayLists");
    }
  }, [playLists]);

  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const createPlayList = (name) => {
    console.log("creatinggg...");
    const newPlayList = {
      id: Date.now(),
      name,
      songs: [],
    };
    setPlayLists((prev) => [...prev, newPlayList]);
  };

  const deletePlaylist = (playlistId) => {
    setPlayLists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId),
    );
  };
  const addSongToPlayList = (playlistId, song) => {
    setPlayLists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      }),
    );
  };

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentTrackIndex,
        currentTrack,
        currentTime,
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume,
        createPlayList,
        playLists,
        addSongToPlayList,
        setCurrentTrack,
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic  must be used inside of MusicProvider");
  }
  return contextValue;
};
