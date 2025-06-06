const API_KEY =  import.meta.env.VITE_NASA_API_KEY

// Mars Weather API
export async function fetchMarsWeather() {
    const url = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

    const res = await fetch(url);
    if(!res.ok) throw new Error("Failed to Fetch Mars Weather");

    const data = await res.json();
    return data;
}

// Mars Rover Photos API
export async function fetchMarsRoverPhotos(earth_date : string) {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earth_date}&api_key=${API_KEY}`;

    const res = await fetch(url);
    if(!res.ok) throw new Error("Failed to fetch Mars Rover Photos");

    const data = await res.json();
    return data;
}