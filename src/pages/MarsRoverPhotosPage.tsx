import { useEffect, useState } from "react";
import { fetchMarsRoverPhotos } from "../api/nasaApi";

function MarsRoverPhotosPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchMarsRoverPhotos("2025-06-01");
        setPhotos(data.photos);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-8">
      <h2 className="text-4xl font-bold mb-6">Mars Rover Photos 📸</h2>
      {loading && <p>Loading photos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-red-900 p-2 rounded shadow">
            <img src={photo.img_src} alt={`Mars Rover - ${photo.id}`} className="w-full h-auto rounded" />
            <p className="text-sm mt-2">Camera: {photo.camera.full_name}</p>
            <p className="text-sm">Earth Date: {photo.earth_date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MarsRoverPhotosPage;
