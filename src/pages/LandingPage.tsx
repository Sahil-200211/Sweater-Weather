import { GradualSpacing } from "../components/gradual-spacing";

function LandingPage() {
    return(
        <main className="flex flex-col items-center justify-center min-h-screen text-white text-center p-8">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-fit object-cover -z-10"
            >
                <source src="/mars.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <GradualSpacing text="Welcome to Mars Explorer" />
            <p className="text-lg mb-4 font-[Geo]">Discover Weather and Photos from the Red Planet</p>
        </main>
    );
}

export default LandingPage;