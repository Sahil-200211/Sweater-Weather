import { useEffect, useState } from "react";
import { fetchMarsWeather } from "../api/nasaApi";
import { TypingEffect } from "../components/typing-effect";

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
    <main className="flex flex-col items-center min-h-screen bg-black text-white text-center p-8 max-w-full">
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
              <div
                key={sol}
                className="border p-4 rounded bg-red-900 bg-opacity-50"
              >
                <h3 className="text-2xl font-semibold">SOL {sol}</h3>
                <p>Avg Temp: {weatherData[sol].AT?.av ?? "N/A"} °C</p>
                <p>Wind Speed: {weatherData[sol].HWS?.av ?? "N/A"} m/s</p>
                <p>Pressure: {weatherData[sol].PRE?.av ?? "N/A"} Pa</p>
              </div>
            ))}
        </div>
      )}
    </main>
  );
}

export default MarsWeatherPage;
