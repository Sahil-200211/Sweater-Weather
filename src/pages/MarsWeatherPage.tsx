import { useEffect, useState } from "react";
import { fetchMarsWeather } from "../api/nasaApi";

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
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-8">
      <h2 className="text-4xl font-bold mb-6">Mars Weather</h2>
      {loading && <p>Loading Weather Data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {weatherData && (
        <div className="space-y-4">
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
