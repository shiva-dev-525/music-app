import { MusicPlayer } from "./Components/MusicPlayer";
import { AllSongs } from "./Components/AllSongs";
import { PlayLists } from "./Components/PlayLists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./contexts/MusicContext";
import { Navbar } from "./Components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="app">
          <Navbar />
          <main className="app-main">
            <div className="player-section">
              <MusicPlayer />
            </div>

            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/playlists" element={<PlayLists />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
    </BrowserRouter>
  );
}

export default App;
