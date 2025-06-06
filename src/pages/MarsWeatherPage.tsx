import { useEffect, useState } from "react";
import { fetchMarsWeather } from "../api/nasaApi";
import { TypingEffect } from "../components/typing-effect";
import { easeOut, motion } from 'framer-motion';

function MarsWeatherPage() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchMarsWeather();
        setWeatherData(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#000000] to-[#2a2929] text-white text-center p-8 max-w-full">
      <TypingEffect text="Mars Weather" />
      {loading && (
        <div className="animate-pulse text-gray-400">
          Loading Weather Data...
        </div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}
      {weatherData && (
        <div className="max-w-[1000px] flex flex-row gap-3 mt-8 flex-wrap justify-center">
          {Object.keys(weatherData)
            .filter((key) => key.match(/^\d+$/))
            .map((sol) => (
              <motion.div
                key={sol}
                className="border p-4 rounded bg-gradient-to-t from-[#8E0E00] to-[#1F1C18] bg-opacity-50"
                initial={{opacity:0, scale:0.5}}
                animate={{opacity:1, scale:1}}
                transition={{ease:easeOut, delay: 0.8, duration: 0.6}}
              >
                <h3 className="text-2xl font-semibold">SOL {sol}</h3>
                <p>Avg Temp: {weatherData[sol].AT?.av ?? "N/A"} °C</p>
                <p>Wind Speed: {weatherData[sol].HWS?.av ?? "N/A"} m/s</p>
                <p>Pressure: {weatherData[sol].PRE?.av ?? "N/A"} Pa</p>
              </motion.div>
            ))}
        </div>
      )}
    </main>
  );
}

export default MarsWeatherPage;
