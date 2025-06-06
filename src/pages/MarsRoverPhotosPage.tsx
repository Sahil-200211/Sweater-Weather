import { useEffect, useState } from "react";
import { fetchMarsRoverPhotos } from "../api/nasaApi";
import { BlurIn } from "../components/blur-in";
import AOS from "aos";
import "aos/dist/aos.css";

function MarsRoverPhotosPage() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once:true
    })
  }, []);

  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("2025-05-01");

  const loadPhotos = async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMarsRoverPhotos(date);
      setPhotos(data.photos);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos(selectedDate);
  }, [selectedDate]);

  return (
    <main className="flex flex-col items-center min-h-screen bg-black text-white text-center p-8">
      <div className="mb-8">
        <BlurIn>Mars Rover Photos</BlurIn>
      </div>

      <label className="mb-4 text-lg">
        Select Earth Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="text-white px-2 py-1 rounded"
        />
      </label>

      {loading && <p>Loading photos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="bg-gradient-to-b from-[#6d1c1c] to-[#2e0404] p-2 rounded-xl shadow w-sm"
            data-aos="fade-up"
            data-aos-delay={index*50}
          >
            <img
              src={photo.img_src}
              alt={`Mars Rover - ${photo.id}`}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-sm mt-2">Camera: {photo.camera.full_name}</p>
            <p className="text-sm">Earth Date: {photo.earth_date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MarsRoverPhotosPage;
