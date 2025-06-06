import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MarsWeatherPage from "./pages/MarsWeatherPage";
import MarsRoverPhotosPage from "./pages/MarsRoverPhotosPage";

function App() {
  return (
    <Router>
      <nav className="bg-red-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sweater Weather</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/weather" className="hover:underline">
            Weather
          </Link>
          <Link to="/photos" className="hover:underline">
            Photos
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<MarsWeatherPage />} />
        <Route path="/photos" element={<MarsRoverPhotosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
